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
      console.log(target);
      if (
        target.tagName == 'BUTTON' &&
        !target.classList.contains('car__button-start') &&
        !target.classList.contains('car__button-stop')
      ) {
        stateService.carElements = [];
        this.render();
      }
    });
  }

  public async render() {
    const data = await garageApi.getCars(this.paginator.paginator);
    this.node.innerHTML = '';
    this.node.append(this.garagePanel.node);
    this.node.append(this.garageTitle.node);
    if (stateService.carElements.length < 7)
      stateService.carElements = data.items.map((car) => new CarElement(this.node, car));
    console.log(stateService.carElements);
    stateService.carElements.forEach((el) => this.node.append(el.node));
    this.paginator.update(data.total);
    this.garageTitle.update(data.total);
    this.node.append(this.paginator.node);
    this.garagePanel.updateSel();
  }
}
