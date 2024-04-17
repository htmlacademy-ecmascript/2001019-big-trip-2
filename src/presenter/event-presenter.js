import EventListView from '../view/event-list-view.js';
import TripFilterView from '../view/trip-filter-view.js';
import TripSortView from '../view/trip-sort-view.js';
import EventListItemView from '../view/event-list-item-view.js';
import AddNewPointFormView from '../view/add-new-point-form-view.js';
import EditPointFormView from '../view/edit-point-form-view.js';
import {render} from '../render.js';


const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

export default class EventPresenter {
  eventListComponent = new EventListView();
  constructor({eventContainer}) {
    this.eventContainer = eventContainer;
  }
  init() {
    render(new TripFilterView(), tripFiltersElement);
    render(new TripSortView(), tripEventsElement);
    render(this.eventListComponent, tripEventsElement);
    render(new AddNewPointFormView(), this.eventListComponent.getElement());
    render(new EditPointFormView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventListItemView(), this.eventListComponent.getElement());
    }
  }
}
