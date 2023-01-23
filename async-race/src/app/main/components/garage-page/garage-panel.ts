import ButtonElement from '../../../shared/components/base-elements/button-element';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import InputElement from '../../../shared/components/base-elements/input-element';

export default class GaragePanel extends DOMElement {
  private carPropPanel: DOMElement;

  private carNameInput: InputElement;

  private carColorInput: InputElement;

  private createButton: ButtonElement;

  private updateButton: ButtonElement;

  private racePanel: DOMElement;

  private raceButton: ButtonElement;

  private resetButton: ButtonElement;

  private generateButton: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['garage__panel']);

    this.carPropPanel = new DOMElement(this.node, 'div', ['garage__panel-car']);
    this.carNameInput = new InputElement(this.carPropPanel.node, ['input', 'input__car-name'], '');
    this.carColorInput = new InputElement(this.carPropPanel.node, ['input', 'input__car-color'], '');
    this.carColorInput.node.setAttribute('type', 'color');
    this.createButton = new ButtonElement(this.carPropPanel.node, ['button', 'button__create'], 'create');
    this.updateButton = new ButtonElement(this.carPropPanel.node, ['button', 'button__update'], 'update');
    this.racePanel = new DOMElement(this.node, 'div', ['garage__panel-race']);
    this.raceButton = new ButtonElement(this.racePanel.node, ['button', 'button__race'], 'race');
    this.resetButton = new ButtonElement(this.racePanel.node, ['button', 'button__reset'], 'reset');
    this.generateButton = new ButtonElement(this.racePanel.node, ['button', 'button__generate'], 'generate 100 cars');
  }
}
