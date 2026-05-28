package com.example.marketrix.recommendation.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class RecommendationsReadyEvent {

    private final UUID requirementId;
    private final UUID founderId;
}
