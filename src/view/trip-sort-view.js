import AbstractView from '../framework/view/abstract-view';
import {SortType} from '../const.js';

function createTripSortTemplate(currentSortType, disabledSortTypes) {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${Object.entries(SortType).map(([sortTypeName, sortTypeItem]) => (`
            <div class="trip-sort__item  trip-sort__item--day">
              <input
              id="${sortTypeItem}"
              class="trip-sort__input  visually-hidden"
              type="radio"
              name="trip-sort"
              value="${sortTypeItem}"
              ${disabledSortTypes.includes(sortTypeItem) ? 'disabled' : ''}
              ${currentSortType === sortTypeItem ? 'checked' : ''}>
              <label class="trip-sort__btn" for="sort-day" data-sort-type="${sortTypeItem}">${sortTypeName}</label>
            </div>
            `)).join('')}
        </form>`;
}

export default class TripSortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;
  #disabledSortTypes = [
    SortType.OFFERS,
    SortType.EVENT
  ];

  constructor({onSortTypeChange, currentSortType}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createTripSortTemplate(this.#currentSortType, this.#disabledSortTypes);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    const sortType = evt.target.dataset.sortType;

    if (evt.target.tagName !== 'LABEL' || this.#disabledSortTypes.includes(sortType)) {
      return;
    }

    this.#handleSortTypeChange(sortType);
  };
}
