import {createElement} from '../render.js';
import {getDestinationById, mockDestinations} from '../mock/destinations.js';
import {EVENT_TYPES} from '../const.js';
import {getAvailableOffers} from '../model/offers-model.js';

const DEFAULT_POINT = {
  id: '27f76798-a449-473a-91a9-23cb4211a177',
  basePrice: 0,
  dateFrom: '2024-05-17T16:33:06.165Z',
  dateTo: '2024-05-18T15:44:06.165Z',
  destination: '40790a4f-e69a-425d-b9d7-bf3e31993508',
  isFavorite: true,
  offers: [
    '17cadf51-69ee-4efc-a4bf-961d19f54a74'
  ],
  type: 'drive'
};

const destinationItem = getDestinationById(DEFAULT_POINT.destination);
const pointType = EVENT_TYPES.find((typeItem) => typeItem.name === DEFAULT_POINT.type);

function createPhotosTemplate() {
  return (
    `${destinationItem.pictures.map((destinationPhoto) => (`
      <img class="event__photo" src="${destinationPhoto.src}" alt="Event photo">
    `)).join('')}`
  );
}

function createDestinationsTemplate() {
  return (
    `${mockDestinations.map((destItem) => (`
        <option value="${destItem.name}"></option>
    `)).join('')}`
  );
}

function createEventTypesTemplate() {
  return (
    `${EVENT_TYPES.map((eventType) => (`
      <div class="event__type-item"> <input
        id="event-type-${eventType.name}-1"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${eventType.name}"
        ${eventType.name === pointType.name ? 'checked' : ''}
        >
        <label class="event__type-label  event__type-label--${eventType.name}"
          for="event-type-${eventType.name}-1">
          ${eventType.title}
        </label>
      </div>
  `)).join('')}`
  );
}

function createOffersTemplate() {
  return (
    `${getAvailableOffers(DEFAULT_POINT.type).map((offerItem) => (`
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden"
        id="event-offer-comfort-1"
        type="checkbox"
        name="${offerItem.id}"
        ${DEFAULT_POINT.offers.includes(offerItem.id) ? 'checked' : ''}>
        <label class="event__offer-label"
        for="${offerItem.id}">
        <span class="event__offer-title">
          ${offerItem.title}
        </span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">
          ${offerItem.price}
        </span>
        </label>
      </div>
    `)).join('')}`
  );
}
function createAddNewPointFormTemplate() {
  const photosTemplate = createPhotosTemplate();
  const eventTypesTemplate = createEventTypesTemplate();
  const offersTemplate = createOffersTemplate();
  const destinationsTemplate = createDestinationsTemplate();

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType.name}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${eventTypesTemplate}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${pointType.name}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationItem.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${destinationsTemplate}
                    </datalist>
                  </div>

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
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${offersTemplate}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destinationItem.description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photosTemplate}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`;
}

export default class AddNewPointFormView {

  constructor({destination}) {
    this.destination = destination;
  }

  getTemplate() {
    return createAddNewPointFormTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
