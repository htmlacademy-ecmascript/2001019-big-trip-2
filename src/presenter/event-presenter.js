import {remove, render} from '../framework/render';
import TripSortView from '../view/trip-sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter';
import LoadingView from '../view/loading-view.js';
import {filter} from '../utils/filter';
import {sortTimeDown, sortPriceDown, sortDateDown} from '../utils/sort.js';
import {FilterType, SortType, UpdateType, UserAction} from '../const.js';
import {RenderPosition} from '../render';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
//удалить наноайди

const TimeLimit = { //BlockerTimeLimits
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class EventPresenter {
  #siteMainElement = null;
  #pointsModel = null;
  #filterModel = null;
  #destinationModel = null;
  #offersModel = null;
  #tripEventListElement = null;
  #noPointComponent = null;
  #sortComponent = null;
  #loadingComponent = new LoadingView();
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #onNewPointDestroy = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({siteMainElement, pointsModel, destinationModel, offersModel, tripEventListElement, filterModel, onNewPointDestroy}) {
    this.#siteMainElement = siteMainElement;
    this.#pointsModel = pointsModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#tripEventListElement = tripEventListElement;
    this.#filterModel = filterModel;
    this.#onNewPointDestroy = onNewPointDestroy;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#tripEventListElement,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
      onCancelClick: this.#handleCancelClick,
      destinations: this.#destinationModel.getDestinations(),
      offers: this.#offersModel.getOffers()
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortDateDown);
      case SortType.PRICE:
        return filteredPoints.sort(sortPriceDown);
      case SortType.TIME:
        return filteredPoints.sort(sortTimeDown);
    }

    return filteredPoints;
  }

  init() {
    this.destinations = this.#destinationModel.getDestinations();
    this.offers = this.#offersModel.getOffers();

    this.#renderList();
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#siteMainElement.querySelector('.trip-events'), RenderPosition.AFTERBEGIN);
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearList({});
        this.#renderList();
        break;
      case UpdateType.MAJOR:
        this.#clearList({resetSortType: true});
        this.#renderList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#newPointPresenter = new NewPointPresenter({
          pointListContainer: this.#tripEventListElement,
          onDataChange: this.#handleViewAction,
          onDestroy: this.#onNewPointDestroy,
          onCancelClick: this.#handleCancelClick,
          destinations: this.#destinationModel.getDestinations(),
          offers: this.#offersModel.getOffers()
        });
        this.#renderList();
        break;
    }
  };

  #handleCancelClick = () => {
    this.#newPointPresenter.destroy();
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearList({});
    this.#renderList();
  };

  #renderSort() {
    this.#sortComponent = new TripSortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType,
    });
    render(this.#sortComponent, this.#siteMainElement.querySelector('.trip-events__trip-sort-container'));
  }

  #renderNoPointComponent() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType
    });

    render(this.#noPointComponent, this.#siteMainElement.querySelector('.trip-events'));
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      tripEventListElement: this.#tripEventListElement,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      destinations: this.#destinationModel.getDestinations(),
      offers: this.#offersModel.getOffers()
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);

    return pointPresenter.point;
  }

  #clearList({resetSortType = false}) {

    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#loadingComponent);
    remove(this.#sortComponent);
    remove(this.#noPointComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderList() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPointComponent();
      return;
    }

    this.#renderSort();

    for (let i = 0; i < points.length; i++) {
      render(this.#renderPoint(points[i]), this.#tripEventListElement);
    }

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }
  }
}


