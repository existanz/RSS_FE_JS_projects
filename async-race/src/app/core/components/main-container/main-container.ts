import './main-container.scss';
import DOMElement from '../../../shared/components/base-elements/dom-element';

export default class Main extends DOMElement {
  private mainContainer: DOMElement;

  public container: HTMLElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'main', ['main']);

    this.mainContainer = new DOMElement(this.node, 'div', ['container', 'main__container']);
    this.container = this.mainContainer.node;
  }
}
