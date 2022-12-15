import AppController from '../controller/controller';
import { RespArticles, RespSources } from '../types/index';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        const srcContainer = document.querySelector<HTMLElement>('.sources');
        if (srcContainer)
            srcContainer.addEventListener('click', (e) =>
                this.controller.getNews(e, (data: RespArticles | undefined) =>
                    data !== undefined ? this.view.drawNews(data) : data
                )
            );
        this.controller.getSources((data: RespSources | undefined) =>
            data !== undefined ? this.view.drawSources(data) : data
        );
    }
}

export default App;
