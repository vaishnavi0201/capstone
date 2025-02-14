package com.wecp.financial_seminar_and_workshop_management.service;

import com.wecp.financial_seminar_and_workshop_management.entity.Enrollment;
import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.User;
import com.wecp.financial_seminar_and_workshop_management.repository.EnrollmentRepository;
import com.wecp.financial_seminar_and_workshop_management.repository.EventRepository;
import com.wecp.financial_seminar_and_workshop_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    public Enrollment enrollUserInEvent(Long userId, Long eventId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));

        Enrollment enrollment = new Enrollment(user, event, "PENDING");
        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getEnrollmentsByUserId(Long userId) {
        return enrollmentRepository.findByUserId(userId);
    }

    public List<Enrollment> getEnrollmentsByEventId(Long eventId) {
        return enrollmentRepository.findByEventId(eventId);
    }

    public Enrollment updateEnrollmentStatus(Long enrollmentId, String status) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId).orElseThrow(() -> new RuntimeException("Enrollment not found"));
        enrollment.setStatus(status);
        return enrollmentRepository.save(enrollment);
    }

    // ----------Additional APIS------------

    // Get All Enrollment 
    public List<Enrollment> getAllEnrollments(){
        return enrollmentRepository.findAll();
    }

    // GEt enrollment details
    public Enrollment getEnrollmentDetails(Long userId,Long eventId){
        // return enrollmentRepository.findEnrollmentByUserIdAndEventId(userId, eventId).orElseThrow(()->new RuntimeException("Enrollment not found") );
        Enrollment enrollmentDetail= enrollmentRepository.findEnrollmentByUserIdAndEventId(userId, eventId).get();

        if(enrollmentDetail!= null){
            return enrollmentDetail;

        } else {
            return null;
        }
    }
}