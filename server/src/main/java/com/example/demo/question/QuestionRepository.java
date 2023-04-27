package com.example.demo.question;

import com.example.demo.member.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Optional<Member> findById(String id);

    Page<Question> findByTitleContaining(PageRequest pageRequest, String keyword);
    Page<Question> findAllByQuestionStatus(Question.QuestionStatus questionStatus, Pageable pageable);
}
