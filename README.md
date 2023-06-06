# HANBOOK Frontend - 동아리 책 관리 시스템

## Any

/ - main 페이지
/book/{clubId} - 모든 동아리에 있는 책 조회
/book/{clubId}/detail - 모든 동아리 책 상세 정보

## User

### /club/{clubId}
/club/{clubId} - 동아리 책 조회
/club/{clubId}/book/{bookId} - 동아리 책 상세 정보

### /club/{clubId}?club-add-step
/club/{clubId}?club-add-step=1 - 동아리 코드 입력 모달 -> 백엔드에게 동아리 추가 요청 
/club/{clubId}?club-add-step=2 - 성공(성공모달)/실패(실패모달)

### /club/{clubId}/book/{bookId}?book-rent-step
/club/{clubId}/book/{bookId}?book-rent-step=1 - 대여 진행 질문 모달 -> 백엔드에게 대여 요청 
/club/{clubId}/book/{bookId}?book-rent-step=2 - 성공(성공모달)/실패(실패모달)

### /manage/user-book/{clubId}
/manage/user-book/{clubId}/book/{bookId} - 동아리 책 상세 정보
/manage/user-book/{clubId}/book/{bookId}?return-book-step=1 - 반납 사진 제출 모달 (위치가 학교 근처가 아니거나 위치를 막아놓으면 빠꾸) -> 백엔드에게 반납 요청
/manage/user-book/{clubId}/book/{bookId}?return-book-step=2 - 성공(성공모달)/실패(실패모달)



