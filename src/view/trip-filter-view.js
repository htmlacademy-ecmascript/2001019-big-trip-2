import AbstractView from '../framework/view/abstract-view.js';

function createTripFilterTemplate(filter, currentFilterType) {
  return `<form class="trip-filters" action="#" method="get">
                ${filter.map((filterType) => (`
                <div class="trip-filters__filter">
                  <input
                  id="filter-${filterType}"
                  class="trip-filters__filter-input  visually-hidden"
                  type="radio"
                  name="trip-filter"
                  value="${filterType}"
                  ${currentFilterType === filterType ? 'checked' : ''}
                  />
                  <label class="trip-filters__filter-label" for="filter-${filterType}">${filterType}</label>
                </div>
                `)).join('')}

                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
}

export default class TripFilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;
  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createTripFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
