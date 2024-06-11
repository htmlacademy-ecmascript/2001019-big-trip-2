import {mockDestinations} from '../mock/destinations.js';

export default class DestinationModel {
  #destination = mockDestinations;

  getDestination() {
    return [...this.#destination];
  }
}
