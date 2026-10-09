/**
 * @typedef {Object} HeaderProps
 * @property {string} wordmark        左上角标识文字
 * @property {{id:string,label:string,short:string}[]} scenes 场景列表
 * @property {number} activeIndex     当前场景序号
 * @property {(index:number) => void} onSelectScene 跳转场景
 */

/** 常驻页头：左侧标识，右侧场景进度胶囊（移动端由底部 PREV/NEXT 取代） */
export default function Header({ wordmark, scenes, activeIndex, onSelectScene }) {
  return (
    <header className="site-header" data-component="site-header">
      <button type="button" className="wordmark" onClick={() => onSelectScene(0)}>
        <span className="wordmark__dot" aria-hidden="true" />
        {wordmark}
      </button>

      <div className="header-controls">
        <nav className="progress-pill" aria-label="场景导航">
          {scenes.map((scene, index) => (
            <button
              key={scene.id}
              type="button"
              className={`progress-dot${index === activeIndex ? ' progress-dot--active' : ''}`}
              onClick={() => onSelectScene(index)}
              aria-current={index === activeIndex ? 'true' : undefined}
            >
              <span className="progress-dot__mark" aria-hidden="true" />
              <span className="visually-hidden">{`跳到${scene.short}`}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
