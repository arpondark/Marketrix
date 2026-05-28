package com.example.marketrix.intake.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class BriefSubmittedEvent {

    private final UUID requirementId;
}
