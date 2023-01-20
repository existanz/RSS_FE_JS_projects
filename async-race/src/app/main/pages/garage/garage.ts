import './garage.scss';
import Page from '../../../shared/components/page';
import stateService from '../../../shared/services/state.service';
import garageApi from '../../services/api/garage-api';
import CarElement from '../../components/car';
import GaragePanel from '../../components/garage-panel';

export default class GaragePage extends Page {
  private garagePanel: GaragePanel;

  constructor() {
    super('garage');
  }

  render() {
    this.node.innerHTML = '';
    this.garagePanel = new GaragePanel(this.node);
    stateService.allData.forEach((item) => {
      const newCar = new CarElement(this.node, item);
    });
  }
}
