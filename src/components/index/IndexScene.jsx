import { useCallback, useMemo } from 'react';
import SceneHeading from '../common/SceneHeading';
import AnimatedList from '../animated-list/AnimatedList';
import { gallery, indexList, projects, scenes } from '../../data/site-content';

/**
 * @typedef {Object} IndexSceneProps
 * @property {(index:number) => void} onSelectScene 跳到某个场景
 * @property {(intent:{kind:'project'|'gallery', id:string}) => void} onOpenDetail 打开作品/爱好详情
 */

const pad = (value) => String(value).padStart(2, '0');

/** 场景 03：目录（滑动展示列表，条目由场景 / 作品 / 爱好自动组成） */
export default function IndexScene({ onSelectScene, onOpenDetail }) {
  const items = useMemo(() => {
    const sceneItems = scenes.map((scene, position) => ({
      id: `scene-${scene.id}`,
      kind: 'scene',
      kindLabel: indexList.kindLabels.scene,
      microLabel: `SCENE ${pad(position + 1)}`,
      label: scene.short,
      target: { type: 'scene', index: position },
    }));

    const projectItems = projects.items.map((project, position) => ({
      id: `project-${project.id}`,
      kind: 'project',
      kindLabel: indexList.kindLabels.project,
      microLabel: `PROJECT ${pad(position + 1)}`,
      label: project.title,
      target: { type: 'project', id: project.id },
    }));

    const galleryItems = gallery.items.map((item, position) => ({
      id: `photo-${item.id}`,
      kind: 'gallery',
      kindLabel: indexList.kindLabels.gallery,
      microLabel: `PHOTO ${pad(position + 1)}`,
      label: item.title,
      target: { type: 'gallery', id: item.id },
    }));

    return [...sceneItems, ...projectItems, ...galleryItems];
  }, []);

  const handleSelect = useCallback(
    (item) => {
      if (!item || !item.target) return;
      if (item.target.type === 'scene') {
        onSelectScene(item.target.index);
        return;
      }
      onOpenDetail({ kind: item.target.type, id: item.target.id });
    },
    [onSelectScene, onOpenDetail]
  );

  return (
    <section
      id="index"
      className="scene scene--index"
      data-component="index-scene"
      aria-labelledby="index-title"
    >
      <div className="scene__inner">
        <div className="scene__narrative">
          <SceneHeading
            id="index-title"
            eyebrow={indexList.eyebrow}
            heading={indexList.heading}
            subtitle={indexList.subtitle}
            help={indexList.help}
          />
        </div>

        <div className="scene__content">
          <AnimatedList
            items={items}
            onItemSelect={handleSelect}
            showGradients
            enableArrowNavigation
            displayScrollbar
            initialSelectedIndex={0}
          />
        </div>
      </div>
    </section>
  );
}
