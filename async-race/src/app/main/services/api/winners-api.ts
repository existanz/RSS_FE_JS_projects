import apiService from '../../../shared/services/api.service';
import { MyObject, Winner, ResponseData } from '../../../shared/models/basse-types';

class WinnersApi {
  public getWinners(params: MyObject): Promise<ResponseData<Winner>> {
    return apiService.getData('winners', params);
  }

  public getWinner(id: string): Promise<ResponseData<Winner>> {
    return apiService.getData('winners', { id: id.toString() });
  }

  public createWinner(data: MyObject) {
    return apiService.post('winners', data);
  }

  public deleteWinner(id: string) {
    return apiService.delete(`winners/${id}`);
  }

  public updateWinner(data: MyObject, id: number) {
    return apiService.put(`winners/${id}`, data);
  }
}

const winnersApi = new WinnersApi();
export default winnersApi;
