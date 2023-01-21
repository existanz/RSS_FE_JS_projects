import DOMElement from '../../shared/components/base-elements/dom-element';
import SVGicons from '../../shared/components/svg-icons';
import { Car } from '../../shared/models/basse-types';

export default class CarRaser extends DOMElement {
  constructor(parentNode: HTMLElement, car: Car) {
    super(parentNode, 'div', ['car__racer']);
    this.node.style.fill = car.color;
    this.node.innerHTML = SVGicons.racer;
  }

  public update(car: Car) {
    this.node.style.fill = car.color;
  }
}
