import { Github, Mail, Sparkles, Video } from 'lucide-react';
import FeedbackPanel from './FeedbackPanel';
import { PetalDrift } from '../common/Decor';
import './contact.css';

/**
 * @typedef {Object} ContactSceneProps
 * @property {Object} content  contact 文案与联系方式
 * @property {Object} feedback feedback 文案
 */

const CHANNEL_ICONS = {
  email: Mail,
  github: Github,
  douyin: Video,
};

/** 场景 04：联系我 + 用户反馈 */
export default function ContactScene({ content, feedback }) {
  return (
    <section
      id="contact"
      className="scene scene--contact"
      data-component="contact-scene"
      aria-labelledby="contact-title"
    >
      <PetalDrift />

      <div className="scene__inner">
        <div className="scene__narrative">
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 className="contact-heading" id="contact-title">
            {content.headingZh}
            <span className="contact-heading__en">{` / ${content.headingEn}`}</span>
          </h2>
          <p className="contact-invitation">{content.invitation}</p>

          <ul className="contact-rows" data-component="contact-rows">
            {content.rows.map((row) => {
              const Icon = CHANNEL_ICONS[row.id] ?? Sparkles;
              const inner = (
                <>
                  <span
                    className={`contact-row__badge contact-row__badge--${row.accent}`}
                    aria-hidden="true"
                  >
                    <Icon size={20} />
                  </span>
                  <span className="contact-row__text">
                    <span className="contact-row__label">
                      <span className="micro-label">{row.channelLabel}</span>
                      <span className="contact-row__name">{row.channelName}</span>
                    </span>
                    <span className="contact-row__value">{row.value}</span>
                    <span className="contact-row__role">{row.roleDescriptor}</span>
                  </span>
                </>
              );

              return (
                <li className="contact-rows__item" key={row.id}>
                  {row.href ? (
                    <a className="contact-row" href={row.href}>
                      {inner}
                    </a>
                  ) : (
                    <div className="contact-row">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="scene__content">
          <FeedbackPanel content={feedback} />
        </div>
      </div>
    </section>
  );
}
