import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {getDestinationById, mockDestinations} from '../mock/destinations.js';
import {EVENT_TYPES} from '../const.js';
import {getAvailableOffers} from '../model/offers-model.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
function createEditPointForm(point) {

  const offerItems = getAvailableOffers(point.type);

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${EVENT_TYPES.map((eventType) => (`
                          <div class="event__type-item">
                            <input id="event-type-${eventType.name}-1" class="event__type-input  visually-hidden" type="radio"
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
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"
                    value="${point.destination ? getDestinationById(point.destination).name : ''}" list="destination-list-1">
                    <datalist id="destination-list-1">
                    ${mockDestinations.map((destinationItem) => (`
                      <option value="${destinationItem.name}"></option>
                    `)).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${point.dateFrom}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${point.dateTo}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                  <div class="event__available-offers">
                    ${offerItems.map((offerItem, offerTitle) => (`
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${offerTitle}" type="checkbox" name="${offerItem.id}"
                        ${point.offers.includes(offerItem.id) ? 'checked' : ''}>
                        <label class="event__offer-label" for="event-offer-comfort-${offerTitle}">
                          <span class="event__offer-title">${offerItem.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offerItem.price}</span>
                        </label>
                      </div>
                    `)).join('')}
                  </div>
                </section>
                <section class="event__section  event__section--destination">
                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                  <p class="event__destination-description">${point.destination ? getDestinationById(point.destination).description : ''}</p>
                </section>
              </section>
              </form>
            </li>`;
}

export default class EditPointFormView extends AbstractStatefulView {
  #handleEditClick = null;
  #handleFormSubmit = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  constructor({point, onEditClick, onFormSubmit}) { //передаем обработчик onEditClick шаг 1
    super();
    this._setState(EditPointFormView.parsePointToState(point));
    this.#handleEditClick = onEditClick; //сохраняем обработчик в приватное совойство шаг 2
    this._restoreHandlers();
    this.#handleFormSubmit = onFormSubmit;
  }

  get template() {
    return createEditPointForm(this._state);
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
      .addEventListener('click', this.#editClickHandler); //подписываемся на соответствующее событие шаг 3 подписываемся на приватный метод
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceInputHandler);

    this.#setDatepicker();
  }

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: Number.parseFloat(evt.target.value),
    });
  };

  #editClickHandler = (evt) => { //шаг 4 описываем сам обработчик
    if (evt.target.classList.contains('event__rollup-btn')) {
      this.#handleEditClick(); //шаг 5 вызываем обработчик, который пришел в конструктор и был записан в свойство в конструкторе
    }
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
    });
  };

  #destinationChangeHandler = (evt) => {
    const destName = evt.target.value;
    const destination = mockDestinations.find((destItem) => destName === destItem.name);

    this.updateElement({
      destination: destination ? destination.id : null,
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointFormView.parsePointToState(this._state));
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({point: {...this._state.point, dateFrom: userDate}});
    this.#datepickerTo.set('minDate', this._state.point.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({point: {...this._state.point, dateFrom: userDate}});
    this.#datepickerFrom.set('maxDate', this._state.point.dateTo);
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
        defaultDate: this._state.dateFrom, //в какой момент point превратился в _state
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

  static parsePointToState(point) {
    return point;
  }

  static parseStateToPoint(state) {
    const point = {...state};
    return point;
  }
}
