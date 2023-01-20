import DOMElement from '../../shared/components/base-elements/dom-element';
import InputElement from '../../shared/components/base-elements/input-element';

export default class GaragePanel extends DOMElement {
  private carPropPanel: DOMElement;

  private carNameInput: InputElement;

  private carColorInput: InputElement;

  private createButton: DOMElement;

  private updateButton: DOMElement;

  private racePanel: DOMElement;

  private raceButton: DOMElement;

  private resetButton: DOMElement;

  private generateButton: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['garage__panel']);

    this.carPropPanel = new DOMElement(this.node, 'div', ['garage__panel-car']);
    this.carNameInput = new InputElement(this.carPropPanel.node, ['input', 'input__car-name'], '');
    this.carColorInput = new InputElement(this.carPropPanel.node, ['input', 'input__car-color'], '');
    this.createButton = new DOMElement(this.carPropPanel.node, 'button', ['button', 'button__create'], 'create');
    this.updateButton = new DOMElement(this.carPropPanel.node, 'button', ['button', 'button__update'], 'update');
    this.racePanel = new DOMElement(this.node, 'div', ['garage__panel-race']);
    this.raceButton = new DOMElement(this.racePanel.node, 'button', ['button', 'button__race'], 'race');
    this.resetButton = new DOMElement(this.racePanel.node, 'button', ['button', 'button__reset'], 'reset');
    this.generateButton = new DOMElement(this.racePanel.node, 'button', ['button', 'button__generate'], 'generate');
  }
}
