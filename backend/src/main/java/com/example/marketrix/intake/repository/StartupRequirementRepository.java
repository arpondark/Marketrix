package com.example.marketrix.intake.repository;

import com.example.marketrix.intake.entity.StartupRequirement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface StartupRequirementRepository extends JpaRepository<StartupRequirement, UUID> {

    List<StartupRequirement> findByFounderIdOrderByCreatedAtDesc(UUID founderId);
}
