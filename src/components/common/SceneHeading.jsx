import { SparkleCluster } from './Decor';

/**
 * @typedef {Object} SceneHeadingProps
 * @property {string} eyebrow      英文小标签（PROJECTS / INDEX / GALLERY ...）
 * @property {string} heading      中文标题
 * @property {string} [subtitle]   一句话副标题
 * @property {string} [help]       一行小字提示（caption 层级）
 * @property {string} [id]         标题元素 id，供 aria-labelledby 使用
 * @property {boolean} [sparkles]  是否显示右上角星群
 */

/** 每个场景统一的三段式标题块：小标签 → 标题 → 副标题（可再加一行提示） */
export default function SceneHeading({ eyebrow, heading, subtitle, help, id, sparkles = true }) {
  return (
    <div className="scene-heading-block" data-component="scene-heading">
      {sparkles ? <SparkleCluster className="deco-cluster--heading" /> : null}
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="scene-heading" id={id}>
        {heading}
      </h2>
      {subtitle ? <p className="scene-subtitle">{subtitle}</p> : null}
      {help ? <p className="scene-help">{help}</p> : null}
    </div>
  );
}
