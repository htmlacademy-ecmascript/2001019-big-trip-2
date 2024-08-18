export default class DestinationModel {
  #destinations = [];
  #pointsApiService = null;

  constructor({pointsApiService}) {
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    this.#destinations = await this.#pointsApiService.destinations;
  }

  getDestinations() {
    return [...this.#destinations];
  }
}
