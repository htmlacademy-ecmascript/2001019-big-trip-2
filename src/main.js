import EventPresenter from './presenter/event-presenter.js';
const siteMainElement = document.querySelector('.page-body');
const eventPresenter = new EventPresenter({eventContainer: siteMainElement});
eventPresenter.init();

