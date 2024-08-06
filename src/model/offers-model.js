import {mockOffers} from '../mock/offers.js';

function getAvailableOffers(type) {
  const offerItems = mockOffers.find((offer) => offer.type === type);

  if (!offerItems) {
    return [];
  }

  return offerItems.offers;
}
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
  }

  getOffers() {
    return [...this.#offers];
  }
}


export {getAvailableOffers};
