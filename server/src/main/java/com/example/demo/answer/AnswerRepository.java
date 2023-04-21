package com.example.demo.answer;

import com.example.demo.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    Optional<Answer> findById(Long id);
}
