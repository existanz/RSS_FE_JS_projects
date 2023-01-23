import { carBrand, carModel } from '../../shared/models/car-names';

export default class Randomizer {
  private randomizer(array: string[]): string {
    const index: number = Math.floor(Math.random() * array.length);

    return array[index];
  }

  public getRandomName(): string {
    return `${this.randomizer(carBrand)} ${this.randomizer(carModel)}`;
  }

  public getRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}
