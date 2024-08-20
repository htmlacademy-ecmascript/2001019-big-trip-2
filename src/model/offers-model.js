export default class OffersModel {
  #offers = [];
  #pointsApiService = null;

  constructor({pointsApiService}) {
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    this.#offers = await this.#pointsApiService.offers;
  }

  getOffers() {
    return [...this.#offers];
  }
}
