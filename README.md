# Udemy Backend assignment-01-todos(2024.02.15)

## [요구사항]
### Authentication
- [x] 로그인한 사용자만 todos CRUD를 수행할 수 있게 해 줄 것
- [x] jwt 활용

### Todos CRUD(File I/O)
- [x] jsonplaceholder API todos 데이터를 /data/todos.json에 담아두고
    - [x] Create todo
    - [x] Read todos, todo
    - [x] Update todo
    - [x] Delete todos, todo
- [x] 해당 기능을 context 패턴으로 구현할것(세미 DDD)

### user CRUD(File I/O)
- [x] user 정보를 /data/users.json에 담아두고
    - [x] Create user
    - [x] Read users, user
    - [x] Update user
    - [x] Delete user
- [x] log-in
- [x] log-out

## [개인 추가]
- user
    - [x] 로그인, 회원가입시 cookie에 accessToken 넣어서 반환
    - [x] refreshToken API 생성
- 미들웨어 playground
