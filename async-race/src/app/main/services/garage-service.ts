import { Car } from '../../shared/models/basse-types';
import converterMap from '../../shared/models/translit-map';
import Randomizer from './randomizer';

export default class GarageService {
  private randomizer: Randomizer;

  constructor() {
    this.randomizer = new Randomizer();
  }

  public generateCar(): Car {
    return { id: '0', name: this.randomizer.getRandomName(), color: this.randomizer.getRandomColor() };
  }

  public translitCarName(word: string): string {
    let answer = '';

    for (let i = 0; i < word.length; ++i) {
      if (converterMap[word[i]] == undefined) {
        answer += word[i];
      } else {
        answer += converterMap[word[i]];
      }
    }
    return answer;
  }
}
