package com.example.demo.question;

import com.google.gson.Gson;
import org.apache.catalina.security.SecurityConfig;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static com.example.demo.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.example.demo.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = QuestionController.class, excludeFilters = {
        @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)
})
@AutoConfigureRestDocs
public class QuestionControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private QuestionService questionService;

    @MockBean
    private QuestionMapper mapper;

    @Autowired
    private Gson gson;

    @Test
    @WithMockUser
    public void postQuestionTest() throws Exception
    {
        //given
        QuestionDto.Post postDto = new QuestionDto.Post("title","content");
        String content = gson.toJson(postDto);

        Question mockResultQuestion = new Question(1L,"test","test");

        given(mapper.questionPostDtoToQuestion(Mockito.any(QuestionDto.Post.class))).willReturn(new Question());
        given(questionService.createQuestion(Mockito.any(Question.class))).willReturn(mockResultQuestion);

        //when
        ResultActions actions =
                mockMvc.perform(
                        post("/questions")
                                .with(csrf())
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        //then
        actions
                .andExpect(status().isCreated())
                .andDo(
                        document(
                                "post-question",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                requestFields(List.of(
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("질문 내용")
                                )),
                                responseHeaders(
                                        headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                                )
                        )
                );
    }

    @Test
    @WithMockUser
    public void patchQuestionTest() throws Exception
    {
        //given
        Long id = 1L;
        QuestionDto.Patch patch = new QuestionDto.Patch(id,"test", "content");
        String content = gson.toJson(patch);

        QuestionDto.Response response = new QuestionDto.Response(1L,"test", "test");

        given(mapper.questionPatchDtoToQuestion(Mockito.any(QuestionDto.Patch.class))).willReturn(new Question());
        given(questionService.updateQuestion(Mockito.any(Question.class))).willReturn(new Question());
        given(mapper.questionToQuestionResponseDto(Mockito.any(Question.class))).willReturn(response);


        //when

        ResultActions actions =
                mockMvc.perform(
                        patch("/questions/{id}",id)
                                .with(csrf())
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(patch.getId()))
                .andExpect(jsonPath("$.title").value(patch.getTitle()))
                .andDo(
                        document(
                                "patch-question",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(parameterWithName("id").description("질문 식별자")),
                                requestFields(List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("질문 내용")
                                )),
                                responseFields(List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("질문 내용")
                                ))
                        )
                );
    }

    @Test
    @WithMockUser
    public void getQuestionTest() throws Exception
    {
        //given
        Long id = 1L;
        QuestionDto.Response response = new QuestionDto.Response(1L,"test", "test");

        given(questionService.findQuestion(Mockito.anyLong())).willReturn(new Question());
        given(mapper.questionToQuestionResponseDto(Mockito.any(Question.class))).willReturn(response);

        //when
        ResultActions actions =
                mockMvc.perform(
                        get("/questions/{id}",id)
                                .with(csrf())
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                );

        //then
        actions
                .andExpect(status().isOk())
                .andDo(
                        document(
                                "get-question",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(parameterWithName("id").description("질문 식별자")),
                                responseFields(List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("질문 내용")
                                ))
                        )
                );
    }

    @Test
    @WithMockUser
    public void getQuestionsTest() throws Exception
    {
        List<Question> questions = new ArrayList<>();
        for(Long i = 1L; i<=5L; i++) questions.add(new Question(i,"test","test"));
        List<QuestionDto.Response> responses = new ArrayList<>();
        for(Long i = 1L; i<=5L; i++) responses.add(new QuestionDto.Response(i,"test","test"));

        given(questionService.findQuestions()).willReturn(questions);
        given(mapper.questionsToQuestionResponseDtos(Mockito.anyList())).willReturn(responses);

        ResultActions actions = mockMvc.perform(
                get("/questions")
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        actions
                .andExpect(status().isOk())
                .andDo(
                        document(
                                "get-questions",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                responseFields(
                                        List.of(fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("[].title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("[].content").type(JsonFieldType.STRING).description("질문 내용")
                                ))
                        )
                );
    }

    @Test
    @WithMockUser
    public void deleteQuestionTest() throws Exception
    {
        //given
        Long id = 1L;
        QuestionDto.Response response = new QuestionDto.Response(1L,"test", "test");

        doNothing().when(questionService).removeQuestion(Mockito.anyLong());

        //when
        ResultActions actions =
                mockMvc.perform(
                        delete("/questions/{id}",id)
                                .with(csrf())
                                .accept(MediaType.APPLICATION_JSON)
                                //.contentType(MediaType.APPLICATION_JSON)
                );

        //then
        actions
                .andExpect(status().isNoContent())
                .andDo(
                        document(
                                "delete-question",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(parameterWithName("id").description("질문 식별자"))
                        )
                );
    }
}
