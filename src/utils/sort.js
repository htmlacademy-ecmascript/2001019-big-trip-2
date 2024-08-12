import dayjs from 'dayjs';

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function sortTimeDown(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);
  const d1 = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const d2 = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return weight ?? dayjs(-d1).diff(dayjs(-d2));
}

function sortPriceDown(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.basePrice, pointB.basePrice);

  return weight ?? pointB.basePrice - pointA.basePrice;
}

function sortDateDown(pointA, pointB) {
  const d1 = dayjs(pointA.dateFrom);
  const d2 = dayjs(pointB.dateFrom);

  return d1 - d2;
}

export {sortTimeDown, sortPriceDown, sortDateDown};
