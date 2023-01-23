import DOMElement from '../../../shared/components/base-elements/dom-element';
import SVGicons from '../../../shared/components/svg-icons';

export default class CarRaser extends DOMElement {
  constructor(parentNode: HTMLElement, color: string) {
    super(parentNode, 'div', ['car__racer']);
    this.node.style.fill = color;
    this.node.innerHTML = SVGicons.racer;
  }

  public update(color: string) {
    this.node.style.fill = color;
  }
}
