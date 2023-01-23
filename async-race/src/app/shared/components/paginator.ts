import { MyObject } from '../models/basse-types';
import ButtonElement from './base-elements/button-element';
import DOMElement from './base-elements/dom-element';

export default class Paginator extends DOMElement {
  public paginator: MyObject;

  private totalCount: number;

  private curPage: number;

  private prevButton: ButtonElement;

  private pageNum: DOMElement;

  private nextButton: ButtonElement;

  constructor(parentNode: HTMLElement, totalCount: number, limit: number) {
    super(parentNode, 'div', ['paginator']);

    this.totalCount = totalCount;
    this.paginator = { _limit: '7', _page: '1' };
    this.paginator._limit = limit?.toString();
    this.curPage = parseInt(this.paginator._page);
    this.prevButton = new ButtonElement(this.node, ['button', 'paginator__button', 'paginator__button-prev'], '<');
    this.prevButton.node.addEventListener('click', () => {
      if (!this.prevButton.disabled && this.curPage > 1) this.curPage--;
      this.update(this.totalCount);
    });
    this.pageNum = new DOMElement(this.node, 'label', ['paginator__page-number'], this.paginator._page);
    this.nextButton = new ButtonElement(this.node, ['button', 'paginator__button', 'paginator__button-next'], '>');
    this.nextButton.node.addEventListener('click', () => {
      if (!this.nextButton.disabled && this.curPage < Math.ceil(this.totalCount / parseInt(this.paginator._limit))) {
        this.curPage++;
        this.update(this.totalCount);
      }
    });
    this.update(totalCount);
  }

  public update(totalCount: number) {
    this.totalCount = totalCount;
    this.paginator._page = this.curPage.toString();
    this.pageNum.node.textContent = this.paginator._page;
    this.prevButton.disabled = this.curPage == 1;
    this.nextButton.disabled = totalCount < parseInt(this.paginator._limit) * this.curPage;
  }
}
