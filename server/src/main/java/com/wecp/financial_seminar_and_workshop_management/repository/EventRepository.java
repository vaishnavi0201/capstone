package com.wecp.financial_seminar_and_workshop_management.repository;

import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByInstitutionId(Long institutionId);
    // List<Event> findByUserRole(String role);
}