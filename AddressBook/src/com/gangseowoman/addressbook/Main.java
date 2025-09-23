package com.gangseowoman.addressbook; // 반드시 첫줄에 와야

// 패키지명은 폴더 위치와 정확하게 일치
// 도메인을 뒤집어서 쓴다.  org.springframework......

public class Main {
	// main 함수는 객체를 만들지 않아도 호출되어야 하므로 static 키워드가 반드시 있어야 한다.
	public static void main(String[] args) {
		System.out.println("주소록");

		AddressbookDao dao = new AddressbookDao();
//		dao.append();
//		dao.output();
		dao.start();

		// List - ArrayList의 부모 클래스
		/*
		 * 부모객체의 참조는 자식객체를 언제나 참조할 수 있다. (업캐스팅)
		 * 자식객체의 참조는 부모객체를 참조할 수 없다.
		 */
		// 업캐스팅, 부모 참조자 List 타입 변수로 ArrayList 타입 객체를 본다.
		// ArrayList 타입이 List 타입으로 전환
		// 나는 사람이다.
		// 다운캐스팅 ArrayList<AddressbookDto> list = new List<>();
		//        절대 허용하면 안된다.
		/*
		 * List<AddressbookDto> list = new ArrayList<AddressbookDto>();
		 *
		 * .......
		 *
		 * ArrayList<AddressbookDto> list2 = (ArrayList<AddressbookDto>)list;
		 *
		 * 예외적으로 필요한 경우에는 강제 형변환으로 해야 한다.
		 *
		 * List list = new ArrayList();
		 * list.add(new AddressbookDto());
		 *
		 * AddressbookDto dto = (AddressbookDto)list.get(0); 반환값이 Object타입
		 *
		 */

//		List<AddressbookDto> list = new ArrayList<AddressbookDto>();
//
//		AddressbookDto dto = new AddressbookDto();
//		dto.setId(1);
//		dto.setName("홍길동");
//		dto.setPhone("010-1234-1234");
//		dto.setEmail("naver@naver.com");
//		dto.setAddress("서울시 강서구");
//
//		list.add(dto);
//
//		list.add(new AddressbookDto(2, "임꺽정", "010-1234-1234", "daum@daum.net", "서울시 구로구"));


	}



}
