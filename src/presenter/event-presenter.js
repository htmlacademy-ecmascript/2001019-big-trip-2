import {remove, render} from '../framework/render';
import TripFilterView from '../view/trip-filter-view.js';
import TripSortView from '../view/trip-sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';

import {generateFilter} from '../mock/filter.js';
import {filter} from '../utils/filter';
import {updateItem} from '../utils.js';
import {sortTimeDown, sortPriceDown} from '../utils/sort.js';
import {SortType, UpdateType, UserAction} from '../const.js';


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

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPriceDown);
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortTimeDown);
    }

    return this.#pointsModel.points;
  }

  init() {
    this.destination = this.#destinationModel.getDestination();
    this.offers = this.#offersModel.getOffers();
    const filters = generateFilter(this.points);
    this.#filterComponent = new TripFilterView(filters, {onChange: this.#handleFilterChange});
    this.#sourcedEventPoints = [...this.points];
    this.#renderFilter(this.points);

    this.#renderList();
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
      // this.#renderPointsList(points);
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

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearList({});
        this.#renderList();
        break;
      case UpdateType.MAJOR:
        this.#clearList({resetSortType: true});
        this.#renderList();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearList({});
    this.#renderList();
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
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);

    return pointPresenter.point;
  }

  #clearList({resetSortType = false}) {
    const pointCount = this.points.length;

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noPointComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderList() {
    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPointComponent();
      return;
    }

    this.#renderSort();

    for (let i = 0; i < points.length; i++) {
      render(this.#renderPoint(points[i]), this.#tripEventListElement);
    }
  }
}


