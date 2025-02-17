package com.wecp.financial_seminar_and_workshop_management.repository;


import com.wecp.financial_seminar_and_workshop_management.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;



public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

   @Query("SELECT u FROM User u WHERE u.username = :username OR u.email = :email")
    User findByUsernameAndEmail(@Param("username") String username, @Param("email") String email);
}
