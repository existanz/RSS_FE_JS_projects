import DOMElement from '../../shared/components/base-elements/dom-element';
import { Car, Winner } from '../../shared/models/basse-types';

export default class WinnerElement extends DOMElement {
  constructor(parentNode: HTMLElement, num: number, winner: Winner, car: Car) {
    super(parentNode, 'tr');
    new DOMElement(this.node, 'td', [], num.toString());
    new DOMElement(this.node, 'td', [], car.color);
    new DOMElement(this.node, 'td', [], car.name);
    new DOMElement(this.node, 'td', [], winner.wins);
    new DOMElement(this.node, 'td', [], winner.time);
  }
}
