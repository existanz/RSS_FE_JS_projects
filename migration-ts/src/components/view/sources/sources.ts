import './sources.css';
import { Source } from '../../types/index';

class Sources {
    public draw(data: Source[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = (sourceItemTemp instanceof HTMLTemplateElement
                ? sourceItemTemp.content.cloneNode(true)
                : null) as HTMLElement;
            const srcItemName = sourceClone.querySelector<HTMLElement>('.source__item-name');
            if (srcItemName) srcItemName.textContent = item.name;
            const srcItem = sourceClone.querySelector<HTMLElement>('.source__item');
            if (srcItem) srcItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });
        const srcFragment = document.querySelector('.sources');
        if (srcFragment) srcFragment.append(fragment);
    }
}

export default Sources;
