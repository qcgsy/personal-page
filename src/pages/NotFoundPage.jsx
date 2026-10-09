import { Link } from 'react-router-dom';
import { notFound } from '../data/site-content';

/** 404：设计了返回首页的兜底页面 */
export default function NotFoundPage() {
  return (
    <div className="simple-page" data-component="not-found-page">
      <div className="simple-page__card">
        <span className="eyebrow">{notFound.eyebrow}</span>
        <h1 className="simple-page__title">{notFound.heading}</h1>
        <p className="simple-page__body">{notFound.body}</p>
        <Link className="btn btn--primary" to={notFound.homePath}>
          {notFound.action}
        </Link>
      </div>
    </div>
  );
}
