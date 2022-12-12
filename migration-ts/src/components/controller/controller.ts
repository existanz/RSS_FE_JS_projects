import { Callback } from '../types/index';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: Callback) {
        super.getResp('sources', {}, callback);
    }

    getNews(e: Event, callback: Callback) {
        let target = e.target as Element;
        const newsContainer = e.currentTarget as Element;
        // if (!(e.target instanceof HTMLElement) || !(e.currentTarget instanceof HTMLElement)) return;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId as string);
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
