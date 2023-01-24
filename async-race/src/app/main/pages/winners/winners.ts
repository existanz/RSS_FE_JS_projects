import './winners.scss';
import Page from '../../../shared/components/page';
import { Winner } from '../../../shared/models/basse-types';
import WinnersTable from '../../components/winners-page/winner-table';
import WinnersTitle from '../../components/winners-page/winners-title';
import Paginator from '../../../shared/components/paginator';
import winnersApi from '../../services/api/winners-api';
import garageApi from '../../services/api/garage-api';

export default class WinnersPage extends Page {
  private winnersTitle: WinnersTitle;

  private winnersTable: WinnersTable;

  private paginator: Paginator;

  constructor() {
    super('winners');

    this.winnersTitle = new WinnersTitle(this.node, 10);
    this.winnersTable = new WinnersTable(this.node, [], []);
    this.paginator = new Paginator(this.node, 10, 10);
    this.node.addEventListener('click', () => this.render());
  }

  public async render() {
    const winnersData = await winnersApi.getWinners({ ...this.paginator.paginator, ...this.winnersTable.sortOptions });
    const cars = await Promise.all(winnersData.items.map((winner: Winner) => garageApi.getCar(winner.id)));
    this.node.innerHTML = '';
    this.winnersTitle.update(winnersData.total);
    this.node.append(this.winnersTitle.node);
    this.winnersTable.update(winnersData.items, cars.flat());
    this.node.append(this.winnersTable.node);
    this.paginator.update(winnersData.total);
    this.node.append(this.paginator.node);
  }
}
