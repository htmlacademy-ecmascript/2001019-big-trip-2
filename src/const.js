import {getRandomArrayElement} from './utils.js';

const EVENT_TYPES = [
  {
    name: 'taxi',
    title: 'Taxi',
  },
  {
    name: 'bus',
    title: 'Bus',
  },
  {
    name: 'train',
    title: 'Train',
  },
  {
    name: 'ship',
    title: 'Ship',
  },
  {
    name: 'drive',
    title: 'Drive',
  },
  {
    name: 'flight',
    title: 'Flight',
  },
  {
    name: 'check-in',
    title: 'Check-in',
  },
  {
    name: 'sightseeing',
    title: 'Sightseeing',
  },
  {
    name: 'restaurant',
    title: 'Restaurant',
  },
];

function getEventTypes() {
  return EVENT_TYPES;
}

function getRandomEventType() {
  return getRandomArrayElement(EVENT_TYPES);
}

export {getEventTypes, getRandomEventType};
