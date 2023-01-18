import DOMElement from './dom-element';

export default class LinkElement extends DOMElement {
  constructor(parentNode: HTMLElement | null, classList: string[] = [], href = '', content = '') {
    super(parentNode, 'a', classList, content);

    this.node.setAttribute('href', href);
    this.node.setAttribute('target', 'blank');
  }
}
