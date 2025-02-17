package com.wecp.financial_seminar_and_workshop_management.config;

import com.wecp.financial_seminar_and_workshop_management.jwt.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;




    // Implement security configuration here
    // /api/user/register and /api/user/login should be permitted to all
    // /api/institution/event should be permitted to INSTITUTION
    // /api/institution/event/{id} should be permitted to INSTITUTION
    // /api/institution/events should be permitted to INSTITUTION
    // /api/institution/event/{eventId}/resource should be permitted to INSTITUTION
    // /api/institution/event/professionals should be permitted to INSTITUTION
    // /api/institution/event/{eventId}/professional should be permitted to INSTITUTION
    // /api/professional/events should be permitted to PROFESSIONAL
    // /api/professional/event/{id}/status should be permitted to PROFESSIONAL
    // /api/professional/event/{eventId}/feedback should be permitted to PROFESSIONAL
    // /api/participant/events should be permitted to PARTICIPANT
    // /api/participant/event/{eventId}/enroll should be permitted to PARTICIPANT
    // /api/participant/event/{id}/status should be permitted to PARTICIPANT
    // /api/participant/event/{eventId}/feedback should be permitted to PARTICIPANT

    // Note: Use hasAuthority method to check the role of the user
    // for example, hasAuthority("INSTITUTION")






@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
   private UserDetailsService userDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
        }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeRequests()
            .antMatchers("/api/user/register", "/api/user/login").permitAll()
            .antMatchers("/api/institution/event", "/api/institution/event/**", "/api/institution/events", "/api/institution/event/**/resource", "/api/institution/event/professionals", "/api/institution/event/**/professional","/api/institution/event/enrollment/**","/api/institution/event/enrollment").hasAuthority("INSTITUTION")

            .antMatchers("/api/professional/events", "/api/professional/event/**","/api/professional/event/**/status", "/api/professional/event/**/feedback").hasAuthority("PROFESSIONAL")
            .antMatchers("/api/participant/events","/api/participant/event/**" ,"/api/participant/event/**/enroll", "/api/participant/event/**/status", "/api/participant/event/**/feedback").hasAuthority("PARTICIPANT")
            .anyRequest().authenticated()
            .and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

    }
}