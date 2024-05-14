import {createElement} from '../render.js';
import {getDestinationById, mockDestinations} from '../mock/destinations.js';
import {getEventTypes} from '../const.js';
import {getAvailableOffers} from '../mock/offers.js';
function createEditPointForm(point) {
  const {destination, offers, type} = point;
  const destinationItem = getDestinationById(destination);

  let eventTypesBlock = '';
  let destinationsBlock = '';
  let offersBlock = '';

  const eventTypes = getEventTypes();
  let currentEventType;


  for (const eventType of eventTypes) {
    eventTypesBlock += `
    <div class="event__type-item">
     <input id="event-type-${eventType.name}-1" class="event__type-input  visually-hidden" type="radio"
     name="event-type" value="${eventType.name}" ${eventType.name === type ? 'checked' : ''}>
     <label class="event__type-label  event__type-label--${eventType.name}" for="event-type-${eventType.name}-1">${eventType.title}</label>
    </div>
    `;

    if (eventType.name === type) {
      currentEventType = eventType;
    }
  }

  for (const destItem of mockDestinations) {
    destinationsBlock += `<option value="${destItem.name}"></option>`;
  }

  for (const offerItem of getAvailableOffers(type)) {
    offersBlock += `
    <div class="event__offer-selector">
     <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="${offerItem.id}"
     ${offers.includes(offerItem.id) ? 'checked' : ''}>
     <label class="event__offer-label" for="${offerItem.id}">
      <span class="event__offer-title">${offerItem.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offerItem.price}</span>
     </label>
    </div>
    `;
  }

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${eventTypesBlock}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${currentEventType.title}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationItem.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${destinationsBlock}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">
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
                        ${offersBlock}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destinationItem.description}</p>
                  </section>
                </section>
              </form>
            </li>`;
}

export default class EditPointFormView {
  constructor({point}) {
    this.point = point;
  }

  getTemplate() {
    return createEditPointForm(this.point);
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
