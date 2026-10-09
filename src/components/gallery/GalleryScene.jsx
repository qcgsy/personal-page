import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SceneHeading from '../common/SceneHeading';
import GalleryDetailOverlay from './GalleryDetailOverlay';
import { Heart, WashiTape } from '../common/Decor';
import './gallery.css';

/**
 * @typedef {Object} GallerySceneProps
 * @property {Object} content gallery 文案与条目列表
 * @property {{kind:string,id:string,nonce:number}|null} [intent] 由目录页发来的定位请求
 * @property {() => void} [onIntentHandled] 处理完成后通知父级清空请求
 */

const pad = (value) => String(value).padStart(2, '0');

/** 场景 04：爱好展示（一格一格的图片轮播） */
export default function GalleryScene({ content, intent, onIntentHandled }) {
  const items = content.items;
  const count = items.length;

  const viewportRef = useRef(null);
  const slidesRef = useRef([]);
  const draggedRef = useRef(false);
  const dragRef = useRef(null);
  const rafRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);

  const clamp = useCallback((value) => Math.min(Math.max(value, 0), count - 1), [count]);

  /** 把某一张滑到视口内的起始位置（CSS 的 scroll-padding 负责左右留出探出的边） */
  const scrollToSlide = useCallback((target) => {
    const slide = slidesRef.current[target];
    if (!slide) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    slide.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }, []);

  const goTo = useCallback(
    (target) => {
      const next = clamp(target);
      setIndex(next);
      scrollToSlide(next);
    },
    [clamp, scrollToSlide]
  );

  /** 目录页点了某张爱好：定位到那一张 */
  useEffect(() => {
    if (!intent || intent.kind !== 'gallery') return;
    const target = items.findIndex((item) => item.id === intent.id);
    if (target >= 0) {
      goTo(target);
    }
    if (onIntentHandled) onIntentHandled();
  }, [intent, items, goTo, onIntentHandled]);

  /** 触摸滑动与贴齐后，用滚动位置反推当前是第几张 */
  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      const viewport = viewportRef.current;
      if (!viewport) return;
      const anchor = viewport.getBoundingClientRect().left + viewport.clientWidth * 0.12;
      let nearest = 0;
      let best = Number.POSITIVE_INFINITY;
      slidesRef.current.forEach((slide, slideIndex) => {
        if (!slide) return;
        const distance = Math.abs(slide.getBoundingClientRect().left - anchor);
        if (distance < best) {
          best = distance;
          nearest = slideIndex;
        }
      });
      setIndex(nearest);
    });
  }, []);

  useEffect(
    () => () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    },
    []
  );

  /** 桌面端按住拖动也能滑 */
  const onPointerDown = (event) => {
    if (event.pointerType === 'touch') return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    dragRef.current = { startX: event.clientX, startScroll: viewport.scrollLeft };
    draggedRef.current = false;
    viewport.classList.add('is-dragging');
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    const viewport = viewportRef.current;
    if (!drag || !viewport) return;
    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 6) {
      draggedRef.current = true;
    }
    viewport.scrollLeft = drag.startScroll - delta;
  };

  const endDrag = () => {
    const viewport = viewportRef.current;
    if (!viewport || !dragRef.current) return;
    dragRef.current = null;
    viewport.classList.remove('is-dragging');
    goTo(index);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      goTo(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      goTo(count - 1);
    }
  };

  const closeOverlay = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(
    () => setOpenIndex((prev) => (prev === null ? prev : Math.max(prev - 1, 0))),
    []
  );
  const showNext = useCallback(
    () => setOpenIndex((prev) => (prev === null ? prev : Math.min(prev + 1, count - 1))),
    [count]
  );

  const openItem = openIndex === null ? null : items[openIndex];

  return (
    <section
      id="gallery"
      className="scene scene--gallery"
      data-component="gallery-scene"
      aria-labelledby="gallery-title"
    >
      <div className="scene__inner">
        <div className="scene__narrative">
          <SceneHeading
            id="gallery-title"
            eyebrow={content.eyebrow}
            heading={content.heading}
            subtitle={content.subtitle}
          />
        </div>

        <div className="scene__content">
          <div className="carousel" data-component="gallery-carousel">
            <div
              className="carousel__viewport"
              ref={viewportRef}
              onScroll={handleScroll}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onPointerLeave={endDrag}
              onKeyDown={handleKeyDown}
            >
              <ul className="carousel__track">
                {items.map((item, itemIndex) => (
                  <li
                    className={`slide${itemIndex === index ? ' slide--active' : ''}`}
                    key={item.id}
                    ref={(node) => {
                      slidesRef.current[itemIndex] = node;
                    }}
                  >
                    {itemIndex === index ? (
                      <WashiTape className="slide__tape" rotation={-4} />
                    ) : null}
                    <button
                      type="button"
                      className="slide__button"
                      onClick={() => {
                        if (draggedRef.current) {
                          draggedRef.current = false;
                          return;
                        }
                        setOpenIndex(itemIndex);
                      }}
                    >
                      <span className="slide__frame">
                        <img
                          src={item.image}
                          alt={item.alt}
                          width="1280"
                          height="853"
                          loading="lazy"
                          decoding="async"
                        />
                      </span>

                      <span className="slide-caption">
                        <span className="slide-caption__title">{item.title}</span>
                        <span className="slide-caption__text">{item.caption}</span>
                        <span className="slide-caption__date">
                          <Heart />
                          <span>{item.date}</span>
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="carousel__controls">
              <span className="counter carousel__counter" aria-live="polite">
                {`${pad(index + 1)} / ${pad(count)}`}
              </span>

              <div className="carousel__buttons">
                <button
                  type="button"
                  className="btn btn--icon carousel__btn"
                  onClick={() => goTo(index - 1)}
                  disabled={index === 0}
                  aria-label="上一张"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="btn btn--icon carousel__btn"
                  onClick={() => goTo(index + 1)}
                  disabled={index === count - 1}
                  aria-label="下一张"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openItem ? (
        <GalleryDetailOverlay
          item={openItem}
          onClose={closeOverlay}
          onPrev={showPrev}
          onNext={showNext}
          hasPrev={openIndex > 0}
          hasNext={openIndex < count - 1}
        />
      ) : null}
    </section>
  );
}
