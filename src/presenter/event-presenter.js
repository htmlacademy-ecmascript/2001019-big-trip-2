import {remove, render, replace} from '../framework/render';
import TripFilterView from '../view/trip-filter-view.js';
import TripSortView from '../view/trip-sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from "./point-presenter.js";

import {generateFilter} from '../mock/filter.js';
import {filter} from '../utils/filter';
import {updateItem} from "../utils.js";


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
  #pointPresenters = new Map();

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

  //метод обновляет точку
  #handlePointChange = (updatedPoint) => {
    console.log(updatedPoint.point)
    this.#pointComponents = updateItem(this.#pointComponents, updatedPoint.point); //вернет обновленны массив
    // рендерим во второй раз - в init передавался point не внутри объекта и всё ломалось
    this.#pointPresenters.get(updatedPoint.point.id).init(updatedPoint)
  };

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

  // рендерим в первый раз
  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      tripEventListElement: this.#tripEventListElement,
      onDataChange: this.#handlePointChange
    });
    pointPresenter.init(point);
    // point это объект, в котором есть свойство - объект point, в котором уже есть id и всё остальное
    this.#pointPresenters.set(point.point.id, pointPresenter);
    //свойство #taskPresenters, где Board-презентер будет хранить ссылки на все Task-презентеры.

    return pointPresenter.point;
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}


