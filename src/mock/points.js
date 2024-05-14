import {getRandomArrayElement} from '../utils';

export const mockPoints = [
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c',
    basePrice: 1100,
    dateFrom: '2019-09-10T22:22:56.845Z',
    dateTo: '2019-09-10T22:55:56.845Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    offers: [
      'fde78ca7-d63b-4ce5-9f16-a71cbf813e4d',
      '326fd06d-88b6-4c4e-9a31-c97359e44cf4',
    ],
    type: 'taxi'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808d',
    basePrice: 500,
    dateFrom: '2019-07-09T06:30:56.845Z',
    dateTo: '2019-07-11T21:10:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01abcde',
    isFavorite: true,
    offers: [],
    type: 'ship'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808e',
    basePrice: 111100,
    dateFrom: '2019-12-10T20:20:56.845Z',
    dateTo: '2019-12-11T11:10:45.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcba',
    isFavorite: true,
    offers: [
      '0195da48-b7ce-44c6-9611-5ba981dd3044'
    ],
    type: 'flight'
  },
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
