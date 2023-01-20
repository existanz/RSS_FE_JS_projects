import './header.scss';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import Navigation from './nav/nav';

export default class Header extends DOMElement {
  private container: DOMElement;

  private headerLogo: DOMElement;

  private nav: Navigation;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', ['header']);

    this.container = new DOMElement(this.node, 'div', ['container', 'header__container']);
    this.headerLogo = new DOMElement(this.container.node, 'h1', ['header__logo'], 'IThinkRace');
    this.nav = new Navigation(this.container.node);
  }
}
