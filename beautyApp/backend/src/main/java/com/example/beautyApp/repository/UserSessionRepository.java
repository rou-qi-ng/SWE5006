package com.example.beautyApp.repository;

import com.example.beautyApp.model.TB_User;
import com.example.beautyApp.model.TB_UserSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSessionRepository extends JpaRepository<TB_UserSession, Integer> {

}
