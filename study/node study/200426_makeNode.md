file에 대한 설명
===

routes/page.js 
- /profile, /join, / 3개 페이지로 구성
- 회원가입과 로그인 시 에러메세지를 보여주기위해 flash 메세지가 연결

views/layout.pug 
- if문을 중점적으로 보면 됨  
- 렌더링할 때 사용된 user가 존재하면 사용가정보와 팔로잉, 팔로워 수를 보여주고, 
    존재하지 않으면 로그인 메뉴를 보여줌

views/main.pug
- user변수가 존재할 때 게시글 업로드 폼을 보여줌
- 렌더링 시 twits 배열 안의 요소들을 읽어서 게시글로 만듬

views/profile.pug
- 사용자의 팔로워와 팔로잉 중인 목록을 보여줌

views/join.pug
- 회원가입하는 폼을 보여줌

views/error.pug
- 서버에 에러 발생 시 에러 내역을 보여줌

public/main.css
- 스타일시트