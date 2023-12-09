import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      count: 0
    }
  }

  setList(newState) {
    this.setState({
        ...this.getState(),
        list: [newState],
      })
  }

  async load(skip = 0) {
    try {
      const response = await fetch(
        `/api/v1/articles?limit=10&skip=${skip}&fields=items(_id, title, price),count`
      );
      const json = await response.json();

      this.setState({
        ...this.getState(),
        list: json.result.items,
        count: json.result.count
      }, 'Загружены товары из АПИ');
    } catch(err) {
      console.error(err);
    }
  }
}

export default Catalog;
