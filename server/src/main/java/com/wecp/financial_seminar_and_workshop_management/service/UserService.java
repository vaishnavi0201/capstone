package com.wecp.financial_seminar_and_workshop_management.service;

import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.Feedback;
import com.wecp.financial_seminar_and_workshop_management.entity.User;
import com.wecp.financial_seminar_and_workshop_management.repository.EventRepository;
import com.wecp.financial_seminar_and_workshop_management.repository.FeedbackRepository;
import com.wecp.financial_seminar_and_workshop_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private FeedbackRepository feedbackRepository;

    public User registerUser(User user) {
        User userExist = userRepository.findByUsernameAndEmail(user.getUsername(), user.getEmail());
        if(userExist != null) {
            throw new DuplicateKeyException("User with this email already Exist");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user); 
    }

    public User loginUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        throw new UsernameNotFoundException("Invalid username or password");
    }

    public List<User> getProfessionals() {
        return userRepository.findAll().stream()
                .filter(user -> "PROFESSIONAL".equals(user.getRole()))
                .collect(Collectors.toList());
    }

    public User getUserByName(String username){
        return userRepository.findByUsername(username);
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>()); // Fix return statement
    }

    public Event updateEventStatus(Long id, String status) {
        Event event = eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));
        event.setStatus(status);
        eventRepository.save(event);
        return event;
    }

    public ResponseEntity<?> provideFeedback(Long eventId, Feedback feedback) {
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));
        User user = userRepository.findById(feedback.getUser().getId()).orElseThrow(() -> new RuntimeException("User not found"));
        
        LocalDateTime localDateTime = LocalDateTime.now();
        Date timestamp = Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
        Feedback newFeedback = new Feedback(event, user, feedback.getContent(), timestamp);
        feedbackRepository.save(newFeedback);
        return ResponseEntity.ok("Feedback provided successfully");
    }
          


    

  

}
