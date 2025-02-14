package com.wecp.financial_seminar_and_workshop_management.repository;

import com.wecp.financial_seminar_and_workshop_management.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUserId(Long userId);
    List<Enrollment> findByEventId(Long eventId);
    @Query("SELECT e FROM Enrollment e WHERE e.user.id = :userId AND e.event.id = :eventId")
        Optional<Enrollment> findEnrollmentByUserIdAndEventId(@Param("userId") Long userId, @Param("eventId") Long eventId);
}