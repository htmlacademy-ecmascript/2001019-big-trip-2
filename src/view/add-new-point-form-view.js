import {createElement} from '../render.js';
import {getRandomDestination, mockDestinations} from '../mock/destinations.js';
import {getEventTypes, getRandomEventType} from '../const.js';
import {getAvailableOffers} from '../mock/offers.js';

function createAddNewPointFormTemplate(point) {
  const {offers, type} = point;
  const destinationItem = getRandomDestination();
  const typeItem = getRandomEventType();
  let destinationsBlock = '';
  let photosBlock = '';
  let eventTypesBlock = '';
  let offersBlock = '';
  const eventTypes = getEventTypes();


  for (const destinationPhoto of destinationItem.pictures) {
    photosBlock += `
      <img class="event__photo" src="${destinationPhoto.src}" alt="Event photo">
    `;
  }

  for (const destItem of mockDestinations) {
    destinationsBlock += `<option value="${destItem.name}"></option>`;
  }

  for (const eventType of eventTypes) {
    eventTypesBlock += `
    <div class="event__type-item">
     <input id="event-type-${eventType.name}-1" class="event__type-input  visually-hidden" type="radio"
     name="event-type" value="${eventType.name}" ${eventType.name === typeItem.name ? 'checked' : ''}>
     <label class="event__type-label  event__type-label--${eventType.name}" for="event-type-${eventType.name}-1">${eventType.title}</label>
    </div>
    `;
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
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${typeItem.name}.png" alt="Event type icon">
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
                      ${typeItem.name}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationItem.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${destinationsBlock}
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
                      ${offersBlock}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destinationItem.description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photosBlock}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`;
}

export default class AddNewPointFormView {

  // constructor({destination}) {
  //   this.destination = destination;
  // }
  constructor({destination}) {
    this.destination = destination;
  }

  getTemplate() {
    return createAddNewPointFormTemplate(this.destination);
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
