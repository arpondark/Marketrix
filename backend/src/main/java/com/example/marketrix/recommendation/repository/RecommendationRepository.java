package com.example.marketrix.recommendation.repository;

import com.example.marketrix.recommendation.entity.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RecommendationRepository extends JpaRepository<Recommendation, UUID> {

    List<Recommendation> findByRequirementIdOrderByScoreDesc(UUID requirementId);
}
