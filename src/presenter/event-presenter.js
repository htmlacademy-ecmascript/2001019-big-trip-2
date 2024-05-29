import {render, replace} from '../framework/render';
import TripFilterView from '../view/trip-filter-view.js';
import TripSortView from '../view/trip-sort-view.js';
import EventListItemView from '../view/event-list-item-view.js';
import EditPointFormView from '../view/edit-point-form-view.js';

export default class EventPresenter {
  #siteMainElement = null;
  #pointsModel = null;
  #destinationModel = null;
  #offersModel = null;
  #tripEventListElement = null;

  constructor({siteMainElement, pointsModel, destinationModel, offersModel, tripEventListElement}) {
    this.#siteMainElement = siteMainElement;
    this.#pointsModel = pointsModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#tripEventListElement = tripEventListElement;
  }

  init() {
    this.points = [...this.#pointsModel.getPoints()];
    this.destination = [...this.#destinationModel.getDestination()];
    this.offers = [...this.#offersModel.getOffers()];

    render(new TripFilterView(), this.#siteMainElement.querySelector('.trip-controls__filters'));
    render(new TripSortView(), this.#siteMainElement.querySelector('.trip-events__trip-sort-container'));

    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint({point: this.points[i]});
    }
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const pointComponent = new EventListItemView({
      point,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const pointEditComponent = new EditPointFormView({
      point,
      onEditClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#tripEventListElement);
  }
}


