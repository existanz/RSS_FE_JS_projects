class State {
  public allData: [];

  constructor() {
    this.allData = [];
  }

  public async load() {
    const url = 'http://127.0.0.1:3000/garage';
    await fetch(url)
      .then((res) => res.json())
      // eslint-disable-next-line no-return-assign
      .then((data) => (this.allData = data));
    console.log(this.allData);
  }
}

const stateService = new State();
export default stateService;
