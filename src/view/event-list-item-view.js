import {createElement} from '../render';
import {dateTimeDiffFormatted, humanizeEventDate, humanizeEventTime} from '../utils.js';
import dayjs from 'dayjs';
import {getAvailableOffers} from '../mock/offers.js';
import {getDestinationById} from '../mock/destinations.js';
function createEventListItem(point) {
  const {basePrice, dateFrom, dateTo, destination, isFavorite, offers, type} = point;

  const date = humanizeEventDate(dateFrom);
  const timeFrom = humanizeEventTime(dateFrom);
  const timeTo = humanizeEventTime(dateTo);
  const durationMinutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minutes');
  const duration = dateTimeDiffFormatted(durationMinutes);
  const destinationItem = getDestinationById(destination);
  const favoriteClassName = isFavorite ?
    'event__favorite-btn event__favorite-btn--active' :
    'event__favorite-btn';

  const offerItems = getAvailableOffers(type).filter((offer) => offers.includes(offer.id));

  let offersBlock = '';

  if (offerItems.length > 0) {
    offersBlock = '<h4 class="visually-hidden">Offers:</h4><ul class="event__selected-offers">';

    for (const offerItem of offerItems) {
      offersBlock += `
         <li class="event__offer">
            <span class="event__offer-title">${offerItem.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offerItem.price}</span>
         </li>
      `;
    }

    offersBlock += '</ul>';
  }

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${date}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destinationItem.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T10:30">${timeFrom}</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T11:00">${timeTo}</time>
                  </p>
                  <p class="event__duration">${duration}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                ${offersBlock}
                <button class="${favoriteClassName}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}

export default class EventListItemView {
  constructor({point}) {
    this.point = point;
  }

  getTemplate() {
    return createEventListItem(this.point);
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
