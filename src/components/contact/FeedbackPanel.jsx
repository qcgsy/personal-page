import { useRef, useState } from 'react';
import { AlertCircle, Loader2, Sparkles } from 'lucide-react';

/**
 * @typedef {Object} FeedbackPanelProps
 * @property {Object} content feedback 文案（见 src/data/site-content.js）
 */

const EMPTY = { name: '', email: '', message: '' };

/** 留言表单：纯前端校验与本地成功态，不发送任何网络请求 */
export default function FeedbackPanel({ content }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const inputRefs = useRef({});

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = content.errors.name;
    if (!values.email.trim()) {
      next.email = content.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = content.errors.emailInvalid;
    }
    if (!values.message.trim()) next.message = content.errors.message;
    return next;
  };

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors).find((field) => nextErrors[field]);
    if (firstError) {
      const node = inputRefs.current[firstError];
      if (node) node.focus();
      return;
    }

    setStatus('submitting');
    window.setTimeout(() => setStatus('success'), 420);
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setStatus('idle');
    const node = inputRefs.current.name;
    if (node) node.focus();
  };

  if (status === 'success') {
    return (
      <div className="feedback-panel feedback-panel--success" data-component="feedback-success">
        <Sparkles size={24} color="var(--color-secondary-strong)" aria-hidden="true" />
        <h3 className="panel-title">{content.successTitle}</h3>
        <p className="feedback-panel__success-body">{content.successBody(values.name.trim())}</p>
        <button type="button" className="btn btn--ghost" onClick={reset}>
          {content.againLabel}
        </button>
      </div>
    );
  }

  return (
    <form
      className="feedback-panel"
      data-component="feedback-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <span className="eyebrow">{content.eyebrow}</span>
      <h3 className="panel-title">{content.title}</h3>
      <p className="feedback-panel__help">{content.help}</p>

      <div className="field">
        <label className="field__label micro-label" htmlFor="feedback-name">
          {`${content.fields.name.labelEn} / ${content.fields.name.labelZh}`}
        </label>
        <input
          id="feedback-name"
          className={`field__input${errors.name ? ' field__input--error' : ''}`}
          name="name"
          type="text"
          value={values.name}
          placeholder={content.fields.name.placeholder}
          onChange={handleChange('name')}
          ref={(node) => {
            inputRefs.current.name = node;
          }}
          aria-invalid={errors.name ? 'true' : undefined}
          aria-describedby={errors.name ? 'feedback-name-error' : undefined}
        />
        {errors.name ? (
          <p className="field__error" id="feedback-name-error">
            <AlertCircle size={14} aria-hidden="true" />
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label className="field__label micro-label" htmlFor="feedback-email">
          {`${content.fields.email.labelEn} / ${content.fields.email.labelZh}`}
        </label>
        <input
          id="feedback-email"
          className={`field__input${errors.email ? ' field__input--error' : ''}`}
          name="email"
          type="email"
          value={values.email}
          placeholder={content.fields.email.placeholder}
          onChange={handleChange('email')}
          ref={(node) => {
            inputRefs.current.email = node;
          }}
          aria-invalid={errors.email ? 'true' : undefined}
          aria-describedby={errors.email ? 'feedback-email-error' : undefined}
        />
        {errors.email ? (
          <p className="field__error" id="feedback-email-error">
            <AlertCircle size={14} aria-hidden="true" />
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label className="field__label micro-label" htmlFor="feedback-message">
          {`${content.fields.message.labelEn} / ${content.fields.message.labelZh}`}
        </label>
        <textarea
          id="feedback-message"
          className={`field__input field__input--textarea${
            errors.message ? ' field__input--error' : ''
          }`}
          name="message"
          rows={4}
          value={values.message}
          placeholder={content.fields.message.placeholder}
          onChange={handleChange('message')}
          ref={(node) => {
            inputRefs.current.message = node;
          }}
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={errors.message ? 'feedback-message-error' : undefined}
        />
        {errors.message ? (
          <p className="field__error" id="feedback-message-error">
            <AlertCircle size={14} aria-hidden="true" />
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="btn btn--primary feedback-panel__submit"
        disabled={status === 'submitting'}
        aria-disabled={status === 'submitting' ? 'true' : undefined}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 size={16} className="feedback-panel__spinner" aria-hidden="true" />
            {content.submittingLabel}
          </>
        ) : (
          content.submitLabel
        )}
      </button>
    </form>
  );
}
