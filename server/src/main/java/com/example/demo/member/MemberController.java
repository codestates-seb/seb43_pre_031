package com.example.demo.member;

import com.example.demo.member.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/members")
@Validated
@Slf4j
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) throws URISyntaxException {
        Member member = mapper.memberPostToMember(requestBody);

        Member createdMember = memberService.createMember(member);

//        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, "login");

        return ResponseEntity.created(location).build();
    }

    @PostMapping("/login")
    public ResponseEntity loginMember(@RequestBody LoginDto.Post requestBody,
                                      HttpSession session) {
        session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                SecurityContextHolder.getContext());

        Member loginMember = memberService.login(requestBody, session);

        LoginDto.Response response = new LoginDto.Response(loginMember.getMemberId(),
                loginMember.getFullName(), loginMember.getEmail(), session.getId());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/logout")
    public String logoutMember(HttpSession session) {
        session.removeAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY);

        return "logout";
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                      @Valid @RequestBody MemberDto.Patch requestBody) {
        requestBody.setMemberId(memberId);

        Member member = memberService.updateMember(mapper.memberPatchToMember(requestBody));

        return new ResponseEntity<>(mapper.memberToMemberResponse(member), HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId) {
        Member member = memberService.findMember(memberId);

        return new ResponseEntity<>(mapper.memberToMemberResponse(member), HttpStatus.OK);
    }

    @GetMapping("/status")
    public ResponseEntity getMembers(@RequestParam int idx) {
        Member.MemberStatus memberStatus = Member.MemberStatus.values()[idx];

        List<Member> members = memberService.findMembersByMemberStatus(memberStatus);

        return new ResponseEntity<>(members, HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
