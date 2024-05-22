export const mockDestinations = [
  {
    id: '40790a4f-e69a-425d-b9d7-bf3e31993508',
    description: 'Monaco - famous for its crowded street markets with the best street food in Asia',
    name: 'Monaco',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/4.jpg',
        description: 'Monaco in a middle of Europe'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/18.jpg',
        description: 'Monaco in a middle of Europe'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/5.jpg',
        description: 'Monaco middle-eastern paradise'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/5.jpg',
        description: 'Monaco a perfect place to stay with a family'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/12.jpg',
        description: 'Monaco with crowded streets'
      }
    ]
  },
  {
    id: 'e53dec72-b18b-4b04-a6a0-f05f02ddca48',
    description: 'Rome - a perfect place to stay with a family',
    name: 'Rome',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/8.jpg',
        description: 'Rome a perfect place to stay with a family'
      }
    ]
  },
  {
    id: '4c255f64-23df-4cdc-8153-6c7f95bb7bf6',
    description: 'Rotterdam - is a beautiful city',
    name: 'Rotterdam',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/18.jpg',
        description: 'Rotterdam with a beautiful old town'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/16.jpg',
        description: 'Rotterdam famous for its crowded street markets with the best street food in Asia'
      }
    ]
  },
  {
    id: '2b54ea67-6f96-418e-8e87-778211afbe3f',
    description: 'Madrid - a perfect place to stay with a family',
    name: 'Madrid',
    pictures: []
  },
  {
    id: '20d7f3ec-f6de-4f2f-bbe1-31f8a017bab1',
    description: '',
    name: 'Sochi',
    pictures: []
  },
  {
    id: '220da512-955d-4c34-8753-6e267d6773c4',
    description: 'Oslo - full of of cozy canteens where you can try the best coffee in the Middle East',
    name: 'Oslo',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/19.jpg',
        description: 'Oslo with a beautiful old town'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/13.jpg',
        description: 'Oslo for those who value comfort and coziness'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/14.jpg',
        description: 'Oslo is a beautiful city'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/11.jpg',
        description: 'Oslo is a beautiful city'
      }
    ]
  },
  {
    id: 'e0e1e01e-a2da-417e-bf4f-b6505a93694e',
    description: 'Barcelona - full of of cozy canteens where you can try the best coffee in the Middle East',
    name: 'Barcelona',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/3.jpg',
        description: 'Barcelona a true asian pearl'
      }
    ]
  },
  {
    id: 'd2e0c184-c9c0-4891-96e5-cc9ca8ab17b5',
    description: '',
    name: 'Munich',
    pictures: []
  },
  {
    id: '3b0e2445-d1d9-40b3-88a9-0a586be6866a',
    description: 'Den Haag - is a beautiful city',
    name: 'Den Haag',
    pictures: []
  },
  {
    id: '1213bb06-f35e-4e9c-bfad-8c8d552d4b27',
    description: 'Naples - full of of cozy canteens where you can try the best coffee in the Middle East',
    name: 'Naples',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/7.jpg',
        description: 'Naples a true asian pearl'
      }
    ]
  }
];

function getDestinationById(id) {
  return mockDestinations.find((destItem) => destItem.id === id);
}

export {getDestinationById};
