import { Callback, RespArticles, RespSources } from '../types/index';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources(callback: Callback<RespSources>) {
        super.getResp('sources', {}, callback);
    }

    public getNews(e: Event, callback: Callback<RespArticles>) {
        let target: Element = e.target as Element;
        const newsContainer = e.currentTarget as Element;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId && sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        'everything',
                        {
                            sources: sourceId,
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as Element;
        }
    }
}

export default AppController;
