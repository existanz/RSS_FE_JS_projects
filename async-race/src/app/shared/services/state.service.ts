import apiService from './api.service';

class State {
  public allData: [];

  constructor() {
    this.allData = [];
  }

  public async load() {
    this.allData = (await apiService.getData('garage', {})).items;
    console.log(this.allData);
  }
}

const stateService = new State();
export default stateService;
