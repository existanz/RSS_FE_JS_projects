import { Car } from '../models/basse-types';

class State {
  public allData: [];

  public selectedCar: Car;

  constructor() {
    this.allData = [];
    this.selectedCar = { id: '', name: '', color: '' };
  }
}

const stateService = new State();
export default stateService;
