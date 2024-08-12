import {remove, render, RenderPosition} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';
import AddNewPointFormView from '../view/add-new-point-form-view.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #pointAddComponent = null;
  #handleCancelClick = null;
  #destinations = [];
  #offers = [];

  constructor({pointListContainer, onDataChange, onDestroy, onCancelClick, destinations, offers}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#handleCancelClick = onCancelClick;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init() {
    if (this.#pointAddComponent !== null) {
      return;
    }

    this.#pointAddComponent = new AddNewPointFormView({
      onFormSubmit: this.#handleFormSubmit,
      onCancelClick: this.#handleCancelClick,
      destinations: this.#destinations,
      offers: this.#offers,
    });

    render(this.#pointAddComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointAddComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointAddComponent.shake(resetFormState);
  }

  setSaving() {
    this.#pointAddComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
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
      point,
    );
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
