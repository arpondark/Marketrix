package com.example.marketrix.recommendation.service;

import com.example.marketrix.ai.entity.AudienceSegment;
import com.example.marketrix.ai.event.SegmentsGeneratedEvent;
import com.example.marketrix.ai.repository.AudienceSegmentRepository;
import com.example.marketrix.intake.entity.StartupRequirement;
import com.example.marketrix.intake.repository.StartupRequirementRepository;
import com.example.marketrix.recommendation.dto.RecommendationResponse;
import com.example.marketrix.recommendation.entity.Recommendation;
import com.example.marketrix.recommendation.enums.RecommendationType;
import com.example.marketrix.recommendation.event.RecommendationsReadyEvent;
import com.example.marketrix.recommendation.repository.RecommendationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final RecommendationRepository recommendationRepository;
    private final AudienceSegmentRepository segmentRepository;
    private final StartupRequirementRepository requirementRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Async("aiTaskExecutor")
    @EventListener
    @Transactional
    public void handleSegmentsGenerated(SegmentsGeneratedEvent event) {
        var requirementId = event.getRequirementId();
        log.info("Generating recommendations for requirement: {}", requirementId);

        List<AudienceSegment> segments = segmentRepository.findByRequirementId(requirementId);
        if (segments.isEmpty()) {
            log.warn("No segments found for requirement: {}", requirementId);
            return;
        }

        // Generate channel recommendations from segments
        for (AudienceSegment segment : segments) {
            if (segment.getPreferredChannels() != null) {
                for (String channel : segment.getPreferredChannels()) {
                    Recommendation rec = Recommendation.builder()
                            .requirementId(requirementId)
                            .type(RecommendationType.CHANNEL)
                            .score(segment.getViabilityScore())
                            .explanation("Recommended channel '" + channel + "' for segment: " + segment.getName()
                                    + ". " + segment.getRationale())
                            .build();
                    recommendationRepository.save(rec);
                }
            }
        }

        log.info("Recommendations generated for requirement: {}", requirementId);

        // Notify founder
        StartupRequirement req = requirementRepository.findById(requirementId).orElse(null);
        if (req != null) {
            eventPublisher.publishEvent(new RecommendationsReadyEvent(requirementId, req.getFounderId()));
        }
    }

    public List<RecommendationResponse> getRecommendations(UUID requirementId) {
        return recommendationRepository.findByRequirementIdOrderByScoreDesc(requirementId).stream()
                .map(RecommendationResponse::from)
                .toList();
    }
}
