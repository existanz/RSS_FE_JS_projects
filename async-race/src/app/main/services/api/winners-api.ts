import apiService from '../../../shared/services/api.service';
import { MyObject } from '../../../shared/models/basse-types';

class WinnersApi {
  public getWinners(params: MyObject) {
    return apiService.getData('winners', params);
  }

  public getWinner(id: number) {
    return apiService.getData('winners', { id: id.toString() });
  }

  public createWinner(data: MyObject) {
    return apiService.post('winners', data);
  }

  public deleteWinner(id: number) {
    return apiService.delete(`winners/${id}`);
  }

  public updateWinner(data: MyObject, id: number) {
    return apiService.put(`winners/${id}`, data);
  }
}

const winnersApi = new WinnersApi();
export default winnersApi;
