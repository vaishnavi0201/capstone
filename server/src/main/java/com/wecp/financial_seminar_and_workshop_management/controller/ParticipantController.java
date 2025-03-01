package com.wecp.financial_seminar_and_workshop_management.controller;

import com.wecp.financial_seminar_and_workshop_management.entity.Enrollment;
import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.Feedback;
import com.wecp.financial_seminar_and_workshop_management.service.EnrollmentService;
import com.wecp.financial_seminar_and_workshop_management.service.EventService;
import com.wecp.financial_seminar_and_workshop_management.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/participant")
public class ParticipantController {

    @Autowired
       private EnrollmentService enrollmentService;

    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private EventService eventService;
    // Get all events
    @GetMapping("/events")
    public ResponseEntity<List<Event>> getEvents() {
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    // Enroll in event
    @PostMapping("/event/{eventId}/enroll")
    public ResponseEntity<Enrollment> enrollInEvent(@RequestParam Long userId, @PathVariable Long eventId) {
        Enrollment enrollment = enrollmentService.enrollUserInEvent(userId, eventId);
        return ResponseEntity.ok(enrollment);
    }

    // View event status by event ID
    @GetMapping("/event/{id}/status")
    public ResponseEntity<Event> viewEventStatus(@PathVariable Long id) {
        Event event = eventService.getEventById(id).orElseThrow(() -> new RuntimeException("Event not found"));
        return ResponseEntity.ok(event);
    }

    // Provide feedback for event
    @PostMapping("/event/{eventId}/feedback")
    public ResponseEntity<Feedback> provideFeedback(@RequestParam Long userId, @PathVariable Long eventId, @RequestBody Feedback feedback) {
        Feedback providedFeedback = feedbackService.provideFeedback(eventId, userId, feedback);
        return ResponseEntity.ok(providedFeedback);
    }

    
    // - Additional API
    // Get Feedback by Participant Id
    @GetMapping("/event/{userId}/feedback")
    public ResponseEntity <?> getFeedbackByUserId(@PathVariable Long userId){

        List<?> retrivedFeedback = feedbackService.getFeedbackByUserId(userId);
        return ResponseEntity.ok(retrivedFeedback);

    }


    //  Additional API
    // To get Event by Id 
    @GetMapping("/event/{eventId}")
    public ResponseEntity<?> getEventById(@PathVariable Long eventId){
        return ResponseEntity.ok(eventService.getEventById(eventId));
    }

    //  Addiotional APi
    // TO get Enrolment detials 
    @GetMapping("/event/{eventId}/enroll")
    public ResponseEntity<?> getEnrollmentDetails(@PathVariable Long eventId,@RequestParam Long userId){
        try {
            
            return  ResponseEntity.ok(enrollmentService.getEnrollmentDetails(userId, eventId));
        } catch (Exception e) {
            // TODO: handle exception
            return new  ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }
}