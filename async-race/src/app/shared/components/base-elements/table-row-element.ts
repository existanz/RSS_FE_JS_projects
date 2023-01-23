import SVGicons from '../svg-icons';
import DOMElement from './dom-element';

export default class TableRowElement extends DOMElement {
  constructor(parentNode: HTMLElement, cells: string[], isHead?: boolean) {
    super(parentNode, 'tr');
    cells.forEach((el) => {
      const cell = new DOMElement(this.node, isHead ? 'th' : 'td', [], el);
      if (el[0] == '#') {
        cell.node.style.fill = el;
        cell.node.innerHTML = SVGicons.racer;
      }
    });
  }
}
