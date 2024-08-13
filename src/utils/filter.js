import {FilterType} from '../const.js';
import dayjs from 'dayjs';

function isTaskExpired(dueDate) {
  return dueDate && dayjs().isAfter(dueDate, 'D');
}

function isTaskFuture(dueDate) {
  return dueDate && dayjs().isBefore(dueDate, 'D');
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isTaskFuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => !isTaskExpired(point.dateTo) && !isTaskFuture(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isTaskExpired(point.dateTo)),
};

export {filter};
