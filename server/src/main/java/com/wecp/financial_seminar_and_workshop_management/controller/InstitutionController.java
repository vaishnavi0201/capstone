package com.wecp.financial_seminar_and_workshop_management.controller;

import com.wecp.financial_seminar_and_workshop_management.entity.Enrollment;
import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.Resource;
import com.wecp.financial_seminar_and_workshop_management.entity.User;
import com.wecp.financial_seminar_and_workshop_management.service.EnrollmentService;
import com.wecp.financial_seminar_and_workshop_management.service.EventService;
import com.wecp.financial_seminar_and_workshop_management.service.ResourceService;
import com.wecp.financial_seminar_and_workshop_management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/institution")
public class InstitutionController {

    @Autowired
    private EventService eventService;

    @Autowired
    private ResourceService resourceService;

    @Autowired
    private UserService userService;

    @Autowired
    private EnrollmentService enrollmentService;

    // Create Event
    @PostMapping("/event")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        try {
            Event createdEvent = eventService.createEvent(event);
            return ResponseEntity.ok(createdEvent);
            
        } catch (Exception e) {

        }
        return null;
    }

    // Update Event
    @PutMapping("/event/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event eventDetails) {
        Event updatedEvent = eventService.updateEvent(id, eventDetails);
        return ResponseEntity.ok(updatedEvent);
    }

    // Get Events
    @GetMapping("/events")
    public ResponseEntity<List<Event>> getInstitutionsEvents(@RequestParam Long institutionId) {
        List<Event> events = eventService.getEventsByInstitutionId(institutionId);
        return ResponseEntity.ok(events);
    }

    // Add Resource to Event
    @PostMapping("/event/{eventId}/resource")
    public ResponseEntity<Resource> addResourceToEvent(@PathVariable Long eventId, @RequestBody Resource resource) {
        Resource addedResource = resourceService.addResourceToEvent(eventId, resource);
        return ResponseEntity.ok(addedResource);
    }

    // Get Professionals List
    @GetMapping("/event/professionals")
    public ResponseEntity<List<User>> getProfessionalsList() {
        List<User> professionals = userService.getProfessionals();
        return ResponseEntity.ok(professionals);
    }

    // Assign Professional to Event
    @PostMapping("/event/{eventId}/professional")
    public ResponseEntity<?> assignProfessionalToEvent(@PathVariable Long eventId, @RequestParam Long userId) {
        eventService.assignProfessionalToEvent(eventId, userId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    
    //  Additional API
    // To get Event by Id 
    @GetMapping("/event/{eventId}")
    public ResponseEntity<?> getEventById(@PathVariable Long eventId){
        return ResponseEntity.ok(eventService.getEventById(eventId));
    }

    // ------------Additional API------------------
    // To get all resources
    @GetMapping("/event/resources")
    public ResponseEntity<List<Map<String, Object>>> getAllResources(){
        return ResponseEntity.ok(resourceService.getAllResources());
    }

    // Update enrollment status
    @PutMapping("/event/enrollment")
    public ResponseEntity<Enrollment>updateEnrollmentStatus(@PathVariable Long enrollmentId, @RequestBody String status){
        return ResponseEntity.ok(enrollmentService.updateEnrollmentStatus(enrollmentId, status));
    }

    @GetMapping("/event/enrollment")
    public ResponseEntity<List<Enrollment>> viewAllEnrollments(){
        return ResponseEntity.ok(enrollmentService.getAllEnrollments());
    }

    @DeleteMapping("/event/{eventId}")
    public ResponseEntity<Void> DeleteEventByInstituition(@PathVariable Long eventId){
        eventService.deleteEventByInstituition(eventId);
        return ResponseEntity.noContent().build();
    }   
}