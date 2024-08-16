import AbstractView from '../framework/view/abstract-view.js';

function createNoPointTemplate() {

  const message = 'Failed to load latest route information';

  return (
    `<p class="trip-events__msg">
      ${message}
    </p>`
  );
}

export default class FailedPointView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createNoPointTemplate();
  }
}
