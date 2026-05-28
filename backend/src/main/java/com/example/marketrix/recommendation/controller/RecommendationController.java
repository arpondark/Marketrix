package com.example.marketrix.recommendation.controller;

import com.example.marketrix.common.ApiResponse;
import com.example.marketrix.recommendation.dto.RecommendationResponse;
import com.example.marketrix.recommendation.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    @GetMapping("/{requirementId}")
    public ResponseEntity<ApiResponse<List<RecommendationResponse>>> getRecommendations(
            @PathVariable UUID requirementId) {
        List<RecommendationResponse> recommendations = recommendationService.getRecommendations(requirementId);
        return ResponseEntity.ok(ApiResponse.success(recommendations));
    }
}
