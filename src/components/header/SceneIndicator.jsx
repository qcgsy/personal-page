/**
 * @typedef {Object} SceneIndicatorProps
 * @property {string} label 当前场景的英文微标签，例如 "SCENE 02 · 作品"
 */

/** 常驻场景指示器：桌面为虚线上的一行标签，移动端收成底部胶囊 */
export default function SceneIndicator({ label }) {
  return (
    <div
      className="scene-indicator"
      data-component="scene-indicator"
      role="status"
      aria-live="polite"
    >
      <span className="scene-indicator__rule" aria-hidden="true" />
      <span className="scene-indicator__label">{label}</span>
    </div>
  );
}
