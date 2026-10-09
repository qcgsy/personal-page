import { useCallback, useEffect, useState } from 'react';
import SceneHeading from '../common/SceneHeading';
import ProjectCard from './ProjectCard';
import ProjectDetailOverlay from './ProjectDetailOverlay';
import { BlushDots } from '../common/Decor';
import './projects.css';

/**
 * @typedef {Object} ProjectsSceneProps
 * @property {Object} content projects 文案与作品列表
 * @property {{kind:string,id:string,nonce:number}|null} [intent] 由目录页发来的打开请求
 * @property {() => void} [onIntentHandled] 处理完成后通知父级清空请求
 */

/** 场景 02：项目作品 */
export default function ProjectsScene({ content, intent, onIntentHandled }) {
  const [openId, setOpenId] = useState(null);
  const openProject = content.items.find((item) => item.id === openId) ?? null;
  const closeOverlay = useCallback(() => setOpenId(null), []);

  /** 目录页点了某个作品：直接打开它的详情浮层 */
  useEffect(() => {
    if (!intent || intent.kind !== 'project') return;
    setOpenId(intent.id);
    if (onIntentHandled) onIntentHandled();
  }, [intent, onIntentHandled]);

  return (
    <section
      id="projects"
      className="scene scene--projects"
      data-component="projects-scene"
      aria-labelledby="projects-title"
    >
      <div className="scene__inner">
        <div className="scene__narrative">
          <SceneHeading
            id="projects-title"
            eyebrow={content.eyebrow}
            heading={content.heading}
            subtitle={content.subtitle}
          />
        </div>

        <div className="scene__content">
          <ul className="project-list" data-component="project-list">
            {content.items.map((project) => (
              <li className="project-list__item" key={project.id}>
                <ProjectCard
                  project={project}
                  isActive={project.id === openId}
                  onOpen={setOpenId}
                />
              </li>
            ))}
          </ul>
          <BlushDots className="project-blush" />
        </div>
      </div>

      {openProject ? (
        <ProjectDetailOverlay project={openProject} onClose={closeOverlay} />
      ) : null}
    </section>
  );
}
