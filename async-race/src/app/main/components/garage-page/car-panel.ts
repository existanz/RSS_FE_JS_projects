import ButtonElement from '../../../shared/components/base-elements/button-element';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import { Car } from '../../../shared/models/basse-types';
import stateService from '../../../shared/services/state.service';
import garageApi from '../../services/api/garage-api';
import winnersApi from '../../services/api/winners-api';

export default class CarPanel extends DOMElement {
  private panelTop: DOMElement;

  private buttonSelect: DOMElement;

  private buttonDelete: DOMElement;

  private panelBottom: DOMElement;

  public buttonStart: ButtonElement;

  public buttonStop: ButtonElement;

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
    this.buttonSelect.node.addEventListener('click', () => (stateService.selectedCar = car));
    this.buttonDelete = new DOMElement(
      this.panelTop.node,
      'button',
      ['button', 'car__button', 'car__button-delete'],
      'delete'
    );
    this.buttonDelete.node.addEventListener('click', () => {
      garageApi.deleteCar(car.id);
      winnersApi.deleteWinner(car.id);
    });
    this.panelBottom = new DOMElement(this.node, 'div', ['car__panel-second']);
    this.buttonStart = new ButtonElement(
      this.panelBottom.node,
      ['button', 'car__button', 'car__button-start'],
      'start'
    );
    this.buttonStop = new ButtonElement(this.panelBottom.node, ['button', 'car__button', 'car__button-stop'], 'stop');
    this.buttonStop.disabled = true;
    this.labelCar = new DOMElement(this.panelBottom.node, 'label', ['car__name'], car.name);
  }
}
