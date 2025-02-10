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

    @GetMapping("/events")
    public ResponseEntity<?> viewAssignedEvents() {
        return ResponseEntity.ok(userService.viewAssignedEvents());
    }

    @PutMapping("/event/{id}/status")
    public ResponseEntity<?> updateEventStatus(@PathVariable Long id, @RequestBody String status) {
        return ResponseEntity.ok(userService.updateEventStatus(id, status));
    }

    @PostMapping("/event/{eventId}/feedback")
    public ResponseEntity<?> provideFeedback(@PathVariable Long eventId, @RequestBody Feedback feedback) {
        return ResponseEntity.ok(userService.provideFeedback(eventId, feedback));
    }
}


