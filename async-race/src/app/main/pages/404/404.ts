import Page from '../../../shared/components/page';

export default class NotFoundPage extends Page {
  constructor() {
    super('404');
    this.node.textContent = '404 Page';
  }
}
