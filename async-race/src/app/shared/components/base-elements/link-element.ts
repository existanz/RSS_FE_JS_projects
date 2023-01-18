import DOMElement from './dom-element';

export default class LinkElement extends DOMElement {
  constructor(parentNode: HTMLElement | null, classList: string[] = [], content = '', href = '') {
    super(parentNode, 'a', classList, content);

    this.node.setAttribute('href', href);
    this.node.setAttribute('target', 'blank');
  }
}
