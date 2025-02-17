package com.wecp.financial_seminar_and_workshop_management.service;

import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.User;
import com.wecp.financial_seminar_and_workshop_management.repository.EventRepository;
import com.wecp.financial_seminar_and_workshop_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event eventDetails) {
        Event event = eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));
        event.setTitle(eventDetails.getTitle());
        event.setDescription(eventDetails.getDescription());
        event.setSchedule(eventDetails.getSchedule());
        event.setLocation(eventDetails.getLocation());
        event.setStatus(eventDetails.getStatus());
        return eventRepository.save(event);
    }

    public List<Event> getEventsByInstitutionId(Long institutionId) {
        return eventRepository.findByInstitutionId(institutionId);
    }

    public void assignProfessionalToEvent(Long eventId, Long userId) {
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));
        User professional = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

    if (!event.getProfessionals().contains(professional)) {
        event.getProfessionals().add(professional);
        professional.getEvents().add(event);
        eventRepository.save(event);
        userRepository.save(professional);
    }
        
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // view assigned event
    public List<Event> getAssignedEvents(Long userId) {
        User u = userRepository.findById(userId).get();
        return u.getEvents();
    } 

    public void deleteEventByInstituition(Long eventId){
        eventRepository.deleteById(eventId);
    }

}