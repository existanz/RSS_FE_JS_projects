import DOMElement from './dom-element';

export default class TableRowElement extends DOMElement {
  constructor(parentNode: HTMLElement, cells: string[]) {
    super(parentNode, 'tr');
    cells.forEach((el) => {
      new DOMElement(this.node, 'td', [], el);
    });
  }
}
