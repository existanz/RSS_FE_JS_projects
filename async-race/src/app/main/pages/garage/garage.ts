import Page from '../../../shared/components/page';

export default class GaragePage extends Page {
  constructor() {
    super('garage');
    this.node.textContent = 'Garaage Page';
  }
}
