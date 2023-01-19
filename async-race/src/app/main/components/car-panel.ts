import DOMElement from '../../shared/components/base-elements/dom-element';

export default class CarPanel extends DOMElement {
  private panelTop: DOMElement;

  private panelBottom: DOMElement;

  private buttonSelect: DOMElement;

  private buttonDelete: DOMElement;

  private buttonStart: DOMElement;

  private buttonStop: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['car__panel']);

    this.panelTop = new DOMElement(this.node, 'div', ['car__panel-first']);
    this.buttonSelect = new DOMElement(
      this.panelTop.node,
      'div',
      ['button', 'car__button', 'car__button-select'],
      'select'
    );
    this.buttonDelete = new DOMElement(
      this.panelTop.node,
      'div',
      ['button', 'car__button', 'car__button-delete'],
      'delete'
    );
    this.panelBottom = new DOMElement(this.node, 'div', ['car__panel-second']);
    this.buttonStart = new DOMElement(
      this.panelBottom.node,
      'div',
      ['button', 'car__button', 'car__button-start'],
      'start'
    );
    this.buttonStop = new DOMElement(
      this.panelBottom.node,
      'div',
      ['button', 'car__button', 'car__button-stop'],
      'stop'
    );
  }
}
