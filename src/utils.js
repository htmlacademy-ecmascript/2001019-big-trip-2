import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeEventDate(eventDate) {
  return eventDate ? dayjs(eventDate).format(DATE_FORMAT) : '';
}

function humanizeEventTime(eventTime) {
  return eventTime ? dayjs(eventTime).format(TIME_FORMAT) : '';
}

function formatDuration(durationMinutes) {
  let minutes = durationMinutes % 60;
  let hours = '00';
  let days = '00';

  if (durationMinutes >= 60) {
    hours = Math.floor(durationMinutes / 60) % 24;
  }

  if (durationMinutes >= 60 * 24) {
    days = Math.floor(durationMinutes / (60 * 24));
  }

  days = days > 0 ? `${(`${(days > 9 ? days : '0' + days)}`)}D ` : '';
  hours = `${(`00${ hours}`).slice(-2) }H `;
  minutes = `${(`00${ minutes}`).slice(-2) }M `;

  return `${days}${hours}${minutes}`;
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export {getRandomArrayElement, humanizeEventDate, humanizeEventTime, formatDuration, updateItem};
