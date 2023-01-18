import './footer.scss';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import LinkElement from '../../../shared/components/base-elements/link-element';
import SVGicons from '../../../shared/components/svg-icons';

export default class Footer extends DOMElement {
  private container: DOMElement;

  private footerLinx: DOMElement;

  private year: DOMElement;

  private footerSchoolLogo: DOMElement;

  private gitHub: LinkElement;

  private githubUser: DOMElement;

  private rsschool: LinkElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'footer', ['footer']);

    this.container = new DOMElement(this.node, 'div', ['container', 'footer__container']);

    this.footerLinx = new DOMElement(this.container.node, 'div', ['footer-links']);

    this.gitHub = new LinkElement(this.footerLinx.node, ['footer-links__item'], 'https://github.com/EXisTAnZ');
    this.gitHub.node.innerHTML = SVGicons.github;
    this.githubUser = new DOMElement(this.gitHub.node, 'div', ['footer-links__text'], 'Magomed Oziev');

    this.year = new DOMElement(this.container.node, 'p', ['footer__year'], '2023');

    this.footerSchoolLogo = new DOMElement(this.container.node, 'div', ['footer__shcool-logo']);
    this.rsschool = new LinkElement(this.footerSchoolLogo.node, ['school-logo'], 'https://rs.school/');
    this.rsschool.node.innerHTML = SVGicons.rsschool;
  }
}
