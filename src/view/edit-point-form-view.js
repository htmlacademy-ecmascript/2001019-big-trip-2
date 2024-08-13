import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {EVENT_TYPES} from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
function createEditPointForm(point, destinations, offers) {
  const pointDestination = destinations.find((destItem) => destItem.id === point.destination);
  const availableOffers = offers.find((offer) => offer.type === point.type);
  const {isDisabled, isSaving, isDeleting} = point;

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
                    </label>
                    <input ${isDisabled ? 'disabled' : ''} class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${EVENT_TYPES.map((eventType) => (`
                          <div class="event__type-item">
                            <input ${isDisabled ? 'disabled' : ''} id="event-type-${eventType.name}-1" class="event__type-input  visually-hidden" type="radio"
                            name="event-type" value="${eventType.name}" ${eventType.name === point.type ? 'checked' : ''}>
                            <label class="event__type-label  event__type-label--${eventType.name}" for="event-type-${eventType.name}-1">${eventType.title}</label>
                            </div>
                        `)).join('')}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-type-toggle-1">
                      ${point.type}
                    </label>
                    <input ${isDisabled ? 'disabled' : ''} class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"
                    value="${pointDestination ? pointDestination.name : ''}" list="destination-list-1">
                    <datalist id="destination-list-1">
                    ${destinations.map((destinationItem) => (`
                      <option value="${destinationItem.name}"></option>
                    `)).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input ${isDisabled ? 'disabled' : ''} class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${point.dateFrom}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input ${isDisabled ? 'disabled' : ''} class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${point.dateTo}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input ${isDisabled ? 'disabled' : ''} step="1" min="0" class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
                  <button class="event__reset-btn" type="reset"> ${isDeleting ? 'Deleting...' : 'Delete'}</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${(availableOffers && availableOffers.offers.length > 0) ? `
                  <section class="event__section  event__section--offers">
                  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                  <div class="event__available-offers">
                    ${availableOffers.offers.map((offerItem, offerIndex) => (`
                      <div class="event__offer-selector">
                        <input ${isDisabled ? 'disabled' : ''} class="event__offer-checkbox visually-hidden" id="event-offer-comfort-${offerIndex}" type="checkbox" name="${offerItem.id}"
                        ${point.offers.includes(offerItem.id) ? 'checked' : ''}>
                        <label class="event__offer-label" for="event-offer-comfort-${offerIndex}">
                          <span class="event__offer-title">${offerItem.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offerItem.price}</span>
                        </label>
                      </div>
                    `)).join('')}
                  </div>
                  </section>` : ''}
                  ${(pointDestination && pointDestination.pictures.length > 0) ? `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${pointDestination ? pointDestination.description : ''}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${pointDestination ? pointDestination.pictures.map((destinationPhoto) => (`
                        <img class="event__photo" src="${destinationPhoto.src}" alt="Event photo">
                      `)).join('') : ''}
                      </div>
                    </div>
                  </section>` : ''}
              </section>
              </form>
            </li>`;
}

export default class EditPointFormView extends AbstractStatefulView {
  #handleEditClick = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #destinations = [];
  #offers = [];
  constructor({point, onEditClick, onFormSubmit, onDeleteClick, destinations, offers}) {
    super();
    this._setState(EditPointFormView.parsePointToState(point));
    this.#handleEditClick = onEditClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#destinations = destinations;
    this.#offers = offers;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointForm(this._state, this.#destinations, this.#offers);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditPointFormView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit')
      .addEventListener('click', this.#editClickHandler);
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceInputHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offerChangeHandler);

    this.#setDatepicker();
  }

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedOffers = [...this._state.offers];
    const offerId = evt.target.name;
    if (evt.target.checked) {
      selectedOffers.push(offerId);
    } else {
      selectedOffers.splice(selectedOffers.indexOf(offerId), 1);
    }

    this.updateElement({
      offers: selectedOffers
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: Number.parseFloat(evt.target.value),
    });
  };

  #editClickHandler = (evt) => {
    if (evt.target.classList.contains('event__rollup-btn')) {
      this.#handleEditClick();
    }
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
    });
  };

  #destinationChangeHandler = (evt) => {
    const destName = evt.target.value;
    const destination = this.#destinations.find((destItem) => destName === destItem.name);
    this.updateElement({
      destination: destination ? destination.id : null,
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointFormView.parseStateToPoint(this._state));
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({...this._state, dateFrom: userDate.toISOString()});
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({...this._state, dateTo: userDate.toISOString()});
    this.#datepickerFrom.set('maxDate', this._state.dateTo);
  };

  #setDatepicker = () => {
    const datePickerStartElement = this.element.querySelector('input[name=event-start-time]');
    const datePickerEndElement = this.element.querySelector('input[name=event-end-time]');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {firstDayOfWeek: 1},
      'time_24hr': true
    };

    this.#datepickerFrom = flatpickr(
      datePickerStartElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromCloseHandler,
        maxDate: this._state.dateTo
      }
    );

    this.#datepickerTo = flatpickr(
      datePickerEndElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToCloseHandler,
        minDate: this._state.dateFrom
      }
    );
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointFormView.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {
    return {...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}
