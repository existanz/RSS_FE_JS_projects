import { Options, ErrorResp, Endpoint, Method, Callback } from '../types/index';
class Loader {
    baseLink: string;
    options: Options;

    constructor(baseLink: string, options: Options) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        endpoint: Endpoint,
        options = {},
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: ErrorResp): ErrorResp {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options = {}, endpoint: Endpoint) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: Method, endpoint: Endpoint, callback: Callback<void>, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: ErrorResp) => res.json())
            .then((data: void) => callback(data))
            .catch((err: string) => console.error(err));
    }
}

export default Loader;
