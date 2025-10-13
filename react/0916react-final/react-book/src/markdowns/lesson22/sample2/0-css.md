# CSS

```css
/* 기본 레이아웃 */
.imgpv-container {
  max-width: 960px;
  margin: 24px auto;
  padding: 12px;
  font-family: sans-serif;
}
.imgpv-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}
.imgpv-thumb {
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  padding: 0;
  background: #fff;
  cursor: pointer;
}
.imgpv-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 모달 */
.imgpv-modal-bg {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
}
.imgpv-modal {
  width: min(60vw, 1000px);
  background: #fff;
  border-radius: 10px;
  padding: 12px;
  box-sizing: border-box;
}

.imgpv-modal-top {
  display: flex;
  justify-content: flex-end;
}
.imgpv-modal-top button {
  padding: 6px 10px;
  border: 1px solid #bbb;
  background: #fff;
  cursor: pointer;
  border-radius: 6px;
}
.imgpv-modal-top button:hover {
  background: #eee;
}

/* 메인 스테이지 + 네비 */
.imgpv-stage {
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
}
.imgpv-modal-img {
  width: 100%;
  height: auto;
  border-radius: 6px;
  display: block;
}

.imgpv-nav {
  padding: 8px;
  border: 1px solid #bbb;
  background: #fff;
  cursor: pointer;
  border-radius: 6px;
}
.imgpv-nav:hover {
  background: #eee;
}

/* 카운터 */
.imgpv-counter {
  text-align: center;
  color: #666;
  font-size: 14px;
  margin: 6px 0 8px;
}

/* 하단 썸네일 스트립 */
.imgpv-strip {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(80px, 1fr);
  gap: 8px;
  overflow-x: auto;
  padding: 6px 2px 2px;
}

.imgpv-strip-thumb {
  border: 2px solid transparent;
  padding: 0;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  cursor: pointer;
}

.imgpv-strip-thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.imgpv-strip-thumb.is-active {
  border-color: #3a7afe; /* 현재 선택 항목 표시 */
}
```
