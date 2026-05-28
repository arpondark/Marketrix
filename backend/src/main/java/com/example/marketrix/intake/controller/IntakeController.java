package com.example.marketrix.intake.controller;

import com.example.marketrix.common.ApiResponse;
import com.example.marketrix.intake.dto.BriefResponse;
import com.example.marketrix.intake.dto.BriefSubmitRequest;
import com.example.marketrix.intake.service.IntakeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/startups")
@RequiredArgsConstructor
public class IntakeController {

    private final IntakeService intakeService;

    @PostMapping("/brief")
    @PreAuthorize("hasRole('FOUNDER')")
    public ResponseEntity<ApiResponse<BriefResponse>> submitBrief(
            Authentication auth, @Valid @RequestBody BriefSubmitRequest request) {
        UUID founderId = (UUID) auth.getPrincipal();
        BriefResponse response = intakeService.submitBrief(founderId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Brief submitted successfully", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BriefResponse>> getBrief(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(intakeService.getBrief(id)));
    }

    @GetMapping("/my-briefs")
    @PreAuthorize("hasRole('FOUNDER')")
    public ResponseEntity<ApiResponse<List<BriefResponse>>> getMyBriefs(Authentication auth) {
        UUID founderId = (UUID) auth.getPrincipal();
        return ResponseEntity.ok(ApiResponse.success(intakeService.getMyBriefs(founderId)));
    }
}
