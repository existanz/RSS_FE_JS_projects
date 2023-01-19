import { MyObject } from '../models/basse-types';

const PATH = 'http://localhost:3000/';

class Loader {
  private errorHandler(res: Response): Response {
    if (!res.ok) {
      throw Error(res.status.toString());
    }

    return res;
  }

  private load(url: URL, method: string, data?: MyObject): Promise<Response> {
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

    return url.slice(0, -1);
  }

  public getData(endpoint: string, params: MyObject) {
    return this.load(new URL(this.makeUrl(endpoint, params)), 'GET').then((res: Response) =>
      res.json().then((items) => {
        const total = res.headers.get('X-Total-Count');
        return {
          total: total ? +total : 0,
          items,
        };
      })
    );
  }
}

const apiService = new Loader();
export default apiService;
