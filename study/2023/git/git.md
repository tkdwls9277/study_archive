# git

<br/>

---

<br/>

1. git 설치

- [설치](https://git-scm.com/downloads)

```bash
# mac
brew install git

# linux
sudo yum install git # Redhat
sudo apt install git # Debian
```

<br/>

---

<br/>

2. committer 설정
```bash
git config --global user.name [아이디]
git config --global user.email [이메일@주소]

# --global을 빼면 각 레포별로 설정 가능
```

<br/>

---

<br/>

3. vs code 설치 및 플러그인 설정

- [설치](https://code.visualstudio.com/)

- GitLens: 커서가 있는 라인의 마지막 이력을 보여줌
- Git Graph: Git의 브랜치를 트리형태로 보여줌

<br/>

---

<br/>

4. github와 연결

- https://github.com 에 계정 생성

- clone: git clone [url]

- clone 파일로 이동: cd xxxxxxx

- branch 확인: git branch xxxxx

- branch 변경: git checkout xxxx

- visual studio code 실행: code .

<br/>

---

<br/>

5. git 브랜치 개념 익히기
- [git 학습용 페이지](https://learngitbranching.js.org/?locale=ko)

<br/>

---

<br/>

6. git 명령어

<br/>

## 기본

### 코드 가져오기

- git clone : 레포지토리를 가져온다.

### 커밋하기

- git add : "스테이징 영역"에 새 파일이나 변경 사항을 추가. 현재 작업 디렉토리에 모든 변경 사항을 추가

- git commit : 변경 사항을 저장소에 저장하고 나중에 참조 가능한 "커밋 메세지"를 남김.

### 상태보기

- git status : 저장소의 현재 상태. 추가, 수정, 삭제된 파일과 스테이징 영역에서 대기 중인 파일 확인 가능.

- git log : 저장소의 커밋 기록 확인 가능. 커밋 메세지, 작성자를 포함한 모든 커밋 목록이 표시.

- git diff : 현재 버전의 코드와 마지막으로 커밋된 버전과 비교. 추가, 수정, 삭제된 줄이 표시.

- git branch : git 저장소에서 분기를 관리. 브랜치 생성, 기존 브랜치로 전환, 브랜치 삭제 가능.

### 공유하기

- git push

- git pull

- git fetch

- git merge : 한 브랜치의 변경 사항을 다른 브랜치로 병합. 소스 브랜치 > 대상 브랜치

- git checkout : 다른 브랜치로 이동
### 로컬 저장소 만들기

- git init

### 원격 저장소 연결하기

- git remote

<br/>

## 고급

- git rebase : 여러 커밋을 보다 일관된 단일 커밋으로 재구성. 커밋 기록 정리, 여러 커밋을 하나로 압축.

- git cherry-pick : 한 브랜치에서 다른 브랜치로 특정 커밋을 선택적으로 적용 가능. 특정 커밋만 이동.

- git bisect : 특정 버그나 문제를 가져온 커밋 검색. 코드에서 문제의 원인을 빠르게 식별 가능.

- git reset : 커밋 실행 취소, 파일 수정 취소, 브랜치 포인터를 다른 커밋을 이동 가능

- git reflog : 리포지토리에서 브랜치 및 참조 업데이트의 전체 기록 식별 가능. 전체 기록을 확인하고 손실된 커밋을 복구하는 경우 사용.

- git tag

- git stash
- git stash list
- git stash pop

