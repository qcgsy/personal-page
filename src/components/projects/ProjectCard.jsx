import { WashiTape } from '../common/Decor';

/**
 * @typedef {Object} ProjectCardProps
 * @property {Object} project  单个作品数据（见 src/data/site-content.js）
 * @property {(id:string) => void} onOpen
 * @property {boolean} isActive 正在查看详情的卡片
 */

const TAG_VARIANTS = ['', 'tag-pill--mint', 'tag-pill--sky'];

/** 作品卡片：整张卡是一个按钮，封面 + 标题 + 一句描述 + 标签 */
export default function ProjectCard({ project, onOpen, isActive }) {
  return (
    <button
      type="button"
      className={`project-card${isActive ? ' project-card--active' : ''}`}
      onClick={() => onOpen(project.id)}
      data-component="project-card"
    >
      <span className="project-card__cover">
        <img
          src={project.cover}
          alt={project.coverAlt}
          width="1536"
          height="1024"
          loading="lazy"
          decoding="async"
        />
        <WashiTape className="project-card__tape" rotation={-5} />
      </span>

      <span className="project-card__body">
        <span className="project-card__title">{project.title}</span>
        <span className="project-card__desc">{project.description}</span>
        <span className="project-card__tags">
          {project.tags.map((tag, index) => (
            <span key={tag} className={`tag-pill ${TAG_VARIANTS[index % 3]}`.trim()}>
              {tag}
            </span>
          ))}
        </span>
      </span>
    </button>
  );
}
