import apiService from '../../../shared/services/api.service';
import { Car, CarEngine, MyObject, ResponseData } from '../../../shared/models/basse-types';

class GarageApi {
  public getCars(paginator: MyObject): Promise<ResponseData<Car>> {
    return apiService.getData('garage', paginator);
  }

  public getCar(id: string): Promise<Car> {
    return apiService.get('garage', { id });
  }

  public createCar(data: MyObject) {
    return apiService.post('garage', data);
  }

  public deleteCar(id: string) {
    return apiService.delete(`garage/${id}`);
  }

  public updateCar(data: MyObject) {
    return apiService.put(`garage/${data.id}`, data);
  }

  public startEngine(params: MyObject): Promise<CarEngine> {
    return apiService.patch('engine', params);
  }

  public switchEngine(params: MyObject): Promise<MyObject> {
    return apiService.patch('engine', params);
  }
}

const garageApi = new GarageApi();
export default garageApi;
