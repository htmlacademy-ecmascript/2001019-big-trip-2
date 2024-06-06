import AbstractView from '../framework/view/abstract-view.js';

function createTripFilterTemplate(filter) {
  return `<form class="trip-filters" action="#" method="get">
                ${filter.map((filterItem, currentType) => (`
                <div class="trip-filters__filter">
                  <input
                  id="filter-${filterItem.type}"
                  class="trip-filters__filter-input  visually-hidden"
                  type="radio"
                  name="trip-filter"
                  value="${filterItem.type}"
                  ${currentType === filterItem.type ? 'checked' : ''}
                  ${filter[currentType].disabled ? 'disabled' : ''}
                  />
                  <label class="trip-filters__filter-label" for="filter-${filterItem.type}">${filterItem.type}</label>
                </div>
                `)).join('')}

                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
}

export default class TripFilterView extends AbstractView {
  #filters = null;
  #handleChange = null;

  constructor(filters, {onChange}) {
    super();
    this.#filters = filters;
    this.#handleChange = onChange;
    this.element.addEventListener('change', this.#changeHandler);
  }

  get template() {
    return createTripFilterTemplate(this.#filters);
  }

  #changeHandler = (evt) => {
    evt.preventDefault();
    this.#handleChange(evt.target.value);
  };
}
