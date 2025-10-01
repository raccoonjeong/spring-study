package com.woori.project.board;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor // 디폴트 생성자
@AllArgsConstructor // 전체 필드를 매개변수로 갖는 생성자
@ToString // 클래스 출력할 때 내부 구조를 보여준다. toString 함수 오버라이딩
public class BoardDto {
    private int id; // id 또는 seq 필요 - 중복되서 들어가면 안됨. 게시글을 삭제하거나
                    // 수정하거나 할 때(게시물 식별값, 작성자 아이디)
    private String title;
    private String contents;
    private String writer;
    private String wdate;

    // 글쓴이 IP
    // 삭제 여부를 나타내는 필드를 하나 추가함

}
