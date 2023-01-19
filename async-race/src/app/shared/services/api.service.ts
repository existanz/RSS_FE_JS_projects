import { MyObject } from '../models/basse-types';

const PATH = 'http://localhost:3000/';

class Loader {
  private static errorHandler(res: Response): Response {
    if (!res.ok) {
      throw Error(res.status.toString());
    }

    return res;
  }

  private static load(url: URL, method: string, data?: MyObject): Promise<Response> {
    return fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method,
      body: data ? JSON.stringify(data) : undefined,
    }).then((res: Response) => Loader.errorHandler(res));
  }
}

const apiService = new Loader();
export default apiService;
