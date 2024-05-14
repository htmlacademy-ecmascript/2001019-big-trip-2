export const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 'fde78ca7-d63b-4ce5-9f16-a71cbf813e4d',
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: '35a18a18-3b7d-493e-aaa8-d0959a71a9cb',
        title: 'Choose the radio station',
        price: 25
      },
      {
        id: '326fd06d-88b6-4c4e-9a31-c97359e44cf4',
        title: 'Choose temperature',
        price: 10
      },
      {
        id: 'f747551d-a797-4340-93f5-c3d1a27fe5ca',
        title: 'Drive quickly',
        price: 150
      },
      {
        id: '22bb3eb9-899c-4a77-a4e5-e97fd448327a',
        title: 'Drive slowly',
        price: 150
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: '0195da48-b7ce-44c6-9611-5ba981dd3044',
        title: 'Nunc fermentum tortor ac porta',
        price: 500
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: '20dce4cd-0640-4c39-bb87-44f8eb3251d3',
        title: 'Aliquam erat volutpat',
        price: 250
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: '755d026a-8974-4077-a873-9ab5af76e049',
        title: 'Test offer',
        price: 130
      }
    ]
  },
];

function getAvailableOffers(type) {
  const offerItems = mockOffers.find((offer) => offer.type === type);

  if (!offerItems) {
    return [];
  }

  return offerItems.offers;
}

export {getAvailableOffers};
