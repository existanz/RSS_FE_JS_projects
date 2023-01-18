import Page from '../../../shared/components/page';
import stateService from '../../../shared/services/state.service';

export default class GaragePage extends Page {
  constructor() {
    super('garage');
    this.node.textContent = `Garage`;
  }

  render() {
    this.node.textContent = stateService.allData.toString();
  }
}
