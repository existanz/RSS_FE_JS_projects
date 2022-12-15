import { Options, ErrorResp, Endpoint, Method, Callback, ResponseNews } from '../types/index';
class Loader {
    public baseLink: string;
    public options: Options;

    constructor(baseLink: string, options: Options) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp(
        endpoint: Endpoint,
        options: Options,
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    public errorHandler(res: ErrorResp): ErrorResp {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options = {}, endpoint: Endpoint) {
        const urlOptions: Options = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: Method, endpoint: Endpoint, callback: Callback<ResponseNews>, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: ErrorResp) => res.json())
            .then((data: ResponseNews) => callback(data))
            .catch((err: string) => console.error(err));
    }
}

export default Loader;
