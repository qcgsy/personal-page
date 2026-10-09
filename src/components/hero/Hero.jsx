import { BlushDots, Ribbon, Sparkle } from '../common/Decor';
import './hero.css';

/**
 * @typedef {Object} HeroProps
 * @property {Object} content    hero + profile 文案（见 src/data/site-content.js）
 * @property {string} coverImage 封面插图地址（整页背景，自适应裁切）
 * @property {(index:number) => void} onScrollToScene 跳到指定场景
 */

/** 场景 01：整页封面图 + 欢迎语 + 个人卡片 */
export default function Hero({ content, coverImage, onScrollToScene }) {
  const { greeting, name, supportLine, scrollCue, scrollCueEn, profile } = content;

  return (
    <section
      id="hero"
      className="scene scene--hero"
      data-component="hero-scene"
      aria-labelledby="hero-title"
    >
      <div
        className="cover-media"
        aria-hidden="true"
        style={coverImage ? { backgroundImage: `url(${coverImage})` } : undefined}
      />
      <div className="cover-wash" aria-hidden="true" />
      <Sparkle size={18} color="star" className="cover-sparkle cover-sparkle--tl" />
      <Sparkle size={13} color="star" className="cover-sparkle cover-sparkle--br" />

      <div className="scene__inner">
        <div className="scene__narrative">
          <h1 className="hero-title" id="hero-title">
            {greeting}
            <br />
            {name}
          </h1>

          <p className="hero-support">{supportLine}</p>

          <div className="scroll-cue">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => onScrollToScene(1)}
            >
              {scrollCue}
            </button>
            <span className="scroll-cue__rule" aria-hidden="true" />
            <span className="micro-label">{scrollCueEn}</span>
          </div>
        </div>

        <div className="scene__content">
          <div className="glass-panel profile-panel" data-component="profile-panel">
            <Ribbon className="profile-panel__ribbon" />
            <span className="eyebrow">{profile.eyebrow}</span>
            <h2 className="profile-panel__name">{profile.name}</h2>
            <p className="profile-panel__tagline">{profile.tagline}</p>

            <dl className="profile-facts">
              {profile.facts.map((fact) => (
                <div className="profile-fact" key={fact.label}>
                  <dt className="profile-fact__label micro-label">{fact.label}</dt>
                  <dd className="profile-fact__value">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <BlushDots />
          </div>
        </div>
      </div>
    </section>
  );
}
