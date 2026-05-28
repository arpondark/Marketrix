package com.example.marketrix.intake.dto;

import com.example.marketrix.intake.entity.StartupRequirement;
import com.example.marketrix.intake.enums.BriefStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
public class BriefResponse {

    private UUID id;
    private String name;
    private String industry;
    private String stage;
    private String geography;
    private String budget;
    private List<String> goals;
    private List<String> problems;
    private List<String> competitors;
    private BriefStatus status;
    private Instant createdAt;

    public static BriefResponse from(StartupRequirement req) {
        return BriefResponse.builder()
                .id(req.getId())
                .name(req.getName())
                .industry(req.getIndustry())
                .stage(req.getStage())
                .geography(req.getGeography())
                .budget(req.getBudget())
                .goals(req.getGoals())
                .problems(req.getProblems())
                .competitors(req.getCompetitors())
                .status(req.getStatus())
                .createdAt(req.getCreatedAt())
                .build();
    }
}
