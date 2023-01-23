import DOMElement from '../../../shared/components/base-elements/dom-element';
import { Car } from '../../../shared/models/basse-types';
import garageApi from '../../services/api/garage-api';

export default class CarPanel extends DOMElement {
  private panelTop: DOMElement;

  private buttonSelect: DOMElement;

  private buttonDelete: DOMElement;

  private panelBottom: DOMElement;

  private buttonStart: DOMElement;

  private buttonStop: DOMElement;

  private labelCar: DOMElement;

  constructor(parentNode: HTMLElement, car: Car) {
    super(parentNode, 'div', ['car__panel']);

    this.panelTop = new DOMElement(this.node, 'div', ['car__panel-first']);
    this.buttonSelect = new DOMElement(
      this.panelTop.node,
      'button',
      ['button', 'car__button', 'car__button-select'],
      'select'
    );
    this.buttonDelete = new DOMElement(
      this.panelTop.node,
      'button',
      ['button', 'car__button', 'car__button-delete'],
      'delete'
    );
    this.buttonDelete.node.addEventListener('click', () => garageApi.deleteCar(car.id));
    this.panelBottom = new DOMElement(this.node, 'div', ['car__panel-second']);
    this.buttonStart = new DOMElement(
      this.panelBottom.node,
      'button',
      ['button', 'car__button', 'car__button-start'],
      'start'
    );
    this.buttonStop = new DOMElement(
      this.panelBottom.node,
      'button',
      ['button', 'car__button', 'car__button-stop'],
      'stop'
    );
    this.labelCar = new DOMElement(this.panelBottom.node, 'label', ['car__name'], car.name);
  }
}
