import DOMElement from '../../../shared/components/base-elements/dom-element';
import { Car } from '../../../shared/models/basse-types';
import CarPanel from './car-panel';
import CarTrack from './car-track';

export default class CarElement extends DOMElement {
  private car: Car;

  private carPanel: CarPanel;

  private carTrack: CarTrack;

  constructor(parentNode: HTMLElement, car: Car) {
    super(parentNode, 'div', ['car__element', `carId=${car.id}`]);

    this.car = car;
    this.carPanel = new CarPanel(this.node, car);
    this.carTrack = new CarTrack(this.node, car);
  }

  public render() {
    this.carTrack.update(this.car);
  }
}
