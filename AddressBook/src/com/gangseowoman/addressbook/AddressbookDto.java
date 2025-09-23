package com.gangseowoman.addressbook;

// Dto - Data transfer Object - 보통은 디비의 테이블 단위로 만든다
// 1인분의 데이터를 저장할 클래스, 이름, 번호, 전화번호, 직장번호, 이메일, 팩스 ....
// 1사람 분량의 주소를 저장할 클래스를 만든다.
// 여러명의 경우는 별도의 클래스를 만들어서 거기서 관리해야 함. Dao - Data Access Object의 약자
// Dto - 택배상자, Dao - 택배 배달 아저씨, Service - 택배 관리 저장소?
// 스프링 -> 서비스 레벨, Dao간에 일이 충돌날 수 있다.
//         하나의 서비스가 여러개의 Dao를 소유하고 그 중 하나의 Dao라도
//         읽고 쓰기를 실패하면 모든 일을 취소시켜서 마치 없었던 일처럼 만든다
//         트랜잭션 처리-서비스, 택배기사가 협력해서 일을 해야 하는데
//         이걸 조절하고 명령할 누군가가 필요. 이걸 담당하는게 서비스 단이다.
//         컨트롤러 - 웹 클라이언트 ============> 웹 서버
//                            메뉴 주문 ----> 담당자
//                                          업무단위로 만든다.
//         http://gayang.com/member => MemberController
//         http://gayang.com/board => BoardController
// DI -> Dependency Injection
// AddressbookDto dto = new AddressbookDto();
// AddressbookDto dto; 객체를 프레임워크가 만들어서 주입을 시켜준다.
/*
 * @Autowired // X
 * AddressbookDto dto // 이 클래스는 계속 만들어졌다 없어졌다 해야한다.
 * AddressbookDto dto = new AddressbookDto();
 *
 * Dao Service Controller 일을 하는 애들. 데이터를 달고 왔다갔다.
 * 이거 만들었다 없앴다 하면 효율성이 떨어짐.
 * 전체를 통털어 하나씩만 만듦. 클래스는 원칙적으로 객체를 미친듯이 많이 만드는게 맞지만
 * 때로는 하나만 만들거나 안만들고 사용하는 경우도 있다.
 * 한개만 만들게 클래스 설계(싱글톤)하는 방법. 스프링이 알아서 컨트롤러 서비스 Dao는 하나씩만 만든다.
 * 참조를 자기가 다 갖고 있다.
 * @Controller @Service @Repository @RestController
 * 써 있는 클래스를 찾아서 객체를 다 만들어서 스프링이 객체를 갖고있다.
 *
 */


public class AddressbookDto {
	private int id;
	private String name;
	private String phone;
	private String email;
	private String address;

	// 생성자 -> 객체 생성시 "자동으로" 호출된다.
	//         자바의 경우에는 클래스명이 생성자명이 된다.
	//         자바스크립트 constructor, 파이썬 __init__

	// 매개변수가 없는 생성자를 디폴트 생성자라고 부른다.
	// 없으면 만들어서라도 호출한다.
	public AddressbookDto() {
		this.id = 1;
		this.name = "홍길동";
		this.phone = "010-1234-1234";
		this.email = "naver@naver.com";
		this.address = "서울시 강서구";
	}

	public AddressbookDto(int id, String name, String phone, String email, String address) {
		super();
		this.id = id;
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.address = address;
	}


	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}

}

