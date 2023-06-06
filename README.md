# HANBOOK Frontend - 동아리 책 관리 시스템

## Any(접속하는 사용자)

/ - main 페이지
/book/{clubId} - 모든 동아리에 있는 책 조회<br>
/book/{clubId}/detail - 모든 동아리 책 상세 정보
/login - 로그인 페이지
/register - 회원가입 페이지

## User(부원)

### /club/{clubId}
/club/{clubId} - 동아리 책 조회<br>

### /club/{clubId}?club-add-step
/club/{clubId}?club-add-step=1 - 동아리 코드 입력 모달 -> 백엔드에게 동아리 추가 요청 <br>
/club/{clubId}?club-add-step=2 - 성공(성공모달)/실패(실패모달)

### /club/{clubId}/book/{bookId}?book-rent-step
/club/{clubId}/book/{bookId}?book-rent-step=1 - 대여 진행 질문 모달 -> 백엔드에게 대여 요청 <br>
/club/{clubId}/book/{bookId}?book-rent-step=2 - 성공(성공모달)/실패(실패모달)

### /manage/user-book/{clubId}
/manage/user-book/{clubId}/book/{bookId} - 동아리 책 상세 정보<br>
/manage/user-book/{clubId}/book/{bookId}?return-book-step=1 - 반납 사진 제출 모달 (위치가 학교 근처가 아니거나 위치를 막아놓으면 빠꾸) -> 백엔드에게 반납 요청<br>
/manage/user-book/{clubId}/book/{bookId}?return-book-step=2 - 성공(성공모달)/실패(실패모달)

## Admin(부장)

### /manage/club-book
manage/club-book?option=all - 모든 동아리 책 조회<br>
manage/club-book?option=can-rent - 대여가능인 동아리 책 조회<br>
manage/club-book?option=renting - 대여 중인 동아리 책 조회<br>
manage/club-book?option=can-not-rent - 대여불가인 동아리 책 조회<br>
**어느 옵션이든지 + 버튼을 누르면 책 추가 모달** <br>
책 추가 모달에서 추가하기 누르면 백엔드에게 요청 -> 성공(성공모달)/실패(실패모달)

### /manage/club
/manage/club - 동아리에 존재하는 모든 부원 조회 <br>
/manage/club/member/{userId} - 동아리 부원 상세 모달 <br>
**초대 코드 생성하기 버튼 누르면 로딩 창 뜬 후 백엔드에게 요청 -> 성공(초대 코드 발급 모달)/실패(실패 모달)**







