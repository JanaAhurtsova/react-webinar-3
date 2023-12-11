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
      count: 0,
      isLoading: true
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
      // this.setState(
      //   {
      //     ...this.getState(),
      //     isLoading: true,
      //   });

      const response = await fetch(
        `/api/v1/articles?limit=10&skip=${skip}&fields=items(_id, title, price),count`
      );
      const json = await response.json();

      this.setState({
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        isLoading: false
      }, 'Загружены товары из АПИ');
    } catch(err) {
      console.error("Ошибка загрузки товаров:", err.message);
    }
  }
}

export default Catalog;
