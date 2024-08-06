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

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const EmptyPointMessage = {
  everything: 'Click New Event to create your first point',
  past: 'There are no past events now',
  present: 'There are no present events now',
  future: 'There are no future events now',
};

const SortType = {
  DAY: 'sort-day',
  EVENT: 'sort-event',
  TIME: 'sort-time',
  PRICE: 'sort-price',
  OFFERS: 'sort-offer',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export {EVENT_TYPES, FilterType, EmptyPointMessage, SortType, UserAction, UpdateType};
