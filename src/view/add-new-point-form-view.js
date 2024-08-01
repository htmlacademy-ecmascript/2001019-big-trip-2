//import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {getDestinationById, mockDestinations} from '../mock/destinations.js';
import {EVENT_TYPES} from '../const.js';
import {getAvailableOffers} from '../model/offers-model.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
//import {nanoid} from 'nanoid';
//import {UserAction, UpdateType} from "../const.js";

const DEFAULT_POINT = {
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: '40790a4f-e69a-425d-b9d7-bf3e31993508',
  //isFavorite: true,
  offers: [
    // '17cadf51-69ee-4efc-a4bf-961d19f54a74'
  ],
  type: 'flight'
};

const destinationItem = getDestinationById(DEFAULT_POINT.destination);

function createAddNewPointFormTemplate(point) {

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
                          <div class="event__type-item"> <input id="event-type-${eventType.name}-1" class="event__type-input  visually-hidden"
                          type="radio" name="event-type" value="${eventType.name}" ${eventType.name === point.type ? 'checked' : ''}>
                            <label class="event__type-label  event__type-label--${eventType.name}" for="event-type-${eventType.name}-1"> ${eventType.title}</label>
                          </div>
                        `)).join('')}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${point.type}
                    </label>
                    <input required class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${point.destination ? getDestinationById(point.destination).name : ''}" list="destination-list-1">
                    <datalist id="destination-list-1">
                    ${mockDestinations.map((destItem) => (`
                      <option value="${destItem.name}"></option>
                    `)).join('')}
                    </datalist>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
                  </div>
                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input required step="0.01" min="0" class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="">
                  </div>
                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>

                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                    ${getAvailableOffers(point.type).map((offerItem, offerTitle) => (`
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${offerTitle}" type="checkbox" name="${offerItem.id}"
                        ${point.offers.includes(offerItem.id) ? 'checked' : ''}>
                        <label class="event__offer-label" for="event-offer-comfort-${offerTitle}">
                          <span class="event__offer-title">${offerItem.title}</span>&plus;&euro;&nbsp;
                          <span class="event__offer-price">${offerItem.price}</span>
                        </label>
                      </div>
                    `)).join('')}
                    </div>
                  </section>
                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destinationItem.description}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${destinationItem.pictures.map((destinationPhoto) => (`
                        <img class="event__photo" src="${destinationPhoto.src}" alt="Event photo">
                      `)).join('')}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`;
}

export default class AddNewPointFormView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleCancelClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  //#handleDestroy = null;

  constructor({onFormSubmit, onCancelClick}) {
    super();
    this._setState(AddNewPointFormView.parsePointToState(DEFAULT_POINT));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCancelClick = onCancelClick;
    //this.#handleDestroy = onDestroy;

    this._restoreHandlers();
  }

  get template() {
    return createAddNewPointFormTemplate(this._state);
    //return createAddNewPointFormTemplate(point);
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#cancelClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceInputHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offerChangeHandler);

    this.#setDatepicker();
  }

  destroy() {

  }

  #typeChangeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: Number.parseFloat(evt.target.value),
    });
  };

  #destinationChangeHandler = (evt) => {
    const destName = evt.target.value;
    const destination = mockDestinations.find((destItem) => destName === destItem.name);

    this.updateElement({
      destination: destination ? destination.id : null,
    });
  };

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

  #cancelClickHandler = () => {
    this.#handleCancelClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(AddNewPointFormView.parseStateToPoint(this._state));
    // const point = {
    //   id: '1da44258-4c38-4867-a9bd-2448d610caab',
    //   basePrice: 5555,
    //   dateFrom: '2024-05-28T05:19:06.165Z',
    //   dateTo: '2024-05-29T01:40:06.165Z',
    //   destination: '40790a4f-e69a-425d-b9d7-bf3e31993508',
    //   isFavorite: false,
    //   offers: [
    //     'fe667e84-c5b4-4f6f-8e11-90e1260af303',
    //     '49d81986-d8f4-4bde-8bbf-3d193f0db2aa',
    //     '04e42937-c64d-4fae-93ce-f5ca690b5b78'
    //   ],
    //   type: 'flight'
    // };
    //
    // this.#handleFormSubmit(point);
  };

  // #formSubmitHandler = (evt) => {
  //   evt.preventDefault();
  //   this.#handleFormSubmit(EditPointFormView.parsePointToState(this._state));
  // };

  static parsePointToState(point) {
    return point;
  }

  static parseStateToPoint(state) {
    const point = {...state};
    return point;
  }
}
