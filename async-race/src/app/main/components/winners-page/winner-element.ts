import TableRowElement from '../../../shared/components/base-elements/table-row-element';
import { Car, Winner } from '../../../shared/models/basse-types';

export default class WinnerElement extends TableRowElement {
  constructor(parentNode: HTMLElement, num: number, winner: Winner, car: Car) {
    super(parentNode, [num.toString(), car.color, car.name, winner.wins, winner.time]);
  }
}
