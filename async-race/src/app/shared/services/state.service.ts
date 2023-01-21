import apiService from './api.service';

class State {
  public allData: [];

  constructor() {
    this.allData = [];
  }

  public async load() {
    const data = await apiService.getData('garage', { _limit: '7', _page: '1' });
    console.log(data.total, data.items);
  }
}

const stateService = new State();
export default stateService;
