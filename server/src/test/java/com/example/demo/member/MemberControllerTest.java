package com.example.demo.member;

import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static com.example.demo.utils.ApiDocumentUtils.getRequestPreProcessor;
import static com.example.demo.utils.ApiDocumentUtils.getResponsePreProcessor;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MemberController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class MemberControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MemberService memberService;

    @MockBean
    private MemberMapper mapper;

    @Autowired
    private Gson gson;

    @Test
    public void postMemberTest() throws Exception {
        MemberDto.Post post = new MemberDto.Post(
                "홍길동", "hgd@gmail.com", "12345", false, true
        );
        String content = gson.toJson(post);

        given(mapper.memberPostToMember(Mockito.any(MemberDto.Post.class))).willReturn(new Member());

        Member mockResultMember = new Member();
        mockResultMember.setMemberId(1L);
        given(memberService.createMember(Mockito.any(Member.class))).willReturn(mockResultMember);

        ResultActions actions = mockMvc.perform(post("/members")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
        );

        actions.andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/members"))))
                .andDo(document(
                        "post-member",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("fullName").type(JsonFieldType.STRING).description("이름"),
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호"),
                                        fieldWithPath("isCaptcha").type(JsonFieldType.BOOLEAN).description("캡챠 동의 여부"),
                                        fieldWithPath("isMarketing").type(JsonFieldType.BOOLEAN).description("마케팅 수신 동의 여부")
                                )
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        )
                ));
    }

    @Test
    public void patchMemberTest() throws Exception {
        long memberId = 1L;
        MemberDto.Patch patch = new MemberDto.Patch(
                memberId, "홍길동", "01234", false, true, Member.MemberStatus.MEMBER_ACTIVE
        );
        String content = gson.toJson(patch);

        MemberDto.Response responseDto =
                new MemberDto.Response(1L,
                        "홍길동",
                        "hgd@gmail.com",
                        false,
                        true,
                        Member.MemberStatus.MEMBER_ACTIVE);

        given(mapper.memberPatchToMember(Mockito.any(MemberDto.Patch.class))).willReturn(new Member());

        given(memberService.updateMember(Mockito.any(Member.class))).willReturn(new Member());

        given(mapper.memberToMemberResponse(Mockito.any(Member.class))).willReturn(responseDto);

        ResultActions actions =
                mockMvc.perform(
                        patch("/members/{member-id}", memberId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("memberId").value(patch.getMemberId()))
                .andExpect(jsonPath("fullName").value(patch.getFullName()))
//                .andExpect(jsonPath("password").value(patch.getPassword()))
                .andExpect(jsonPath("isCaptcha").value(patch.getIsCaptcha()))
                .andExpect(jsonPath("isMarketing").value(patch.getIsMarketing()))
                .andExpect(jsonPath("memberStatus").value(patch.getMemberStatus().getStatus()))
                .andDo(document("patch-member",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("member-id").description("회원 식별자")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자").ignored(),
                                        fieldWithPath("fullName").type(JsonFieldType.STRING).description("이름").optional(),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호").optional(),
                                        fieldWithPath("isCaptcha").type(JsonFieldType.BOOLEAN).description("캡챠 동의 여부").optional(),
                                        fieldWithPath("isMarketing").type(JsonFieldType.BOOLEAN).description("마케팅 수신 동의 여부").optional(),
                                        fieldWithPath("memberStatus").type(JsonFieldType.STRING).description("회원 상태: MEMBER_ACTIVE / MEMBER_SLEEP / MEMBER_QUIT").optional()
                                )
                        ),
                        responseFields(
                                List.of(
//                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("fullName").type(JsonFieldType.STRING).description("이름"),
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("isCaptcha").type(JsonFieldType.BOOLEAN).description("캡챠 동의 여부"),
                                        fieldWithPath("isMarketing").type(JsonFieldType.BOOLEAN).description("마케팅 수신 동의 여부"),
                                        fieldWithPath("memberStatus").type(JsonFieldType.STRING).description("회원 상태: 활동중 / 휴면 상태 / 탈퇴 상태")
                                )
                        )
                ));
    }

    @Test
    public void getMemberTest() throws Exception {
        long memberId = 1L;

        MemberDto.Response response =
                new MemberDto.Response(1L,
                        "홍길동",
                        "hgd@gmail.com",
                        false,
                        true,
                        Member.MemberStatus.MEMBER_ACTIVE);

        given(memberService.findMember(Mockito.anyLong())).willReturn(new Member());;
        given(mapper.memberToMemberResponse(Mockito.any(Member.class))).willReturn(response);

        ResultActions actions = mockMvc.perform(get("/members/{member-id}", memberId)
                .accept(MediaType.APPLICATION_JSON));

        actions.andExpect(status().isOk())
                .andExpect(jsonPath("memberId").value(memberId))
                .andDo(document("get-member",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                List.of(
                                        parameterWithName("member-id").description("회원 식별자")
                                )
                        ),
                        responseFields(
                                List.of(
//                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("fullName").type(JsonFieldType.STRING).description("이름"),
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("isCaptcha").type(JsonFieldType.BOOLEAN).description("캡챠 동의 여부"),
                                        fieldWithPath("isMarketing").type(JsonFieldType.BOOLEAN).description("마케팅 수신 동의 여부"),
                                        fieldWithPath("memberStatus").type(JsonFieldType.STRING).description("회원 상태: 활동중 / 휴면 상태 / 탈퇴 상태")
                                )
                        )
                )).andReturn();
    }

    @Test
    public void deleteMemberTest() throws Exception {
        long memberId = 1L;

        mockMvc.perform(delete("/members/{member-id}", memberId))
                .andExpect(status().isNoContent())
                .andDo(document("delete-member",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("member-id").description("회원 식별자")
                        )
                ));
    }
}
