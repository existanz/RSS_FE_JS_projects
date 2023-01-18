import NotFoundPage from './404/404';
import GaragePage from './garage/garage';
import WinnersPage from './winners/winners';
import RouterService from '../services/router.service';

export default class Router {
  private parentNode: HTMLElement;

  private garage: GaragePage;

  private winners: WinnersPage;

  private notFoundPage: NotFoundPage;

  private routerService: RouterService;

  constructor(parentNode: HTMLElement) {
    this.parentNode = parentNode;

    this.garage = new GaragePage();
    this.winners = new WinnersPage();
    this.notFoundPage = new NotFoundPage();
    this.routerService = new RouterService();

    this.render(this.routerService.routChange().idPage);
    window.addEventListener('hashchange', () => this.render(this.routerService.routChange().idPage));
  }

  public render(idPage: string) {
    this.parentNode.innerHTML = '';
    switch (idPage) {
      case 'garage':
        this.parentNode.append(this.garage.node);
        break;
      case '':
        this.parentNode.append(this.garage.node);
        break;
      case 'winners':
        this.parentNode.append(this.winners.node);
        break;
      default:
        this.parentNode.append(this.notFoundPage.node);
    }
  }
}
