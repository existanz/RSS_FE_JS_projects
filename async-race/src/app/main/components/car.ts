import DOMElement from '../../shared/components/base-elements/dom-element';
import { Car } from '../../shared/models/basse-types';

export default class CarElement extends DOMElement {
  private car: Car;

  constructor(parentNode: HTMLElement, car: Car) {
    super(parentNode, 'div', ['car__element', `carId=${car.id}`]);

    this.car = car;
  }
}
