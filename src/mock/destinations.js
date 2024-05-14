import {getRandomArrayElement} from '../utils.js';

export const mockDestinations = [
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01abcde',
    description: 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    name: 'Athens',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=1',
        description: 'Athens parliament building'
      }
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcba',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    name: 'Delhi',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=2',
        description: 'Delhi parliament building'
      },
      {
        src: 'https://loremflickr.com/248/152?random=3',
        description: 'Delhi parliament building'
      },
      {
        src: 'https://loremflickr.com/248/152?random=4',
        description: 'Delhi parliament building'
      }
    ]
  },
];

function getRandomDestination() {
  return getRandomArrayElement(mockDestinations);
}

function getDestinationById(id) {
  return mockDestinations.find((destItem) => destItem.id === id);
}

export {getRandomDestination, getDestinationById};
