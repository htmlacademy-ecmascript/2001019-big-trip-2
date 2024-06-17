import {remove, render, replace} from '../framework/render.js';
import EventListItemView from '../view/event-list-item-view.js';
import EditPointFormView from '../view/edit-point-form-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #tripEventListElement = null;

  #pointComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #pointEditComponent = null;
  #pointComponents = [];

  #point = null;
  #mode = Mode.DEFAULT;

  constructor({tripEventListElement, onDataChange, onModeChange}) {
    this.#tripEventListElement = tripEventListElement;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  get point() {
    return this.#pointComponent;
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

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);

    return this.#pointComponent;
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
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
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  }

  #handleFavoriteClick = () => {
    /*
    здесь передавался поинт уже деструктурированный,
    а старая логика рассчитана на то, что в неё передается поинт внутри объекта,
    В результате когда point перерисовывался, в объекте уже не было свойства point и всё ломалось
     */

    // Меняем значение isFavorite на противоположное
    this.#point.point.isFavorite = !this.#point.point.isFavorite;
    this.#handleDataChange(this.#point);
  };
}
