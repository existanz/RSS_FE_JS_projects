import Header from './core/components/header/header';
import Main from './core/components/main-container/main-container';
import Router from './main/pages/router';
import Footer from './core/components/footer/footer';

export default class App {
  private header: Header;

  private main: Main;

  private router: Router;

  private footer: Footer;

  constructor() {
    this.header = new Header(document.body);
    this.main = new Main(document.body);
    this.footer = new Footer(document.body);
    this.router = new Router(this.main.container);
  }

  public async start() {
    this.router.render();
  }
}
