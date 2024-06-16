import {remove, render, replace} from '../framework/render';
import TripFilterView from '../view/trip-filter-view.js';
import TripSortView from '../view/trip-sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from "./point-presenter.js";

import {generateFilter} from '../mock/filter.js';
import {filter} from '../utils/filter';


export default class EventPresenter {
  #siteMainElement = null;
  #pointsModel = null;
  #destinationModel = null;
  #offersModel = null;
  #tripEventListElement = null;
  #filterComponent = null;
  #pointComponents = [];
  #noPointComponent = null;
  #sortComponent = new TripSortView();

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
    this.#filterComponent = new TripFilterView(filters, {onChange: this.#handleFilterChange});
    this.#renderFilter(this.points);
    this.#renderSort(this.points);

    this.#renderPointsList(this.points);
  }

  #handleFilterChange = (filterType) => {
    for (const pointComponentItem of this.#pointComponents) {
      console.log(this.#pointComponents);
      console.log(pointComponentItem);
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

  #renderFilter() {
    render(this.#filterComponent, this.#siteMainElement.querySelector('.trip-controls__filters'));
  }

  #renderSort() {
    render(this.#sortComponent, this.#siteMainElement.querySelector('.trip-events__trip-sort-container'));
  }

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
    const pointPresenter = new PointPresenter({
      tripEventListElement: this.#tripEventListElement,
    });

    pointPresenter.init(point);

    return pointPresenter.point;
  }
}


