import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/header/Header';
import SceneIndicator from '../components/header/SceneIndicator';
import EntryGate from '../components/entry-gate/EntryGate';
import Hero from '../components/hero/Hero';
import ProjectsScene from '../components/projects/ProjectsScene';
import IndexScene from '../components/index/IndexScene';
import GalleryScene from '../components/gallery/GalleryScene';
import ContactScene from '../components/contact/ContactScene';
import {
  contact,
  entryGate,
  feedback,
  gallery,
  hero,
  indexList,
  projects,
  scenes,
  site,
} from '../data/site-content';

/** 目录条目点开详情时，先滚到对应场景，等滚动落定后再打开 */
const INTENT_DELAY = 420;

/** 首页：按顺序编排 5 个场景，并托管入场遮罩、页头、场景指示器与目录跳转 */
export default function HomePage() {
  const [entered, setEntered] = useState(false);
  const [gateMounted, setGateMounted] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [intent, setIntent] = useState(null);

  /** 入场动画结束后卸载遮罩 */
  useEffect(() => {
    if (!entered) return undefined;
    const timer = window.setTimeout(() => setGateMounted(false), 620);
    return () => window.clearTimeout(timer);
  }, [entered]);

  /** 遮罩存在期间锁定背景滚动 */
  useEffect(() => {
    if (!gateMounted) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [gateMounted]);

  /** 滚动时同步当前场景（页头进度点与底部指示器共用） */
  useEffect(() => {
    let raf = null;

    const update = () => {
      raf = null;
      const offset = window.innerHeight * 0.35;
      let active = 0;
      scenes.forEach((scene, index) => {
        const node = document.getElementById(scene.id);
        if (!node) return;
        if (node.getBoundingClientRect().top <= offset) {
          active = index;
        }
      });
      setActiveIndex(active);
    };

    const onScroll = () => {
      if (raf === null) {
        raf = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf !== null) {
        window.cancelAnimationFrame(raf);
      }
    };
  }, []);

  const goToScene = useCallback((index) => {
    const target = scenes[Math.min(Math.max(index, 0), scenes.length - 1)];
    const node = document.getElementById(target.id);
    if (!node) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    node.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }, []);

  /** 目录里的作品 / 爱好条目：先滚到所在场景，再让对应场景处理详情 */
  const openDetail = useCallback(
    (next) => {
      const sceneId = next.kind === 'project' ? 'projects' : 'gallery';
      const sceneIndex = scenes.findIndex((scene) => scene.id === sceneId);
      if (sceneIndex >= 0) {
        goToScene(sceneIndex);
      }
      window.setTimeout(() => {
        setIntent({ ...next, nonce: Date.now() });
      }, INTENT_DELAY);
    },
    [goToScene]
  );

  const clearIntent = useCallback(() => setIntent(null), []);

  return (
    <>
      <a className="skip-link" href="#main">
        跳到主要内容
      </a>

      {gateMounted ? (
        <EntryGate
          brand={entryGate.brand}
          zh={entryGate.zh}
          en={entryGate.en}
          entered={entered}
          onEnter={() => setEntered(true)}
        />
      ) : null}

      <Header
        wordmark={site.wordmark}
        scenes={scenes}
        activeIndex={activeIndex}
        onSelectScene={goToScene}
      />

      <main id="main">
        <Hero content={hero} onScrollToScene={goToScene} />
        <ProjectsScene content={projects} intent={intent} onIntentHandled={clearIntent} />
        <IndexScene onSelectScene={goToScene} onOpenDetail={openDetail} />
        <GalleryScene content={gallery} intent={intent} onIntentHandled={clearIntent} />
        <ContactScene content={contact} feedback={feedback} />
      </main>

      <SceneIndicator label={scenes[activeIndex].label} />

      <nav className="mobile-nav" aria-label="场景切换">
        <button
          type="button"
          className="mobile-nav__btn"
          onClick={() => goToScene(activeIndex - 1)}
          disabled={activeIndex === 0}
        >
          <ChevronLeft size={16} aria-hidden="true" />
          <span aria-hidden="true">PREV</span>
          <span className="visually-hidden">上一个场景</span>
        </button>
        <button
          type="button"
          className="mobile-nav__btn"
          onClick={() => goToScene(activeIndex + 1)}
          disabled={activeIndex === scenes.length - 1}
        >
          <span aria-hidden="true">NEXT</span>
          <ChevronRight size={16} aria-hidden="true" />
          <span className="visually-hidden">下一个场景</span>
        </button>
      </nav>
    </>
  );
}
