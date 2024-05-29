import EventPresenter from './presenter/event-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationModel from './model/destination-model.js';
import OffersModel from './model/offers-model.js';

const siteMainElement = document.querySelector('.page-body');
const tripEventListElement = siteMainElement.querySelector('.trip-events__list');

const pointsModel = new PointsModel();
const destinationModel = new DestinationModel();
const offersModel = new OffersModel();
const eventPresenter = new EventPresenter({
  siteMainElement,
  tripEventListElement,
  pointsModel,
  destinationModel,
  offersModel
});

eventPresenter.init();

