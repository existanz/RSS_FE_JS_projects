import './garage.scss';
import Page from '../../../shared/components/page';
import garageApi from '../../services/api/garage-api';
import CarElement from '../../components/garage-page/car-element';
import GaragePanel from '../../components/garage-page/garage-panel';
import GarageTitle from '../../components/garage-page/garage-title';
import Paginator from '../../../shared/components/paginator';
import stateService from '../../../shared/services/state.service';

export default class GaragePage extends Page {
  private garagePanel: GaragePanel;

  private garageTitle: GarageTitle;

  private paginator: Paginator;

  constructor() {
    super('garage');
    this.garagePanel = new GaragePanel(this.node);
    this.garageTitle = new GarageTitle(this.node, 4);
    this.paginator = new Paginator(this.node, 4, 7);
    this.node.addEventListener('click', (ev) => {
      const target = ev.target as HTMLElement;
      if (target.tagName == 'BUTTON' && target.classList.contains('button__updater')) {
        stateService.carElements = [];
        this.render();
      }
    });

    this.garagePanel.raceButton.node.addEventListener('click', () => {
      stateService.raceRezults = [];
      stateService.hasWinner = false;
      stateService.carElements.forEach((elem) => elem.startRacer());
    });

    this.garagePanel.resetButton.node.addEventListener('click', () => {
      stateService.carElements.forEach((elem) => elem.stopRacer());
      stateService.raceRezults = [];
    });
  }

  public async render() {
    const data = await garageApi.getCars(this.paginator.paginator);
    this.node.innerHTML = '';
    this.node.append(this.garagePanel.node);
    this.node.append(this.garageTitle.node);
    if (stateService.carElements.length < 1)
      stateService.carElements = data.items.map((car) => new CarElement(this.node, car));
    stateService.carElements.forEach((el) => this.node.append(el.node));
    this.paginator.update(data.total);
    this.garageTitle.update(data.total);
    this.node.append(this.paginator.node);
    this.garagePanel.updateSel();
  }
}
