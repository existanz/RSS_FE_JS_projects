import DOMElement from '../../../shared/components/base-elements/dom-element';
import { Car } from '../../../shared/models/basse-types';
import CarPanel from './car-panel';
import CarTrack from './car-track';

export default class CarElement extends DOMElement {
  public car: Car;

  private carPanel: CarPanel;

  private carTrack: CarTrack;

  constructor(parentNode: HTMLElement, car: Car) {
    super(parentNode, 'div', ['car__element', `carId=${car.id}`]);

    this.car = car;
    this.carPanel = new CarPanel(this.node, car);
    this.carTrack = new CarTrack(this.node, car);
    this.carPanel.buttonStart.node.addEventListener('click', () => {
      if (!this.carPanel.buttonStart.disabled) {
        this.startRacer();
      }
    });
    this.carPanel.buttonStop.node.addEventListener('click', () => {
      if (!this.carPanel.buttonStop.disabled) {
        this.stopRacer();
      }
    });
  }

  public render() {
    this.carTrack.update(this.car);
  }

  public startRacer() {
    this.carPanel.buttonStart.disabled = true;
    this.carPanel.buttonStop.disabled = false;
    this.carTrack.startRacer();
  }

  public stopRacer() {
    this.carPanel.buttonStop.disabled = true;
    this.carPanel.buttonStart.disabled = false;
    this.carTrack.stopRacer();
  }
}
