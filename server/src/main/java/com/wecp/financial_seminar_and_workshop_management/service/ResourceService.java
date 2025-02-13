package com.wecp.financial_seminar_and_workshop_management.service;


import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.Resource;
import com.wecp.financial_seminar_and_workshop_management.repository.EventRepository;
import com.wecp.financial_seminar_and_workshop_management.repository.ResourceRepository;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
public class ResourceService {
    @Autowired
    private ResourceRepository resourceRepository;
    @Autowired
    private EventRepository eventRepository;

    public Resource addResourceToEvent(Long eventId, Resource resource) {
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));
        resource.setEvent(event);
        return resourceRepository.save(resource);
    }
    public Optional<Resource> getResourceById(Long id) {
        return resourceRepository.findById(id);
    }
    public Resource updateResource(Long id, Resource resourceDetails) {
        Resource resource = resourceRepository.findById(id).orElseThrow(() -> new RuntimeException("Resource not found"));
        resource.setType(resourceDetails.getType());
        resource.setDescription(resourceDetails.getDescription());
        resource.setAvailabilityStatus(resourceDetails.getAvailabilityStatus());
        return resourceRepository.save(resource);
    }
    public void deleteResource(Long id) {
        Resource resource = resourceRepository.findById(id).orElseThrow(() -> new RuntimeException("Resource not found"));
        resourceRepository.delete(resource);
    }

 public List<Map<String, Object>> getAllResources() {
        List<Resource> allResources = resourceRepository.findAll();
        List<Map<String, Object>> data = new ArrayList<>();

        for (Resource resource : allResources) {
            Map<String, Object> res = new HashMap<>();
            res.put("resourceId", resource.getId());
            res.put("type", resource.getType());
            res.put("description", resource.getDescription());
            res.put("availabilityStatus", resource.getAvailabilityStatus());
            res.put("eventTitle", resource.getEvent().getTitle());
            data.add(res);
        }

        return data;
    }
}


