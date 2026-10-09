import { Sparkle } from '../common/Decor';

/**
 * @typedef {Object} EntryGateProps
 * @property {string} brand    左上角标识
 * @property {string} zh       中文按钮文字
 * @property {string} en       英文小标签
 * @property {string} coverImage 封面插图（与首屏共用同一张，保证入场前后是同一个画面）
 * @property {boolean} entered 是否已进入（触发离场动画）
 * @property {() => void} onEnter 进入主站
 */

/** 入场遮罩：与首屏共用同一张封面插图 + 同一层暖色水洗，键盘可直接回车进入 */
export default function EntryGate({ brand, zh, en, coverImage, entered, onEnter }) {
  return (
    <div
      className={`entry-gate${entered ? ' entry-gate--leaving' : ''}`}
      data-component="entry-gate"
      aria-hidden={entered || undefined}
    >
      <div
        className="cover-media"
        aria-hidden="true"
        style={coverImage ? { backgroundImage: `url(${coverImage})` } : undefined}
      />
      <div className="cover-wash" aria-hidden="true" />

      <span className="entry-gate__brand">
        <span className="wordmark__dot" aria-hidden="true" />
        {brand}
      </span>

      <button type="button" className="entry-capsule" onClick={onEnter} autoFocus>
        <span className="entry-capsule__zh">{zh}</span>
        <span className="entry-capsule__en">{en}</span>
        <Sparkle size={16} color="star" className="entry-capsule__sparkle" />
      </button>
    </div>
  );
}
