import DOMElement from '../../../shared/components/base-elements/dom-element';

export default class WinnersTitle extends DOMElement {
  constructor(parentNode: HTMLElement, totalCount: number) {
    super(parentNode, 'h2', ['winners__title'], `Winners (${totalCount})`);
  }

  public update(totalCount: number) {
    this.node.textContent = `Winners (${totalCount})`;
  }
}
