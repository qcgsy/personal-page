import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import './BounceCards.css';

const DEFAULT_TRANSFORMS = [
  'rotate(10deg) translate(-170px)',
  'rotate(5deg) translate(-85px)',
  'rotate(-3deg)',
  'rotate(-10deg) translate(85px)',
  'rotate(2deg) translate(170px)',
];

/**
 * @typedef {Object} BounceCardsProps
 * @property {string} [className]
 * @property {string[]} images        每个卡片的图片地址
 * @property {string[]} [ariaLabels]  每个卡片的无障碍名称（与 images 一一对应）
 * @property {number} [containerWidth]  容器宽（px）
 * @property {number} [containerHeight] 容器高（px）
 * @property {number} [cardWidth]       卡片宽（px）
 * @property {number} [cardHeight]      卡片高（px）
 * @property {number} [animationDelay]  入场延迟（秒）
 * @property {number} [animationStagger] 入场错峰（秒）
 * @property {string} [easeType]        入场缓动
 * @property {string[]} [transformStyles] 每个卡片的静止变换
 * @property {number} [pushOffset]      悬停时相邻卡片让开的距离（px）
 * @property {boolean} [enableHover]
 * @property {(index:number) => void} [onCardClick]
 */

/** 依次散开、带弹性回弹效果的卡片堆（入场用 gsap） */
export default function BounceCards({
  className = '',
  images = [],
  ariaLabels = [],
  containerWidth = 640,
  containerHeight = 430,
  cardWidth = 272,
  cardHeight = 170,
  animationDelay = 1,
  animationStagger = 0.08,
  easeType = 'elastic.out(1, 0.5)',
  transformStyles = DEFAULT_TRANSFORMS,
  pushOffset = 160,
  enableHover = true,
  onCardClick,
}) {
  const containerRef = useRef(null);
  const reduceMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.fromTo('.card', { opacity: 0 }, { opacity: 1, duration: 0.18, ease: 'none' });
        return;
      }
      gsap.fromTo(
        '.card',
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay,
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [animationStagger, easeType, animationDelay, reduceMotion]);

  const getNoRotationTransform = (transformStr) => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    } else if (transformStr === 'none') {
      return 'rotate(0deg)';
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (baseTransform, offsetX) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === 'none'
        ? `translate(${offsetX}px)`
        : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = (hoveredIdx) => {
    if (!enableHover || reduceMotion || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);

      const baseTransform = transformStyles[i] || 'none';

      if (i === hoveredIdx) {
        gsap.to(target, {
          transform: getNoRotationTransform(baseTransform),
          duration: 0.4,
          ease: 'back.out(1.4)',
          overwrite: 'auto',
        });
      } else {
        const offsetX = i < hoveredIdx ? -pushOffset : pushOffset;
        const distance = Math.abs(hoveredIdx - i);

        gsap.to(target, {
          transform: getPushedTransform(baseTransform, offsetX),
          duration: 0.4,
          ease: 'back.out(1.4)',
          delay: distance * 0.05,
          overwrite: 'auto',
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || reduceMotion || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);
      gsap.to(target, {
        transform: transformStyles[i] || 'none',
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto',
      });
    });
  };

  return (
    <div
      className={`bounceCardsContainer ${className}`.trim()}
      data-component="bounce-cards"
      ref={containerRef}
      style={{
        '--bounce-w': `${containerWidth}px`,
        '--bounce-h': `${containerHeight}px`,
        '--bounce-card-w': `${cardWidth}px`,
        '--bounce-card-h': `${cardHeight}px`,
      }}
    >
      {images.map((src, idx) => (
        <button
          type="button"
          key={src}
          className={`card card-${idx}`}
          style={{ transform: transformStyles[idx] ?? 'none' }}
          aria-label={ariaLabels[idx] || `查看第 ${idx + 1} 张图片`}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
          onFocus={() => pushSiblings(idx)}
          onBlur={resetSiblings}
          onClick={() => {
            if (onCardClick) onCardClick(idx);
          }}
        >
          <img className="image" src={src} alt="" decoding="async" />
        </button>
      ))}
    </div>
  );
}
