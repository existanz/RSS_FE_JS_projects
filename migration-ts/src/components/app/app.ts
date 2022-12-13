import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => (data !== undefined ? this.view.drawNews(data) : data))
        );
        this.controller.getSources((data) => (data !== undefined ? this.view.drawSources(data) : data));
    }
}

export default App;
