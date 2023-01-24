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
}
