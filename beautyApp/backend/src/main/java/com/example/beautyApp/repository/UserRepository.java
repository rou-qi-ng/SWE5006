package com.example.beautyApp.repository;

import com.example.beautyApp.model.User;
import lombok.Builder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findAll();

    @Query("SELECT u FROM User u ORDER BY u.userId DESC LIMIT 1")
    User findLastUser();

    Optional<User> findByUsername(String username);

    @Query("SELECT u FROM User u WHERE (u.username = :username) AND (u.password = :password)")
    Optional<User> findUser(@Param("username") String username,
                            @Param("password") String password);
}
