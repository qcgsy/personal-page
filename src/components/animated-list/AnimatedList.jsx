import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import './AnimatedList.css';

/**
 * @typedef {Object} AnimatedListItem
 * @property {string} [id]         唯一标识
 * @property {string} [microLabel] 小号英文标签（SCENE 01 / PROJECT 02 / PHOTO 05）
 * @property {string} label        中文标签
 * @property {string} [kindLabel]  右侧小胶囊文字（场景 / 作品 / 爱好）
 * @property {'scene'|'project'|'gallery'} [kind] 胶囊配色归属
 */

/** 一行：进入视口时放大淡入（pop-in，0.2s） */
const AnimatedItem = ({ children, delay = 0, index, onMouseEnter }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, triggerOnce: false });
  const reduce = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      initial={reduce ? { opacity: 0 } : { scale: 0.7, opacity: 0 }}
      animate={
        inView
          ? { scale: 1, opacity: 1 }
          : reduce
            ? { opacity: 0 }
            : { scale: 0.7, opacity: 0 }
      }
      transition={{ duration: 0.2, delay }}
      className="animated-item"
    >
      {children}
    </motion.div>
  );
};

const normalizeItem = (raw, index) =>
  typeof raw === 'string'
    ? { id: `item-${index}`, label: raw, kind: undefined }
    : { id: raw.id ?? `item-${index}`, ...raw };

/**
 * 可滚动的动画列表（滑动展示目录）。
 * items 既可以是字符串数组，也可以是 { id, microLabel, label, kindLabel, kind } 对象数组。
 * 键盘：上下方向键 / Home / End 移动选择并把选中行滚入视野，Tab 与回车沿用原生按钮行为。
 */
const AnimatedList = ({
  items = [],
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = '',
  itemClassName = '',
  displayScrollbar = true,
  initialSelectedIndex = -1,
}) => {
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

  const handleItemMouseEnter = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  const handleItemClick = useCallback(
    (item, index) => {
      setSelectedIndex(index);
      if (onItemSelect) {
        onItemSelect(item, index);
      }
    },
    [onItemSelect]
  );

  /** 顶部/底部渐隐遮罩的透明度跟随滚动位置（前 16px / 后 16px） */
  const handleScroll = useCallback((event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    setTopGradientOpacity(Math.min(scrollTop / 16, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 16, 1)
    );
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (!enableArrowNavigation || items.length === 0) return;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (event.key === 'Home') {
        event.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(items.length - 1);
      }
    },
    [enableArrowNavigation, items.length]
  );

  /** 键盘移动选择后，把选中行滚入视野并交给它焦点 */
  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const container = listRef.current;
    const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`);
    if (selectedItem) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      selectedItem.scrollIntoView({
        block: 'nearest',
        behavior: reduce ? 'auto' : 'smooth',
      });
      const button = selectedItem.querySelector('button');
      if (button && document.activeElement !== button) {
        button.focus({ preventScroll: true });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  return (
    <div className={`scroll-list-container ${className}`.trim()} data-component="index-list">
      <div
        ref={listRef}
        className={`scroll-list ${displayScrollbar ? '' : 'no-scrollbar'}`.trim()}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        role="list"
        aria-label="页面目录"
      >
        {items.map((rawItem, index) => {
          const item = normalizeItem(rawItem, index);
          const isSelected = selectedIndex === index;
          return (
            <AnimatedItem
              key={item.id}
              delay={Math.min(index, 6) * 0.03}
              index={index}
              onMouseEnter={() => handleItemMouseEnter(index)}
            >
              <button
                type="button"
                className={`item ${isSelected ? 'selected' : ''} ${itemClassName}`.trim()}
                data-kind={item.kind}
                onClick={() => handleItemClick(rawItem, index)}
                onFocus={() => setSelectedIndex(index)}
              >
                {isSelected ? <span className="item__notch" aria-hidden="true" /> : null}
                <span className="item__text">
                  {item.microLabel ? (
                    <span className="item__micro micro-label">{item.microLabel}</span>
                  ) : null}
                  <span className="item__label">{item.label}</span>
                </span>
                {item.kindLabel ? (
                  <span className={`item__badge item__badge--${item.kind ?? 'scene'}`}>
                    {item.kindLabel}
                  </span>
                ) : null}
              </button>
            </AnimatedItem>
          );
        })}
      </div>

      {showGradients ? (
        <>
          <div className="top-gradient" style={{ opacity: topGradientOpacity }} aria-hidden="true" />
          <div
            className="bottom-gradient"
            style={{ opacity: bottomGradientOpacity }}
            aria-hidden="true"
          />
        </>
      ) : null}
    </div>
  );
};

export default AnimatedList;
