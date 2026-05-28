package com.example.marketrix.intake.service;

import com.example.marketrix.common.exception.ResourceNotFoundException;
import com.example.marketrix.intake.dto.BriefResponse;
import com.example.marketrix.intake.dto.BriefSubmitRequest;
import com.example.marketrix.intake.entity.StartupRequirement;
import com.example.marketrix.intake.event.BriefSubmittedEvent;
import com.example.marketrix.intake.repository.StartupRequirementRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class IntakeService {

    private final StartupRequirementRepository repository;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public BriefResponse submitBrief(UUID founderId, BriefSubmitRequest request) {
        StartupRequirement requirement = StartupRequirement.builder()
                .founderId(founderId)
                .name(request.getName())
                .industry(request.getIndustry())
                .stage(request.getStage())
                .geography(request.getGeography())
                .budget(request.getBudget())
                .goals(request.getGoals())
                .problems(request.getProblems())
                .competitors(request.getCompetitors())
                .build();

        requirement = repository.save(requirement);
        log.info("Brief submitted: id={}, founder={}", requirement.getId(), founderId);

        eventPublisher.publishEvent(new BriefSubmittedEvent(requirement.getId()));

        return BriefResponse.from(requirement);
    }

    public BriefResponse getBrief(UUID briefId) {
        StartupRequirement req = repository.findById(briefId)
                .orElseThrow(() -> new ResourceNotFoundException("Brief", "id", briefId));
        return BriefResponse.from(req);
    }

    public List<BriefResponse> getMyBriefs(UUID founderId) {
        return repository.findByFounderIdOrderByCreatedAtDesc(founderId).stream()
                .map(BriefResponse::from)
                .toList();
    }
}
