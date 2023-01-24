import CarElement from '../../main/components/garage-page/car-element';
import { Car, MyObject, Winner } from '../models/basse-types';

class State {
  public winnersState: Winner[];

  public carsState: Car[];

  public carElements: CarElement[];

  public selectedCar: Car;

  public raceRezults: MyObject[];

  constructor() {
    this.winnersState = [];
    this.carsState = [];
    this.carElements = [];
    this.raceRezults = [];
    this.selectedCar = { id: '', name: '', color: '' };
  }
}

const stateService = new State();
export default stateService;
