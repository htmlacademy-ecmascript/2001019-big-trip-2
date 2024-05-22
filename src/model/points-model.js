import {mockPoints} from '../mock/points.js';

export default class PointsModel {
  points = mockPoints;

  getPoints() {
    return this.points;
  }
}
