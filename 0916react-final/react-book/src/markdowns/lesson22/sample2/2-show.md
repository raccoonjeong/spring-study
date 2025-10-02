# 2. 이미지쇼 2단계

```jsx
import { useState } from "react";
import "./ImagePreviewStep1.css"; // 같은 이름의 CSS

// 1단계: 썸네일을 클릭하면 해당 이미지를 모달로 크게 보여줌 (닫기 버튼 포함)
export default function ImagePreviewStep1() {
  // 샘플 이미지들 (원하는 URL/경로로 바꿔 사용)
  const images = [
    { src: "https://picsum.photos/id/10/800/500", alt: "img-1" },
    { src: "https://picsum.photos/id/20/800/500", alt: "img-2" },
    { src: "https://picsum.photos/id/30/800/500", alt: "img-3" }, // 오타: picsum -> 고쳐 사용
    { src: "https://picsum.photos/id/40/800/500", alt: "img-4" },
  ];

  // 모달 열림 / 현재 선택 이미지 인덱스
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

  return (
    <div className="imgpv-container">
      <div className="imgpv-grid">
        {images.map((img, idx) => (
          <button
            key={idx}
            className="imgpv-thumb"
            onClick={() => openModal(idx)}
            aria-label={`미리보기 ${idx + 1}`}
          >
            <img src={img.src} alt={img.alt} />
          </button>
        ))}
      </div>

      {isOpen ? (
        <div className="imgpv-modal-bg" onClick={closeModal}>
          <div className="imgpv-modal" onClick={(e) => e.stopPropagation()}>
            <img
              className="imgpv-modal-img"
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
            />
            <div className="imgpv-actions">
              <button onClick={closeModal}>닫기</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
```
