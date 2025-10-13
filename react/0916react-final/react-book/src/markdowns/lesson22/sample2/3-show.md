# 3. 이미지쇼 3단계

```jsx
import { useState } from "react";
import "./ImagePreviewStep2.css";

// 2단계: 모달에 이전/다음 버튼을 추가하고, 양 끝에서는 버튼을 비활성화
export default function ImagePreviewStep2() {
  const images = [
    { src: "https://picsum.photos/id/10/800/500", alt: "img-1" },
    { src: "https://picsum.photos/id/20/800/500", alt: "img-2" },
    { src: "https://picsum.photos/id/30/800/500", alt: "img-3" },
    { src: "https://picsum.photos/id/40/800/500", alt: "img-4" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const openModal = (idx) => {
    setCurrentIndex(idx);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setCurrentIndex(null);
  };

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  const next = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const atStart = currentIndex === 0;
  const atEnd = currentIndex === images.length - 1;

  return (
    <div className="imgpv-container">
      <div className="imgpv-grid">
        {images.map((img, idx) => (
          <button
            key={idx}
            className="imgpv-thumb"
            onClick={() => openModal(idx)}
          >
            <img src={img.src} alt={img.alt} />
          </button>
        ))}
      </div>

      {isOpen ? (
        <div className="imgpv-modal-bg" onClick={closeModal}>
          <div className="imgpv-modal" onClick={(e) => e.stopPropagation()}>
            <div className="imgpv-modal-top">
              <button onClick={closeModal}>닫기</button>
            </div>

            <div className="imgpv-stage">
              <button
                className="imgpv-nav"
                onClick={prev}
                disabled={atStart}
                aria-label="이전"
              >
                ◀
              </button>

              <img
                className="imgpv-modal-img"
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
              />

              <button
                className="imgpv-nav"
                onClick={next}
                disabled={atEnd}
                aria-label="다음"
              >
                ▶
              </button>
            </div>

            <div className="imgpv-counter">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
```
