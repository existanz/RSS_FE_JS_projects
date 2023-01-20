import Page from '../../../shared/components/page';
import stateService from '../../../shared/services/state.service';
import garageApi from '../../services/api/garage-api';
import CarElement from '../../components/car';

export default class GaragePage extends Page {
  constructor() {
    super('garage');
  }

  render() {
    this.node.innerHTML = '';
    stateService.allData.forEach((item) => {
      const newCar = new CarElement(this.node, item);
    });
  }
}
