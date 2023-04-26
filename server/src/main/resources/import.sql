INSERT INTO MEMBER (EMAIL, FULL_NAME,  IS_MARKETING, MEMBER_STATUS, PASSWORD) VALUES ('hgd1@gmail.com', '홍길동1', true,  'MEMBER_ACTIVE', '1111');
INSERT INTO MEMBER (EMAIL, FULL_NAME,  IS_MARKETING, MEMBER_STATUS, PASSWORD) VALUES ('hgd2@gmail.com', '홍길동2', true, 'MEMBER_ACTIVE', '2222');
INSERT INTO MEMBER (EMAIL, FULL_NAME,  IS_MARKETING, MEMBER_STATUS, PASSWORD) VALUES ('hgd3@gmail.com', '홍길동3', true, 'MEMBER_ACTIVE', '3333');
INSERT INTO MEMBER (EMAIL, FULL_NAME, IS_MARKETING, MEMBER_STATUS, PASSWORD) VALUES('hgd4@gmail.com', '홍길동4', true, 'MEMBER_ACTIVE', '4444');
INSERT INTO MEMBER (EMAIL, FULL_NAME, IS_MARKETING, MEMBER_STATUS, PASSWORD) VALUES('hgd5@gmail.com', '홍길동5', true,  'MEMBER_ACTIVE', '5555');
INSERT INTO MEMBER (EMAIL, FULL_NAME,  IS_MARKETING, MEMBER_STATUS, PASSWORD) VALUES('hgd6@gmail.com', '홍길동6', true,  'MEMBER_ACTIVE', '6666');
INSERT INTO MEMBER (EMAIL, FULL_NAME,  IS_MARKETING, MEMBER_STATUS, PASSWORD) VALUES('hgd7@gmail.com', '홍길동7', true,  'MEMBER_ACTIVE', '7777');
INSERT INTO MEMBER (EMAIL, FULL_NAME, IS_MARKETING, MEMBER_STATUS, PASSWORD) VALUES('hgd8@gmail.com', '홍길동8', true,  'MEMBER_ACTIVE', '8888');
INSERT INTO MEMBER (EMAIL, FULL_NAME, IS_MARKETING, MEMBER_STATUS, PASSWORD) VALUES('hgd9@gmail.com', '홍길동9', true,  'MEMBER_ACTIVE', '9999');
INSERT INTO MEMBER (EMAIL, FULL_NAME, IS_MARKETING, MEMBER_STATUS, PASSWORD) VALUES('hgd10@gmail.com', '홍길동10', true,'MEMBER_ACTIVE', '1010');
INSERT INTO MEMBER (EMAIL, FULL_NAME, IS_MARKETING, MEMBER_STATUS, PASSWORD) VALUES('hgd11@gmail.com', '홍길동11', true, 'MEMBER_ACTIVE', '1100');
INSERT INTO MEMBER (EMAIL, FULL_NAME, IS_MARKETING, MEMBER_STATUS, PASSWORD) VALUES('hgd12@gmail.com', '홍길동12', true,  'MEMBER_ACTIVE', '1212');

INSERT INTO QUESTION (title, content, asked_at, modified_at, member_id, tags, votes, question_Status) VALUES('질문1','질문 내용1', '2023-04-19 11:11:11',null,1,	'["a", "b", "c"]', 3, 'QUESTION_POST');
INSERT INTO QUESTION (title, content, asked_at, modified_at, member_id, tags, votes, question_Status) VALUES('질문2','질문 내용2', '2023-04-19 11:11:12',null,1,	'["a", "b"]', 3, 'QUESTION_POST');
INSERT INTO QUESTION (title, content, asked_at, modified_at, member_id, tags, votes, question_Status) VALUES('질문3','질문 내용3', '2023-04-19 11:11:13',null,1,	'["a", "c"]', 3000, 'QUESTION_POST');
INSERT INTO QUESTION (title, content, asked_at, modified_at, member_id, tags, votes, question_Status) VALUES('질문4','질문 내용4', '2023-04-19 11:11:14',null,1,	'["c"]', 3, 'QUESTION_POST');
INSERT INTO QUESTION (title, content, asked_at, modified_at, member_id, tags, votes, question_Status) VALUES('질문5','질문 내용5', '2023-04-19 11:11:15',null,1,	'["a", "b", "c"]', 3, 'QUESTION_POST');
INSERT INTO QUESTION (title, content, asked_at, modified_at, member_id, tags, votes, question_Status) VALUES('질문6','질문 내용6', '2023-04-19 11:12:11',null,1,	'["a", "b", "c"]', 3, 'QUESTION_POST');
INSERT INTO QUESTION (title, content, asked_at, modified_at, member_id, tags, votes, question_Status) VALUES('질문7','질문 내용7', '2023-04-19 11:13:11',null,1,	'["a", "b", "c"]', 3, 'QUESTION_POST');
INSERT INTO QUESTION (title, content, asked_at, modified_at, member_id, tags, votes, question_Status) VALUES('질문8','질문 내용8', '2023-04-19 11:14:11',null,1,	'["a", "b", "c"]', -3, 'QUESTION_POST');
INSERT INTO QUESTION (title, content, asked_at, modified_at, member_id, tags, votes, question_Status) VALUES('질문9','질문 내용9', '2023-04-19 12:11:11',null,1,	'["a", "b", "c"]', 3, 'QUESTION_POST');
INSERT INTO QUESTION (title, content, asked_at, modified_at, member_id, tags, votes, Question_Status) VALUES('질문10','질문 내용10', '2023-04-19 13:11:11',null,1,	'["a", "b", "c"]', 3, 'QUESTION_POST');
INSERT INTO QUESTION (title, content, asked_at, modified_at, member_id, tags, votes, question_Status) VALUES('질문11','질문 내용11', '2023-04-19 14:11:11',null,1, '["a", "b", "c"]', -200, 'QUESTION_POST');
INSERT INTO QUESTION (title, content, asked_at, modified_at, member_id, tags, votes, question_Status) VALUES('질문12','질문 내용12', '2023-04-19 15:11:11',null,1, '["a", "b", "c"]', 3, 'QUESTION_POST');
INSERT INTO QUESTION (title, content, asked_at, modified_at, member_id, tags, votes, question_Status) VALUES('질문13','질문 내용13', '2023-04-19 16:11:11',null,1, '["a", "b", "c"]', 3, 'QUESTION_POST');

INSERT INTO ANSWER (created_at, modified_at, content, status, member_id, question_id) VALUES('2023-04-18 11:11:01', '2023-04-18 11:11:01', '답변 내용1', 'ANSWER_VALID', 1, 1);
INSERT INTO ANSWER (created_at, modified_at, content, status, member_id, question_id) VALUES('2023-04-18 11:11:02', '2023-04-18 11:11:02', '답변 내용2', 'ANSWER_VALID', 2, 2);
INSERT INTO ANSWER (created_at, modified_at, content, status, member_id, question_id) VALUES('2023-04-18 11:11:03', '2023-04-18 11:11:03', '답변 내용3', 'ANSWER_VALID', 3, 3);
INSERT INTO ANSWER (created_at, modified_at, content, status, member_id, question_id) VALUES('2023-04-18 11:11:04', '2023-04-18 11:11:04', '답변 내용4', 'ANSWER_VALID', 4, 4);
INSERT INTO ANSWER (created_at, modified_at, content, status, member_id, question_id) VALUES('2023-04-18 11:11:05', '2023-04-18 11:11:05', '답변 내용5', 'ANSWER_VALID', 5, 5);
INSERT INTO ANSWER (created_at, modified_at, content, status, member_id, question_id) VALUES('2023-04-18 11:11:06', '2023-04-18 11:11:06', '답변 내용6', 'ANSWER_VALID', 6, 6);
INSERT INTO ANSWER (created_at, modified_at, content, status, member_id, question_id) VALUES('2023-04-18 11:11:07', '2023-04-18 11:11:07', '답변 내용7', 'ANSWER_VALID', 7, 7);
INSERT INTO ANSWER (created_at, modified_at, content, status, member_id, question_id) VALUES('2023-04-18 11:11:08', '2023-04-18 11:11:08', '답변 내용8', 'ANSWER_VALID', 8, 8);
INSERT INTO ANSWER (created_at, modified_at, content, status, member_id, question_id) VALUES('2023-04-18 11:11:09', '2023-04-18 11:11:09', '답변 내용9', 'ANSWER_VALID', 9, 9);
INSERT INTO ANSWER (created_at, modified_at, content, status, member_id, question_id) VALUES('2023-04-18 11:11:10', '2023-04-18 11:11:10', '답변 내용10', 'ANSWER_VALID', 10, 10);
INSERT INTO ANSWER (created_at, modified_at, content, status, member_id, question_id) VALUES('2023-04-18 11:11:11', '2023-04-18 11:11:11', '답변 내용11', 'ANSWER_VALID', 11, 11);
INSERT INTO ANSWER (created_at, modified_at, content, status, member_id, question_id) VALUES('2023-04-18 11:11:12', '2023-04-18 11:11:12', '답변 내용12', 'ANSWER_VALID', 12, 12);














