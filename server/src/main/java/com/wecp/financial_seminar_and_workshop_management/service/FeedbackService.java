package com.wecp.financial_seminar_and_workshop_management.service;

import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.Feedback;
import com.wecp.financial_seminar_and_workshop_management.entity.User;
import com.wecp.financial_seminar_and_workshop_management.repository.EventRepository;
import com.wecp.financial_seminar_and_workshop_management.repository.FeedbackRepository;
import com.wecp.financial_seminar_and_workshop_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;
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

        // Date timestamp = new Date();
        // Feedback feedback1 = new Feedback(event, user, feedback.getContent(), feedback.getTimestamp());
        feedback.setEvent(event);
        feedback.setUser(user);
        // feedback.setContent(feedback.getContent());
        // feedback.setTimestamp(feedback.getTimestamp());
        
        System.out.println("++++++++ feedback object is"+feedback +"+++++++++++");
        System.out.println("feedback payload in service is:"+feedback);
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getFeedbackByEventId(Long eventId) {
        return feedbackRepository.findByEventId(eventId);
    }

    public List<?> getFeedbackByUserId(Long userId) {
        // return feedbackRepository.findByUserId(userId);
        
         List <Feedback> retreivedFeedback = feedbackRepository.findByUserId(userId); 
         List<Map<String,Object>> data = new ArrayList<>();

         for(Feedback feedback : retreivedFeedback){
            // Feedback res = new Feedback();
            Map<String,Object> res = new HashMap<>();

            // res.setEvent(feedback.getEvent().getTitle());
            res.put("content",feedback.getContent());
            res.put("timeStamp",feedback.getTimestamp());
            res.put("eventTitle", feedback.getEvent().getTitle());
            data.add(res);

         }
         return data;


    }
}

