import DOMElement from './base-elements/dom-element';

export default class Page extends DOMElement {
  private id: string;

  constructor(id: string) {
    super(null, 'div', [id]);
    this.id = id;
    this.node.setAttribute('id', id);
  }
}
