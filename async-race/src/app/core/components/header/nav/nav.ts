import './nav.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import LinkElement from '../../../../shared/components/base-elements/link-element';

export default class Navigation {
  private list: DOMElement;

  private menuLinks = [
    {
      content: 'garage',
      href: '/#garage',
    },
    {
      content: 'winners',
      href: '/#winners',
    },
  ];

  constructor(parentNode: HTMLElement) {
    this.list = new DOMElement(parentNode, 'ul', ['nav']);

    this.menuLinks.map((el) => {
      const item = new DOMElement(this.list.node, 'li', ['nav__item']);
      const link = new LinkElement(item.node, ['nav__link'], el.href, el.content);
      return link.node.tabIndex;
    });
  }
}
