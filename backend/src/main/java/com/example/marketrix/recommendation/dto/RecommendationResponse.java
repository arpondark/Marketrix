package com.example.marketrix.recommendation.dto;

import com.example.marketrix.recommendation.entity.Recommendation;
import com.example.marketrix.recommendation.enums.RecommendationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
public class RecommendationResponse {

    private UUID id;
    private RecommendationType type;
    private UUID targetId;
    private Double score;
    private String explanation;

    public static RecommendationResponse from(Recommendation rec) {
        return RecommendationResponse.builder()
                .id(rec.getId())
                .type(rec.getType())
                .targetId(rec.getTargetId())
                .score(rec.getScore())
                .explanation(rec.getExplanation())
                .build();
    }
}
