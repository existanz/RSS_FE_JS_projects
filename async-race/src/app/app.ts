import Footer from './core/components/footer/footer';
import Header from './core/components/header/header';

export default class App {
  private header: Header;

  private footer: Footer;

  constructor() {
    this.header = new Header(document.body);
    this.footer = new Footer(document.body);
  }

  public async start() {
    console.log('Start App!');
  }
}
