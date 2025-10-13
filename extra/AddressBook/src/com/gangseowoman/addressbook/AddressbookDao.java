package com.gangseowoman.addressbook;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class AddressbookDao {

	List<AddressbookDto> list = new ArrayList<AddressbookDto>();
	Scanner sc = new Scanner(System.in);

	// 생성자를 이용해서 데이터를 초기화 한다
	public AddressbookDao() {
		super(); // 부모 생성자 호출, 무조건 첫번째
	    list.add(new AddressbookDto(1, "A", "010-0000-0001", "A@xxx.com", "A동"));
	    list.add(new AddressbookDto(2, "B", "010-0000-0002", "B@xxx.com", "B동"));
	    list.add(new AddressbookDto(3, "C", "010-0000-0003", "C@xxx.com", "C동"));
	    list.add(new AddressbookDto(4, "D", "010-0000-0004", "D@xxx.com", "D동"));
	    list.add(new AddressbookDto(5, "E", "010-0000-0005", "E@xxx.com", "E동"));
	}

	public void append() {
		AddressbookDto dto = new AddressbookDto();

		dto.setId(list.size() + 1);
		System.out.print("이름 ");
		dto.setName(sc.next());
		System.out.print("전화번호 ");
		dto.setPhone(sc.next());
		System.out.print("이메일 ");
		dto.setEmail(sc.next());
		System.out.print("주소 ");
		dto.setAddress(sc.next());

		list.add(dto);

	}

	public void output() {
		for (AddressbookDto dto : list) {
			// 서식화 출력
			System.out.printf("%d\t", dto.getId());
			System.out.printf("%s\t", dto.getName());
			System.out.printf("%s\t", dto.getPhone());
			System.out.printf("%s\t", dto.getEmail());
			System.out.printf("%s\n", dto.getAddress());
		}
	}

	public void search() {
		System.out.println("찾을 이름 ");
		String name = sc.next();

		// java 8부터 스트림이 추가됨, 모든 언어가 람다를 도입중
		// 람다 - 메모리의 효율성 유연성, 유지보수를 편하게 하기 위해서
		// 일회용 함수, 간단한 함수를 만들어서 쓰고 버린다
		// list에 있는 요소를 하나씩 받아오고 함수의 반환값은 boolean

		list.stream().filter((dto) -> {
			return dto.getName().equals(name);
		}).forEach((dto) -> {
			System.out.printf("%d\t", dto.getId());
			System.out.printf("%s\t", dto.getName());
			System.out.printf("%s\t", dto.getPhone());
			System.out.printf("%s\t", dto.getEmail());
			System.out.printf("%s\n", dto.getAddress());
		});
	}

	public void start() {
		while(true) {
			System.out.println("1.추가");
			System.out.println("2.출력");
			System.out.println("3.검색");
			System.out.println("0.종료");
			System.out.println("선택 : ");
			int sel = sc.nextInt();
			switch(sel) {
				case 1: append(); break;
				case 2: output(); break;
				case 3: search(); break;
				case 0: System.out.println("프로그램을 종료합니다!");
					return;
			}
		}

	}

}
