export default class RouterService {
  public idPage: string;

  private query: string;

  constructor() {
    this.idPage = 'garage';
    this.query = '';
    this.routChange();
  }

  public routChange() {
    const hash: string = window.location.hash.slice(1);
    if (hash.indexOf('?')) {
      [this.idPage, this.query] = hash.split('?');
    } else {
      this.idPage = hash;
    }
    return { idPage: this.idPage, query: this.query };
  }
}
