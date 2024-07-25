import EventPresenter from './presenter/event-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationModel from './model/destination-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from "./model/filter-model.js";
import FilterPresenter from "./presenter/filter-presenter";
import NewPointButtonView from "./view/new-point-button-view";
import {render} from './framework/render';

const siteMainElement = document.querySelector('.page-body');
const filterElement = siteMainElement.querySelector('.trip-main__trip-controls');
const tripEventListElement = siteMainElement.querySelector('.trip-events__list');
const siteHeaderElement = siteMainElement.querySelector('.page-header__container');

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
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  eventPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, siteHeaderElement);

filterPresenter.init();
eventPresenter.init();

