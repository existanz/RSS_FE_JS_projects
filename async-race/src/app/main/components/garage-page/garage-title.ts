import DOMElement from '../../../shared/components/base-elements/dom-element';

export default class GarageTitle extends DOMElement {
  constructor(parentNode: HTMLElement, totalCount: number) {
    super(parentNode, 'h2', ['garage__title'], `Garage (${totalCount})`);
  }

  public update(totalCount: number) {
    this.node.textContent = `Garage (${totalCount})`;
  }
}
