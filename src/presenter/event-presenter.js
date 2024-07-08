import {remove, render} from '../framework/render';
import TripFilterView from '../view/trip-filter-view.js';
import TripSortView from '../view/trip-sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';

import {generateFilter} from '../mock/filter.js';
import {filter} from '../utils/filter';
import {updateItem} from '../utils.js';
import {sortTimeDown, sortPriceDown} from '../utils/sort.js';
import {SortType} from '../const.js';


export default class EventPresenter {
  #siteMainElement = null;
  #pointsModel = null;
  #destinationModel = null;
  #offersModel = null;
  #tripEventListElement = null;
  #filterComponent = null;
  #pointComponents = [];
  #noPointComponent = null;
  #sortComponent = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sourcedEventPoints = [];

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
    this.#sourcedEventPoints = [...this.points];
    this.#renderFilter(this.points);
    this.#renderSort(this.points);

    this.#renderPointsList(this.points);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

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

  #renderFilter() {
    render(this.#filterComponent, this.#siteMainElement.querySelector('.trip-controls__filters'));
  }

  #handlePointChange = (updatedPoint) => {
    this.#pointComponents = updateItem(this.#pointComponents, updatedPoint);
    this.#sourcedEventPoints = updateItem(this.#sourcedEventPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this.points.sort(sortPriceDown);
        break;
      case SortType.TIME:
        this.points.sort(sortTimeDown);
        break;
      default:
        this.points = [...this.#sourcedEventPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointsList(this.points);
  };

  #renderSort() {
    this.#sortComponent = new TripSortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType,
    });
    render(this.#sortComponent, this.#siteMainElement.querySelector('.trip-events__trip-sort-container'));
  }

  #renderPointsList(points) {
    for (let i = 0; i < points.length; i++) {
      const pointComponent = this.#renderPoint(points[i]);
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
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);

    return pointPresenter.point;
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}


