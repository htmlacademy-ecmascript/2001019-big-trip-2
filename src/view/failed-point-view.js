import AbstractView from '../framework/view/abstract-view.js';

function createNoPointTemplate() {
  return (
    `<p class="trip-events__msg">
      Failed to load latest route information
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
