import './garage.scss';
import Page from '../../../shared/components/page';
import garageApi from '../../services/api/garage-api';
import CarElement from '../../components/car-element';
import GaragePanel from '../../components/garage-panel';
import GarageTitle from '../../components/garage-title';
import Paginator from '../../../shared/components/paginator';
import { Car } from '../../../shared/models/basse-types';

export default class GaragePage extends Page {
  private garagePanel: GaragePanel;

  private garageTitle: GarageTitle;

  private paginator: Paginator;

  constructor() {
    super('garage');
    this.garagePanel = new GaragePanel(this.node);
    this.garageTitle = new GarageTitle(this.node, 4);
    this.paginator = new Paginator(this.node, 4, 7);
    this.node.addEventListener('click', () => this.render());
  }

  public async render() {
    const data = await garageApi.getCars(this.paginator.paginator);
    this.node.innerHTML = '';
    this.node.append(this.garagePanel.node);
    this.node.append(this.garageTitle.node);
    data.items.forEach((element) => {
      const car: Car = element as Car;
      const newCar = new CarElement(this.node, car);
      newCar.render();
    });
    this.paginator.update(data.total);
    this.garageTitle.update(data.total);
    this.node.append(this.paginator.node);
  }
}
