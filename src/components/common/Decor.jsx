/**
 * Decor.jsx — 全站装饰元素（全部 aria-hidden，不承载任何含义）
 * 图形只用 DESIGN.md 里的强调色：蓝=主色、绿=次色、紫=第三色、橙=纯装饰。
 */

const accentColor = {
  star: 'var(--color-accent-star)',
  primary: 'var(--color-primary)',
  soft: 'var(--color-primary-soft)',
  ribbon: 'var(--color-accent-ribbon)',
  peach: 'var(--color-accent-peach)',
  mint: 'var(--color-secondary)',
  tertiary: 'var(--color-tertiary)',
};

/** 四角星闪光 */
export function Sparkle({ size = 14, color = 'star', className = '', style }) {
  return (
    <svg
      className={`deco deco--twinkle ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      style={{ color: accentColor[color] ?? accentColor.star, ...style }}
    >
      <path
        d="M12 0.5 L14.4 9.6 L23.5 12 L14.4 14.4 L12 23.5 L9.6 14.4 L0.5 12 L9.6 9.6 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** 标题右上角的三颗星 */
export function SparkleCluster({ className = '', style }) {
  return (
    <span className={`deco-cluster ${className}`} aria-hidden="true" style={style}>
      <Sparkle size={16} color="star" style={{ position: 'static' }} />
      <Sparkle size={10} color="peach" style={{ position: 'static' }} />
      <Sparkle size={7} color="mint" style={{ position: 'static' }} />
    </span>
  );
}

/** 心形：列表项目符号与日期前的小装饰 */
export function Heart({ size = 12, color = 'primary', className = '', style }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      style={{
        color: accentColor[color] ?? accentColor.primary,
        flex: '0 0 auto',
        ...style,
      }}
    >
      <path
        d="M12 21.2C9.6 19.3 3 14.4 3 9.4 3 6.4 5.2 4.4 7.7 4.4c1.7 0 3.2.9 4.3 2.6 1.1-1.7 2.6-2.6 4.3-2.6C18.8 4.4 21 6.4 21 9.4c0 5-6.6 9.9-9 11.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** 蝴蝶结 / 缎带 */
export function Ribbon({ size = 30, className = '', style, rotation = -8 }) {
  return (
    <svg
      className={`deco ${className}`}
      width={size}
      height={size * 0.72}
      viewBox="0 0 40 29"
      aria-hidden="true"
      focusable="false"
      style={{ color: 'var(--color-accent-ribbon)', transform: `rotate(${rotation}deg)`, ...style }}
    >
      <path d="M17 14.5 2 4.5v20z" fill="currentColor" />
      <path d="M23 14.5 38 4.5v20z" fill="currentColor" />
      <circle cx="20" cy="14.5" r="4.4" fill="var(--color-primary-soft)" />
    </svg>
  );
}

/** 纸胶带（纯 CSS 块） */
export function WashiTape({ className = '', style, rotation = -4 }) {
  return (
    <span
      className={`washi-tape ${className}`}
      aria-hidden="true"
      style={{ transform: `rotate(${rotation}deg)`, ...style }}
    />
  );
}

/** 飘落的叶子（数量固定，位置确定，避免随机造成的布局抖动） */
const PETALS = [
  { top: '12%', left: '6%', delay: '0s', size: 12 },
  { top: '24%', left: '88%', delay: '0.6s', size: 9 },
  { top: '58%', left: '3%', delay: '1.2s', size: 10 },
  { top: '72%', left: '92%', delay: '0.3s', size: 13 },
  { top: '38%', left: '94%', delay: '1.8s', size: 8 },
  { top: '86%', left: '10%', delay: '2.4s', size: 11 },
];

export function PetalDrift() {
  return (
    <span aria-hidden="true">
      {PETALS.map((petal) => (
        <span
          key={`${petal.top}-${petal.left}`}
          className="deco deco--float petal"
          style={{
            top: petal.top,
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.5,
            animationDelay: petal.delay,
          }}
        />
      ))}
    </span>
  );
}

/** 小动物剪影贴纸（一页最多一只） */
export function ChibiSticker({ size = 56, className = '', style, rotation = -6 }) {
  return (
    <svg
      className={`deco ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      style={{ transform: `rotate(${rotation}deg)`, ...style }}
    >
      <circle cx="32" cy="32" r="26" fill="var(--color-surface-card)" />
      <circle cx="32" cy="36" r="14" fill="var(--color-primary-soft)" />
      <circle cx="20" cy="20" r="6" fill="var(--color-primary-soft)" />
      <circle cx="32" cy="14" r="6" fill="var(--color-primary-soft)" />
      <circle cx="44" cy="20" r="6" fill="var(--color-primary-soft)" />
    </svg>
  );
}

/** 角落的浅色圆点 */
export function BlushDots({ className = '', style }) {
  return (
    <span className={`blush-dots ${className}`} aria-hidden="true" style={style}>
      <span />
      <span />
    </span>
  );
}
