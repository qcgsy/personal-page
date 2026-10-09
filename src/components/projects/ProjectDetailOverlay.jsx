import { X } from 'lucide-react';
import Overlay from '../common/Overlay';
import { Heart } from '../common/Decor';

/**
 * @typedef {Object} ProjectDetailOverlayProps
 * @property {Object} project 单个作品数据
 * @property {() => void} onClose
 */

const FIELD_LABELS = {
  background: '项目背景',
  features: '核心功能',
  role: '我的角色',
  techStack: '技术栈',
};

/** 作品详情浮层：左图右文 + 四张信息卡 + 操作行 */
export default function ProjectDetailOverlay({ project, onClose }) {
  return (
    <Overlay label={`${project.title} 项目详情`} onClose={onClose}>
      <button
        type="button"
        className="btn btn--icon overlay__close"
        onClick={onClose}
        aria-label="关闭详情"
      >
        <X size={20} aria-hidden="true" />
      </button>

      <div className="project-detail">
        <div className="project-detail__media">
          <img
            src={project.cover}
            alt={project.coverAlt}
            width="1536"
            height="1024"
            decoding="async"
          />
        </div>

        <div className="project-detail__body">
          <span className="eyebrow">{project.subtitleLabel}</span>
          <h2 className="detail-title">{project.title}</h2>
          <p className="project-detail__summary">{project.summary}</p>

          <div className="project-detail__grid">
            <div className="info-card">
              <span className="micro-label">{FIELD_LABELS.background}</span>
              <p className="info-card__text">{project.background}</p>
            </div>

            <div className="info-card">
              <span className="micro-label">{FIELD_LABELS.features}</span>
              <ul className="bullet-list">
                {project.features.map((item) => (
                  <li key={item}>
                    <Heart />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="info-card">
              <span className="micro-label">{FIELD_LABELS.role}</span>
              <ul className="bullet-list">
                {project.role.map((item) => (
                  <li key={item}>
                    <Heart color="mint" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="info-card">
              <span className="micro-label">{FIELD_LABELS.techStack}</span>
              <ul className="tag-row">
                {project.techStack.map((item, index) => (
                  <li key={item}>
                    <span className={`tag-pill ${index === 1 ? 'tag-pill--mint' : ''}`.trim()}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="action-row">
            <span className="micro-label">{project.statusLabel}</span>
            <div className="action-row__buttons">
              {project.demoUrl ? (
                <a className="btn btn--primary" href={project.demoUrl} target="_blank" rel="noreferrer">
                  查看演示
                </a>
              ) : null}
              {project.repoUrl ? (
                <a className="btn btn--glass" href={project.repoUrl} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              ) : null}
              <button type="button" className="btn btn--ghost" onClick={onClose}>
                关闭
              </button>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
}
