import apiService from './api.service';

class State {
  public allData: [];

  constructor() {
    this.allData = [];
  }

  public async load() {
    const data = await apiService.getData('garage', { _limit: '7', _page: '1' });
    this.allData = data.items;
    console.log(data.total);
    console.log(this.allData);
  }
}

const stateService = new State();
export default stateService;
