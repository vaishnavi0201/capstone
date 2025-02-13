package com.wecp.financial_seminar_and_workshop_management.controller;



import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.Feedback;
import com.wecp.financial_seminar_and_workshop_management.service.EventService;
import com.wecp.financial_seminar_and_workshop_management.service.FeedbackService;
import com.wecp.financial_seminar_and_workshop_management.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/professional")



public class ProfessionalController {


    @Autowired
    private  UserService userService ;
    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private EventService eventService;

    @GetMapping("/events")
    public ResponseEntity<?> viewAssignedEvents(@RequestParam Long userId) {
        
        return ResponseEntity.ok(eventService.getAssignedEvents(userId));
        // return ResponseEntity.ok(eventService.getAssignedEvents(userId));


    }

    

    // Update Status by event id
    @PutMapping("/event/{id}/status")
    public ResponseEntity<?> updateEventStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(userService.updateEventStatus(id, status));
    }

    @PostMapping("/event/{eventId}/feedback")
    public ResponseEntity<?> provideFeedback( @RequestParam Long userId, @PathVariable Long eventId, @RequestBody Feedback feedback) {
        // List<Feedback> f = feedbackService.getFeedbackByEventId(eventId);
        try {
            System.out.println(feedback);
            Feedback f = feedbackService.provideFeedback(eventId, userId, feedback);
            return ResponseEntity.ok(f);
            
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e);
        }
        return null;

    }

    //  - Additional API
     // Get Feedback by Professional Id
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
}


