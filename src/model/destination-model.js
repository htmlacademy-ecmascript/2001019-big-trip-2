export default class DestinationModel {
  #destinations = [];
  #pointsApiService = null;

  constructor({pointsApiService}) {
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    try {
      this.#destinations = await this.#pointsApiService.destinations;
    } catch(err) {
      this.#destinations = [];
    }

    return this.#destinations;
  }

  getDestinations() {
    return [...this.#destinations];
  }
}
