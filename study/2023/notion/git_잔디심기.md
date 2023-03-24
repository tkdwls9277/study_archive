# 1.git\_잔디심기

### 1. [잔디심어주는 코드 생성 페이지](https://bloggify.github.io/github-calendar/example/)에서 html속 "your-username"에 git id를 넣어준다.

<br/>

예시

```html
<!-- Include the library. -->
<script src="https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js"></script>

<!-- Optionally, include the theme (if you don't want to struggle to write the CSS) -->
<link
  rel="stylesheet"
  href="https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css"
/>

<!-- Prepare a container for your calendar. -->
<div class="calendar">
  <!-- Loading stuff -->
  Loading the data just for you.
</div>

<script>
  GitHubCalendar(".calendar", "tkdwls9277");
  // or enable responsive functionality
  GitHubCalendar(".calendar", "tkdwls9277", { responsive: true });
</script>
```

<br/>
<br/>

### 2. 생성된 html 코드를 [html 블록 생성 페이지](https://www.notion-tools.com/embeds/html)에서 변환해준다.

<img src = "https://oopy.lazyrockets.com/api/v2/notion/image?src=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6943b800-615e-4def-a654-0a9884e9d73d%2FHTML_.png&blockId=e0d8238e-99bd-451d-a6cf-1fe096db65f3" width=400px>

<br/>
<br/>

### 3. html 블록을 임베드 해서 넣는다.

<img src="https://oopy.lazyrockets.com/api/v2/notion/image?src=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff607c9c4-4a9b-4cf8-896b-832ff28e2d81%2FUntitled.png&blockId=4749623f-1183-45d4-b2e1-80de8860fe70" width = 400px>

<br/>
<br/>

### 4. 조금 기다리면 잔디가 나온다.

<img src="../../assets/gitGrass.png" width = 400px>
