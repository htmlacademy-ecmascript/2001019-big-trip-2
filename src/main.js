import EventPresenter from './presenter/event-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationModel from './model/destination-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from "./model/filter-model.js";
import FilterPresenter from "./presenter/filter-presenter";

const siteMainElement = document.querySelector('.page-body');
const filterElement = siteMainElement.querySelector('.trip-main__trip-controls');
const tripEventListElement = siteMainElement.querySelector('.trip-events__list');

const pointsModel = new PointsModel();
const destinationModel = new DestinationModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer: filterElement,
  filterModel,
  pointsModel
});

const eventPresenter = new EventPresenter({
  siteMainElement,
  tripEventListElement,
  pointsModel,
  destinationModel,
  offersModel,
  filterModel
});

filterPresenter.init();
eventPresenter.init();

