import DOMElement from '../../../shared/components/base-elements/dom-element';
import SVGicons from '../../../shared/components/svg-icons';
import { Car } from '../../../shared/models/basse-types';
import CarRaser from './car-racer';

export default class CarTrack extends DOMElement {
  private car: Car;

  private carRacer: CarRaser;

  private carFlag: DOMElement;

  constructor(parentNode: HTMLElement, car: Car) {
    super(parentNode, 'div', ['car__track']);

    this.car = car;
    this.carRacer = new CarRaser(this.node, car.color);
    this.carFlag = new DOMElement(this.node, 'div', ['race__flag']);
    this.carFlag.node.innerHTML = SVGicons.flag;
  }

  public update(car: Car) {
    this.carRacer.update(car.color);
  }
}
