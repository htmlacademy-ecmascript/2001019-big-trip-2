import {remove, render, RenderPosition} from '../framework/render';
import {UserAction, UpdateType} from '../const';
import AddNewPointFormView from '../view/add-new-point-form-view';
import {nanoid} from 'nanoid';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #pointAddComponent = null;
  #handleCancelClick = null;

  constructor({pointListContainer, onDataChange, onDestroy, onCancelClick}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#handleCancelClick = onCancelClick;
  }

  init() {
    if (this.#pointAddComponent !== null) {
      return;
    }

    this.#pointAddComponent = new AddNewPointFormView({
      onFormSubmit: this.#handleFormSubmit,
      onCancelClick: this.#handleCancelClick
    });

    render(this.#pointAddComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointAddComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointAddComponent);
    this.#pointAddComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point}
    );
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
