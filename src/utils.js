import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'hh:mm';
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeEventDate(eventDate) {
  return eventDate ? dayjs(eventDate).format(DATE_FORMAT) : '';
}

function humanizeEventTime(eventTime) {
  return eventTime ? dayjs(eventTime).format(TIME_FORMAT) : '';
}

// function dateTimeDiffFormatted(durationMinutes) {
//   let minutes = durationMinutes % 60;
//   let hours = '00';
//   let days = '00';
//
//   if (durationMinutes >= 60) {
//     hours = Math.floor(durationMinutes / 60) % 24;
//   }
//
//   if (durationMinutes >= 60 * 24) {
//     days = Math.floor(durationMinutes / (60 * 24));
//   }
//
//   days = days > 0 ? `${(`00${ days}`).slice(-2) }D ` : '';
//   hours = hours > 0 ? `${(`00${ hours}`).slice(-2) }H ` : '';
//   minutes = minutes ? `${(`00${ minutes}`).slice(-2) }M ` : '';
//   //может быть использовать .format(DATE_FORMAT)
//
//   return `${days}${hours}${minutes}`;
// }

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

  days = days > 0 ? `${(`00${ days}`).slice(-2) }D ` : '';
  hours = hours > 0 ? `${(`00${ hours}`).slice(-2) }H ` : '';
  minutes = minutes ? `${(`00${ minutes}`).slice(-2) }M ` : '';

  return `${days}${hours}${minutes}`;
}

export {getRandomArrayElement, humanizeEventDate, humanizeEventTime, formatDuration};
