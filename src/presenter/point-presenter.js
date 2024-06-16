import {render, replace} from '../framework/render.js';
import EventListItemView from "../view/event-list-item-view.js";
import EditPointFormView from "../view/edit-point-form-view.js";

export default class PointPresenter {
  #tripEventListElement = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #pointComponents = [];

  #point = null;

  constructor({tripEventListElement}) {
    this.#tripEventListElement = tripEventListElement;
  }

  get point() {
    return this.#pointComponent
  }

  init(point) {
    this.#point = point;

    this.#pointComponent = new EventListItemView({
      point: this.#point,
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

    render(this.#pointComponent, this.#tripEventListElement);

    return this.#pointComponent;
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
}
