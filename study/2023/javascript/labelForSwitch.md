# label for switch 루프에서 나가기

[참고자료](https://stackoverflow.com/questions/17072605/break-for-loop-from-inside-of-switch-case-in-javascript)

```js
mainLoop: for (;;) {
  switch (true) {
    case true:
      break mainLoop;
  }
}
```
