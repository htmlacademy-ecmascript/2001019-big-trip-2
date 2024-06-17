import {remove, render, replace} from '../framework/render.js';
import EventListItemView from "../view/event-list-item-view.js";
import EditPointFormView from "../view/edit-point-form-view.js";

export default class PointPresenter {
  #tripEventListElement = null;

  #pointComponent = null;
  #handleDataChange = null;
  #pointEditComponent = null;
  #pointComponents = [];

  #point = null;

  constructor({tripEventListElement, onDataChange}) {
    this.#tripEventListElement = tripEventListElement;
    this.#handleDataChange = onDataChange;
  }

  get point() {
    return this.#pointComponent
  }

  init(point) {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new EventListItemView({
      point: this.#point,
      onFavoriteClick: this.#handleFavoriteClick,
      onEditClick: () => {
        this.#replacePointToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }

    });

    this.#pointEditComponent = new EditPointFormView({
      point: this.#point,
      onEditClick: () => {
        this.#replaceFormToPoint();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#tripEventListElement);
      return;
    }

    if (this.#tripEventListElement.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#tripEventListElement.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);

    return this.#pointComponent;
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
  }

  #handleFavoriteClick = () => {
    /*
    В #handleDataChange передавался поинту уже деструктурированный,
    а старая логика рассчитана на то, что в неё передайтся поинт внутри объекта,
    В результате когда point перерисовывался, в объекте уже не было свойства point и всё ломалось
     */

    // Меняем значение isFavorite на противоположное
    this.#point.point.isFavorite = !this.#point.point.isFavorite;
    this.#handleDataChange(this.#point);
  }
}
