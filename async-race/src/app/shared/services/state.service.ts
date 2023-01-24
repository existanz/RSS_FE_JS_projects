import CarElement from '../../main/components/garage-page/car-element';
import { Car, Winner } from '../models/basse-types';

class State {
  public winnersState: Winner[];

  public carsState: Car[];

  public carElements: CarElement[];

  public selectedCar: Car;

  constructor() {
    this.winnersState = [];
    this.carsState = [];
    this.carElements = [];
    this.selectedCar = { id: '', name: '', color: '' };
  }
}

const stateService = new State();
export default stateService;
