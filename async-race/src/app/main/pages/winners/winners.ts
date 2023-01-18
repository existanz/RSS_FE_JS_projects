import './winners.scss';

import Page from '../../../shared/components/page';

export default class WinnersPage extends Page {
  constructor() {
    super('winners');
    this.node.textContent = 'Winners Page';
  }
}
