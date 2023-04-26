package com.example.demo.question;

import com.example.demo.response.ErrorResponse;
import com.example.demo.response.MultiResponseDto;
import com.example.demo.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

/**
 * 기본 CRUD
 * 페이지네이션
 */

@RestController
@RequestMapping("/questions")
public class QuestionController {

    private final static String QUESTION_DEFAULT_URL = "/questions";
    private QuestionService questionService;
    private QuestionMapper mapper;

    public QuestionController(QuestionService questionService,
                              QuestionMapper mapper)
    {
        this.questionService = questionService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionDto.Post dto)
    {
        Question question = mapper.questionPostDtoToQuestion(dto);

        Question savedQuestion = questionService.createQuestion(question);

        // URI 인스턴트로 만들어서 헤더에 정보추가하기
        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, savedQuestion.getId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@RequestBody QuestionDto.Patch dto,
                                        @PathVariable("question-id") long questionId)
    {
        //dto.setId(questionId);

        Question question = questionService.updateQuestion(mapper.questionPatchDtoToQuestion(dto),questionId);

        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(question), HttpStatus.OK);
    }

    @PatchMapping("/{question-id}/votes/{up-and-down}")
    public ResponseEntity patchQuestionVote(@PathVariable("question-id") long questionId,
                                            @PathVariable("up-and-down") String upAndDown)
    {
        Question question = questionService.updateQuestionVote(upAndDown, questionId);

        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(question), HttpStatus.OK);
    }


    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") long questionId)
    {
        Question question = questionService.findQuestion(questionId);

        return new ResponseEntity<>(mapper.questionToQuestionResponseWithAnswersDto(question), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getQuestions(@RequestParam(value = "page", required = false) Integer page,
                                       @RequestParam(value = "size", required = false) Integer size)
    {
        if(page == null) page = 1;
        if(size == null) size = 10;
        Page<Question> questionPage = questionService.findQuestions(page-1, size);

        List<Question> questions = questionPage.getContent();
        List<QuestionDto.Response> responses = mapper.questionsToQuestionResponseDtos(questions);

        return new ResponseEntity<>(new MultiResponseDto<>(responses,questionPage), HttpStatus.OK);
    }


    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") long id)
    {
        questionService.removeQuestion(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search")
    public ResponseEntity searchQuestions(@RequestParam(value = "keyword") String keyword,
                                         @RequestParam(value = "page", required = false) Integer page,
                                         @RequestParam(value = "size", required = false) Integer size) {
        if(page == null) page = 1;
        if(size == null) size = 10;

        Page<Question> questionPage = questionService.searchQuestions(keyword, page-1, size);

        List<Question> questions = questionPage.getContent();

        List<QuestionDto.Response> responses = mapper.questionsToQuestionResponseDtos(questions);

        return new ResponseEntity<>(new MultiResponseDto<>(responses,questionPage), HttpStatus.OK);
    }
}
