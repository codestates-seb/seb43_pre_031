package com.example.demo.question;

import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;


@RestController
@RequestMapping("/questions")
public class QuestionController {

    private QuestionService questionService;
    private QuestionMapper mapper;

    public QuestionController(QuestionService questionService,
                              QuestionMapper mapper)
    {
        this.questionService = questionService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postQuestion(@RequestBody QuestionDto.Post dto)
    {
        Question question = mapper.questionPostDtoToQuestion(dto);

        Question savedQuestion = questionService.createQuestion(question);

        // URI 인스턴트로 만들어서 헤더에 정보추가하기
        URI location = UriComponentsBuilder
                .newInstance()
                .path("/questions" + "/{question-id}")
                .buildAndExpand(savedQuestion.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@RequestBody QuestionDto.Patch dto,
                                        @PathVariable("question-id") long questionId)
    {
        dto.setId(questionId);

        Question question = questionService.updateQuestion(mapper.questionPatchDtoToQuestion(dto));

        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(question), HttpStatus.OK);
    }
    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") long questionId)
    {
        Question question = questionService.findQuestion(questionId);

        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(question), HttpStatus.OK);
    }

    // 페이지네이션 나중에
    @GetMapping
    public ResponseEntity getQuestions()
    {
        List<Question> questions = questionService.findQuestions();
        List<QuestionDto.Response> responses = mapper.questionsToQuestionResponseDtos(questions);

        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") long id)
    {
        questionService.removeQuestion(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
