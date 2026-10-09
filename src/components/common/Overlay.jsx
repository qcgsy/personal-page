import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * @typedef {Object} OverlayProps
 * @property {string} label           对话框无障碍名称
 * @property {() => void} onClose     关闭回调（Esc / 遮罩点击 / 关闭按钮共用）
 * @property {import('react').ReactNode} children
 * @property {(event: KeyboardEvent) => void} [onKeyDownExtra] 额外的键盘处理（例如左右键切换画廊）
 */

/**
 * 「浮层」共享外壳：
 * - Esc 关闭、点击遮罩关闭
 * - 打开期间锁定背景滚动，并把焦点移入面板
 * - Tab 焦点在面板内循环，关闭后把焦点还给触发元素
 */
export default function Overlay({ label, onClose, children, onKeyDownExtra }) {
  const panelRef = useRef(null);
  const restoreRef = useRef(null);

  useEffect(() => {
    restoreRef.current = document.activeElement;
    const panel = panelRef.current;
    const first = panel ? panel.querySelector(FOCUSABLE) : null;
    if (first) {
      first.focus();
    } else if (panel) {
      panel.focus();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key === 'Tab' && panel) {
        const nodes = Array.from(panel.querySelectorAll(FOCUSABLE)).filter(
          (node) => node.offsetParent !== null || node === document.activeElement
        );
        if (nodes.length === 0) {
          event.preventDefault();
          return;
        }
        const firstNode = nodes[0];
        const lastNode = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === firstNode) {
          event.preventDefault();
          lastNode.focus();
        } else if (!event.shiftKey && document.activeElement === lastNode) {
          event.preventDefault();
          firstNode.focus();
        }
        return;
      }
      if (onKeyDownExtra) {
        onKeyDownExtra(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (restoreRef.current && typeof restoreRef.current.focus === 'function') {
        restoreRef.current.focus();
      }
    };
  }, [onClose, onKeyDownExtra]);

  return (
    <div
      className="overlay"
      data-component="overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="overlay__panel"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        ref={panelRef}
      >
        {children}
      </div>
    </div>
  );
}
