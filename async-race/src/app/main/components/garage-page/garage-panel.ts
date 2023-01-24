import ButtonElement from '../../../shared/components/base-elements/button-element';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import InputElement from '../../../shared/components/base-elements/input-element';
import stateService from '../../../shared/services/state.service';
import garageApi from '../../services/api/garage-api';
import GarageService from '../../services/garage-service';

export default class GaragePanel extends DOMElement {
  private garageService: GarageService = new GarageService();

  private carPropPanel: DOMElement;

  private carNameInput: InputElement;

  private carColorInput: InputElement;

  private createButton: ButtonElement;

  private updateButton: ButtonElement;

  private racePanel: DOMElement;

  public raceButton: ButtonElement;

  public resetButton: ButtonElement;

  private generateButton: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['garage__panel']);

    this.carPropPanel = new DOMElement(this.node, 'div', ['garage__panel-car']);
    this.carNameInput = new InputElement(this.carPropPanel.node, ['input', 'input__car-name'], '');
    this.carNameInput.node.addEventListener('change', (ev) => {
      this.carNameInput.value = this.garageService.translitCarName(
        (ev.target as HTMLInputElement).value.replace(/[^a-zа-яё0-9\s]/gi, '')
      );
    });
    this.carColorInput = new InputElement(this.carPropPanel.node, ['input', 'input__car-color'], '');
    this.carColorInput.node.addEventListener('change', (ev) => {
      this.carColorInput.value = (ev.target as HTMLInputElement).value;
    });
    this.carColorInput.node.setAttribute('type', 'color');
    this.createButton = new ButtonElement(
      this.carPropPanel.node,
      ['button', 'button__updater', 'button__create'],
      'create'
    );
    this.createButton.node.addEventListener('click', () => {
      if (this.carNameInput.value) {
        garageApi.createCar({ name: this.carNameInput.value, color: this.carColorInput.value });
        this.clear();
      }
    });
    this.updateButton = new ButtonElement(
      this.carPropPanel.node,
      ['button', 'button__updater', 'button__update'],
      'update'
    );
    this.updateButton.node.addEventListener('click', () => {
      if (!this.updateButton.disabled) {
        garageApi.updateCar({
          name: this.carNameInput.value,
          color: this.carColorInput.value,
          id: stateService.selectedCar.id,
        });
        this.clear();
      }
    });
    this.racePanel = new DOMElement(this.node, 'div', ['garage__panel-race']);
    this.raceButton = new ButtonElement(this.racePanel.node, ['button', 'button__race'], 'race');
    this.resetButton = new ButtonElement(this.racePanel.node, ['button', 'button__reset'], 'reset');
    this.generateButton = new ButtonElement(
      this.racePanel.node,
      ['button', 'button__updater', 'button__generate'],
      'generate 100 cars'
    );
    this.generateButton.node.addEventListener('click', () => {
      for (let i = 0; i < 100; i++) {
        const car = this.garageService.generateCar();
        garageApi.createCar({ name: car.name, color: car.color });
      }
      this.clear();
    });
    this.clear();
  }

  public updateSel() {
    this.updateButton.disabled = stateService.selectedCar.id == '0';
    this.carNameInput.value = stateService.selectedCar.name;
    this.carColorInput.value = stateService.selectedCar.color;
  }

  public clear() {
    stateService.selectedCar = { id: '0', name: '', color: '#000000' };
    this.updateButton.disabled = true;
    this.carNameInput.value = '';
    this.carColorInput.value = '#000000';
  }
}
