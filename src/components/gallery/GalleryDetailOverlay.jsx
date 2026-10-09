import { useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Overlay from '../common/Overlay';
import { Heart } from '../common/Decor';

/**
 * @typedef {Object} GalleryDetailOverlayProps
 * @property {Object} item 当前画廊条目
 * @property {() => void} onClose
 * @property {() => void} onPrev
 * @property {() => void} onNext
 * @property {boolean} hasPrev
 * @property {boolean} hasNext
 */

/** 爱好详情浮层：大图 + 标题 + 日期 + 一句话，左右键可继续翻看 */
export default function GalleryDetailOverlay({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'ArrowLeft' && hasPrev) {
        event.preventDefault();
        onPrev();
      } else if (event.key === 'ArrowRight' && hasNext) {
        event.preventDefault();
        onNext();
      }
    },
    [hasPrev, hasNext, onPrev, onNext]
  );

  return (
    <Overlay label={`${item.title} 详情`} onClose={onClose} onKeyDownExtra={handleKeyDown}>
      <button
        type="button"
        className="btn btn--icon overlay__close"
        onClick={onClose}
        aria-label="关闭详情"
      >
        <X size={20} aria-hidden="true" />
      </button>

      <div className="gallery-detail">
        <img
          className="gallery-detail__image"
          src={item.image}
          alt={item.alt}
          width="1280"
          height="853"
          decoding="async"
        />

        <div className="gallery-detail__body">
          <h2 className="detail-title">{item.title}</h2>
          <p className="gallery-detail__date caption">
            <Heart />
            <span>{item.date}</span>
          </p>
          <p className="gallery-detail__caption">{item.caption}</p>

          <div className="gallery-detail__nav">
            <button type="button" className="btn btn--secondary" onClick={onPrev} disabled={!hasPrev}>
              <ChevronLeft size={18} aria-hidden="true" />
              上一张
            </button>
            <button type="button" className="btn btn--secondary" onClick={onNext} disabled={!hasNext}>
              下一张
              <ChevronRight size={18} aria-hidden="true" />
            </button>
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              关闭
            </button>
          </div>
        </div>
      </div>
    </Overlay>
  );
}
