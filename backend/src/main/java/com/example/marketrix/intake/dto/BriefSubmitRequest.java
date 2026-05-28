package com.example.marketrix.intake.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class BriefSubmitRequest {

    @NotBlank(message = "Startup name is required")
    @Size(min = 3, message = "Name must be at least 3 characters")
    private String name;

    @NotBlank(message = "Industry is required")
    private String industry;

    @NotBlank(message = "Stage is required")
    private String stage;

    private String geography;

    private String budget;

    @NotEmpty(message = "At least one goal is required")
    private List<String> goals;

    private List<String> problems;

    private List<String> competitors;
}
