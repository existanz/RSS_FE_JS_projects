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
    const buttonStart = this.carPanel.buttonStart;
    const buttonStop = this.carPanel.buttonStop;
    buttonStart.node.addEventListener('click', () => {
      if (!buttonStart.disabled) {
        this.carTrack.startRacer();
        buttonStart.disabled = true;
        buttonStop.disabled = false;
      }
    });
    this.carPanel.buttonStop.node.addEventListener('click', () => {
      if (!buttonStop.disabled) {
        this.carTrack.stopRacer();
        buttonStart.disabled = false;
        buttonStop.disabled = true;
      }
    });
  }

  public render() {
    this.carTrack.update(this.car);
  }
}
