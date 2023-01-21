import './garage.scss';
import Page from '../../../shared/components/page';
import stateService from '../../../shared/services/state.service';
//import garageApi from '../../services/api/garage-api';
import CarElement from '../../components/car-element';
import GaragePanel from '../../components/garage-panel';
import GarageTitle from '../../components/garage-title';

export default class GaragePage extends Page {
  private garagePanel: GaragePanel;

  private garageTitle: GarageTitle;

  constructor() {
    super('garage');
    this.garagePanel = new GaragePanel(this.node);
    this.garageTitle = new GarageTitle(this.node, 0);
  }

  render() {
    this.node.innerHTML = '';
    this.garagePanel = new GaragePanel(this.node);
    this.garageTitle = new GarageTitle(this.node, 100);
    stateService.allData.forEach((item) => {
      const newCar = new CarElement(this.node, item);
      newCar.render();
    });
  }
}
