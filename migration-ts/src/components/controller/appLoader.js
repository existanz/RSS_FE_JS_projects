import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'c58a9286cea842be8894eb94d7e1736d', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
