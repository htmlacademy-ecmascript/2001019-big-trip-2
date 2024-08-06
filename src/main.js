import EventPresenter from './presenter/event-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationModel from './model/destination-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter';
import NewPointButtonView from './view/new-point-button-view';
import {render} from './framework/render';
import PointsApiService from './points-api-service';

const AUTHORIZATION = 'Basic ab5c610de29889a';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const siteMainElement = document.querySelector('.page-body');
const filterElement = siteMainElement.querySelector('.trip-main__trip-controls');
const tripEventListElement = siteMainElement.querySelector('.trip-events__list');
const siteHeaderElement = siteMainElement.querySelector('.page-header__container');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const destinationModel = new DestinationModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

destinationModel.init();

const offersModel = new OffersModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
offersModel.init();

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

filterPresenter.init();
eventPresenter.init();
pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, siteHeaderElement);
  });
