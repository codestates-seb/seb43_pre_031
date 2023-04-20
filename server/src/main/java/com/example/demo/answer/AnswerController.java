package com.example.demo.answer;

import com.example.demo.response.MultiResponseDto;
import com.example.demo.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/answers")
@Validated
public class AnswerController {
    private final static String ANSWER_DEFAULT_URL = "/answers";
    private final AnswerService answerService;
    private final AnswerMapper mapper;

    public AnswerController(AnswerService answerService, AnswerMapper mapper) {
        this.answerService = answerService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerDto.Post requestBody) {
        Answer answer = answerService.createAnswer(mapper.answerPostDtoToAnswer(requestBody));

        URI location = UriCreator.createUri(ANSWER_DEFAULT_URL, answer.getId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity patchAnswer(@PathVariable("id") @Positive long id,
                                      @Valid @RequestBody AnswerDto.Patch requestBody) {
        requestBody.setId(id);
        Answer answer = answerService.updateAnswer(mapper.answerPatchDtoToAnswer(requestBody));

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(answer), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity getAnswer(@PathVariable("id") @Positive long id) {
        Answer answer = answerService.findAnswer(id);

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(answer), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAnswers(@Positive @RequestParam int page, @Positive @RequestParam int size) {
        Page<Answer> answerPage = answerService.findAnswers(page - 1, size);
        List<Answer> answer = answerPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.answerToAnswerResponseDtos(answer), answerPage), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteAnswer(@PathVariable("id") @Positive long id) {
        answerService.deleteAnswer(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
