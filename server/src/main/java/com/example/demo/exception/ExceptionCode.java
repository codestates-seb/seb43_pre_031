package com.example.demo.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_QUIT(409, "Quit Member"),
    MEMBER_EXISTS(409, "Member exists"),
    QUESTION_NOT_FOUND(404, "Question not found"),
    ANSWER_NOT_FOUND(404, "Answer not found"),
    CANNOT_CHANGE_MEMBER(403, "Member can not change"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status"),

    UNAUTHORIZED_EDIT(401,"No permission"),
    UNAUTHORIZED_LOGIN(401, "The email or password is incorrect.");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
