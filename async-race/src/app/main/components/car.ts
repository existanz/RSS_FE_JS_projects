import DOMElement from '../../shared/components/base-elements/dom-element';
import SVGicons from '../../shared/components/svg-icons';
import { Car } from '../../shared/models/basse-types';
import CarPanel from './car-panel';

export default class CarElement extends DOMElement {
  private car: Car;

  private carPanel: CarPanel;

  constructor(parentNode: HTMLElement, car: Car) {
    super(parentNode, 'div', ['car__element', `carId=${car.id}`]);

    this.car = car;
    this.node.innerHTML = SVGicons.racer;
    this.carPanel = new CarPanel(this.node);
  }
}
