import { Car } from '../../shared/models/basse-types';
import Randomizer from './randomizer';

export default class GarageService {
  private randomizer: Randomizer;

  constructor() {
    this.randomizer = new Randomizer();
  }

  public generateCar(): Car {
    return { id: '0', name: this.randomizer.getRandomName(), color: this.randomizer.getRandomColor() };
  }
}
