import AbstractView from '../framework/view/abstract-view.js';
import {getDestinationById, mockDestinations} from '../mock/destinations.js';
import {EVENT_TYPES} from '../const.js';
import {getAvailableOffers} from '../model/offers-model.js';
function createEditPointForm({point}) {

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
                  ${EVENT_TYPES.map((eventType) => (`
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${eventType.name === point.type ? eventType.name : ''}
                    </label>
                  `)).join('')}
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${getDestinationById(point.destination).name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                    ${mockDestinations.map((destItem) => (`
                      <option value="${destItem.name}"></option>
                    `)).join('')}
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
                    ${offerItems.map((offerItem) => (`
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="${offerItem.id}"
                        ${point.offers.includes(offerItem.id) ? 'checked' : ''}>
                        <label class="event__offer-label" for="${offerItem.id}">
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
                  <p class="event__destination-description">${getDestinationById(point.destination).description}</p>
                </section>
              </section>
              </form>
            </li>`;
}

export default class EditPointFormView extends AbstractView {
  #point = null;
  #handleEditClick = null;
  constructor({point, onEditClick}) {
    super();
    this.#point = point;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event--edit')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createEditPointForm(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
