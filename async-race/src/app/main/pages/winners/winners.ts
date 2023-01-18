import './winners.scss';

import Page from '../../../shared/components/page';

export default class WinnersPage extends Page {
  constructor() {
    super('winners');
    console.log('lalala');
    this.node.textContent = 'Winners Page';
  }
}
