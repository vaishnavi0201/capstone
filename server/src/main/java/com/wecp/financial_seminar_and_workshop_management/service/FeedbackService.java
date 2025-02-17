package com.wecp.financial_seminar_and_workshop_management.service;

import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.Feedback;
import com.wecp.financial_seminar_and_workshop_management.entity.User;
import com.wecp.financial_seminar_and_workshop_management.repository.EventRepository;
import com.wecp.financial_seminar_and_workshop_management.repository.FeedbackRepository;
import com.wecp.financial_seminar_and_workshop_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    public Feedback provideFeedback(Long eventId, Long userId, Feedback feedback) {
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));


        feedback.setEvent(event);
        feedback.setUser(user);
        
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getFeedbackByEventId(Long eventId) {
        return feedbackRepository.findByEventId(eventId);
    }

    public List<?> getFeedbackByUserId(Long userId) {
        
         List <Feedback> retreivedFeedback = feedbackRepository.findByUserId(userId); 
         List<Map<String,Object>> data = new ArrayList<>();

         for(Feedback feedback : retreivedFeedback){
            Map<String,Object> res = new HashMap<>();

            res.put("content",feedback.getContent());
            res.put("timeStamp",feedback.getTimestamp());
            res.put("eventTitle", feedback.getEvent().getTitle());
            data.add(res);

         }
         return data;


    }
}

