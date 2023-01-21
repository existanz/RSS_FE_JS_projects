import './garage.scss';
import Page from '../../../shared/components/page';
import stateService from '../../../shared/services/state.service';
//import garageApi from '../../services/api/garage-api';
import CarElement from '../../components/car-element';
import GaragePanel from '../../components/garage-panel';
import GarageTitle from '../../components/garage-title';
import Paginator from '../../../shared/components/paginator';

export default class GaragePage extends Page {
  private garagePanel: GaragePanel;

  private garageTitle: GarageTitle;

  private paginator: Paginator;

  constructor() {
    super('garage');
    this.garagePanel = new GaragePanel(this.node);
    this.garageTitle = new GarageTitle(this.node, 0);
    this.paginator = new Paginator(this.node, 40);
  }

  render() {
    this.node.innerHTML = '';
    this.node.append(this.garagePanel.node);
    this.node.append(this.garageTitle.node);
    stateService.allData.forEach((item) => {
      const newCar = new CarElement(this.node, item);
      newCar.render();
    });
    this.paginator.update(43);
    this.node.append(this.paginator.node);
  }
}
