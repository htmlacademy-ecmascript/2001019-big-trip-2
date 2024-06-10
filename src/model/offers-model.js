import {mockOffers} from '../mock/offers.js';

function getAvailableOffers(type) {
  const offerItems = mockOffers.find((offer) => offer.type === type);

  if (!offerItems) {
    return [];
  }

  return offerItems.offers;
}
export default class OffersModel {
  #offers = mockOffers;

  getOffers() {
    return [...this.#offers];
  }
}

export {getAvailableOffers};
