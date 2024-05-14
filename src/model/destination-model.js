import {getRandomDestination} from '../mock/destinations.js';

const DESTINATION_COUNT = 1;

export default class DestinationModel {
  destination = Array.from({length: DESTINATION_COUNT}, getRandomDestination);

  getDestination() {
    return this.destination;
  }
}
