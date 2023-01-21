import { MyObject, Method } from '../models/basse-types';

const PATH = 'http://localhost:3000/';

class Loader {
  private errorHandler(res: Response): Response {
    if (!res.ok) {
      throw Error(res.status.toString());
    }

    return res;
  }

  private load(url: URL, method: Method, data?: MyObject): Promise<Response> {
    return fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method,
      body: data ? JSON.stringify(data) : undefined,
    }).then((res: Response) => this.errorHandler(res));
  }

  private makeUrl(endpoint: string, params: MyObject) {
    let url = `${PATH}${endpoint}?`;

    Object.keys(params).forEach((key) => {
      url += `${key}=${params[key]}&`;
    });

    return new URL(url.slice(0, -1));
  }

  public getData(endpoint: string, params: MyObject) {
    return this.load(this.makeUrl(endpoint, params), 'GET').then((res: Response) =>
      res.json().then((items) => {
        const total = res.headers.get('X-Total-Count');
        return {
          total: total ? +total : 0,
          items: Array.from(items),
        };
      })
    );
  }

  public post(endpoint: string, data: MyObject) {
    return this.load(new URL(endpoint), 'POST', data).then((res: Response) => res.json());
  }

  public put(endpoint: string, data: MyObject) {
    return this.load(new URL(endpoint), 'PUT', data).then((res: Response) => res.json());
  }

  public delete(endpoint: string) {
    return this.load(new URL(endpoint), 'DELETE').then((res: Response) => res.json());
  }

  public patch(endpoint: string, params: MyObject) {
    return this.load(this.makeUrl(endpoint, params), 'PATCH').then((res: Response) => res.json());
  }
}

const apiService = new Loader();
export default apiService;
