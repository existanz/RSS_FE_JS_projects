import { Car, Winner } from '../models/basse-types';

class State {
  public winnersState: Winner[];

  public carsState: Car[];

  public selectedCar: Car;

  constructor() {
    this.winnersState = [];
    this.carsState = [];
    this.selectedCar = { id: '', name: '', color: '' };
  }
}

const stateService = new State();
export default stateService;
