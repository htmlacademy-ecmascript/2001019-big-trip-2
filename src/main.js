import EventPresenter from './presenter/event-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationModel from './model/destination-model.js';

const siteMainElement = document.querySelector('.page-body');

const pointsModel = new PointsModel();
const destinationModel = new DestinationModel();
const eventPresenter = new EventPresenter({
  siteMainElement,
  pointsModel,
  destinationModel,
});

eventPresenter.init();

