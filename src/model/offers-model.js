export default class OffersModel {
  #offers = [];
  #pointsApiService = null;

  constructor({pointsApiService}) {
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    try {
      this.#offers = await this.#pointsApiService.offers;
    } catch(err) {
      this.#offers = [];
    }

    return this.#offers;
  }

  getOffers() {
    return [...this.#offers];
  }
}
