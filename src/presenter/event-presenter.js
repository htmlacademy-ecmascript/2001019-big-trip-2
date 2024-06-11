import {remove, render, replace} from '../framework/render';
import TripFilterView from '../view/trip-filter-view.js';
import TripSortView from '../view/trip-sort-view.js';
import EventListItemView from '../view/event-list-item-view.js';
import EditPointFormView from '../view/edit-point-form-view.js';
import NoPointView from '../view/no-point-view.js';

import {generateFilter} from '../mock/filter.js';
import {filter} from '../utils/filter';


export default class EventPresenter {
  #siteMainElement = null;
  #pointsModel = null;
  #destinationModel = null;
  #offersModel = null;
  #tripEventListElement = null;
  #tripFilterComponent = null;
  #pointComponents = [];
  #noPointComponent = null;

  constructor({siteMainElement, pointsModel, destinationModel, offersModel, tripEventListElement}) {
    this.#siteMainElement = siteMainElement;
    this.#pointsModel = pointsModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#tripEventListElement = tripEventListElement;
  }

  init() {
    this.points = this.#pointsModel.getPoints();
    this.destination = this.#destinationModel.getDestination();
    this.offers = this.#offersModel.getOffers();
    const filters = generateFilter(this.points);

    render(new TripFilterView(filters, {onChange: this.#handleFilterChange}), this.#siteMainElement.querySelector('.trip-controls__filters'));
    render(new TripSortView(), this.#siteMainElement.querySelector('.trip-events__trip-sort-container'));

    this.#renderPointsList(this.points);
  }

  #handleFilterChange = (filterType) => {
    for (const pointComponentItem of this.#pointComponents) {
      remove(pointComponentItem);
    }

    this.#pointComponents = [];
    const points = filter[filterType](this.points);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (points.length > 0) {
      this.#renderPointsList(points);
    } else {
      this.#renderNoPointComponent(filterType);
    }
  };

  #renderPointsList(points) {
    for (let i = 0; i < points.length; i++) {
      const pointComponent = this.#renderPoint({point: points[i]});

      this.#pointComponents.push(pointComponent);
    }
  }

  #renderNoPointComponent(filterType) {
    const noPointComponent = new NoPointView(filterType);
    this.#noPointComponent = noPointComponent;
    render(noPointComponent, this.#siteMainElement.querySelector('.trip-events'));
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

    return pointComponent;
  }
}


