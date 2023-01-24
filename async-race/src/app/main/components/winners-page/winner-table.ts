import DOMElement from '../../../shared/components/base-elements/dom-element';
import TableRowElement from '../../../shared/components/base-elements/table-row-element';
import { Car, MyObject, Winner } from '../../../shared/models/basse-types';

export default class WinnersTable extends DOMElement {
  public sortOptions: MyObject;

  private tableHead: DOMElement;

  private tableHeadRow: TableRowElement;

  private tableBody: DOMElement;

  constructor(parentNode: HTMLElement, winners: Winner[], cars: Car[]) {
    super(parentNode, 'table', ['winners__table']);

    const tableColumnNames = ['No', 'Car', 'Name', 'Wins', 'Best time'];

    this.sortOptions = { _sort: 'id', _order: 'ASC' };

    this.tableHead = new DOMElement(this.node, 'thead');
    this.tableHeadRow = new TableRowElement(this.tableHead.node, tableColumnNames, true);
    this.tableBody = new DOMElement(this.node, 'tbody');
    this.update(winners, cars);
  }

  public update(winners: Winner[], cars: Car[]) {
    this.tableBody.node.innerHTML = '';
    winners.forEach((winner, id) => {
      new TableRowElement(this.tableBody.node, [
        (id + 1).toString(),
        cars[id].color,
        cars[id].name,
        winner.wins,
        winner.time,
      ]);
    });
  }

  public changeSort(sortBy: string) {
    switch (sortBy) {
      case 'Wins':
        this.sortOptions._sort = 'wins';
        this.changeOrder();
        break;
      case 'Best time':
        this.sortOptions._sort = 'time';
        this.changeOrder();
        break;
      default:
        break;
    }
  }

  private changeOrder() {
    if (this.sortOptions._order == 'ASC') this.sortOptions._order = 'DESC';
    else this.sortOptions._order = 'ASC';
  }
}
