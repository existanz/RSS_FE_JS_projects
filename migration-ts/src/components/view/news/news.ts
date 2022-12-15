import { Article } from '../../types/index';
import './news.css';

class News {
    public draw(data: Article[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');

        news.forEach((item: Article, idx: number) => {
            const newsClone = (newsItemTemp && newsItemTemp instanceof HTMLTemplateElement
                ? newsItemTemp.content.cloneNode(true)
                : null) as HTMLElement;

            const newsItem = newsClone.querySelector('.news__item');
            if (idx % 2 && newsItem) newsItem.classList.add('alt');

            const newsMetaPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (newsMetaPhoto)
                newsMetaPhoto.style.backgroundImage = `url(${
                    item.urlToImage || 'https://mailchimp.com/static/images/404Horse.gif?w=780&fm=webp&q=80'
                })`;
            const newsMetaAuthor = newsClone.querySelector<HTMLElement>('.news__meta-author');
            if (newsMetaAuthor) newsMetaAuthor.textContent = item.author || item.source.name;
            const newsMetaData = newsClone.querySelector<HTMLElement>('.news__meta-date');
            if (newsMetaData) newsMetaData.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const newsDescTitle = newsClone.querySelector<HTMLElement>('.news__description-title');
            if (newsDescTitle) newsDescTitle.textContent = item.title;
            const newsDescSource = newsClone.querySelector<HTMLElement>('.news__description-source');
            if (newsDescSource) newsDescSource.textContent = item.source.name;
            const newsDescContent = newsClone.querySelector<HTMLElement>('.news__description-content');
            if (newsDescContent) newsDescContent.textContent = item.description;
            const newsReadMore = newsClone.querySelector<HTMLElement>('.news__read-more a');
            if (newsReadMore) newsReadMore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsDOM = document.querySelector<HTMLElement>('.news');
        if (newsDOM) {
            newsDOM.innerHTML = '';
            newsDOM.appendChild(fragment);
        }
    }
}

export default News;
