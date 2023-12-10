import StoreModule from "../module";

class Product extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      product: {},
    };
  }

  async load(id) {
    try {
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
      );
      const json = await response.json();

      this.setState(
        {
          ...this.getState(),
          product: json.result,
        },
        "Загружен товар по id из АПИ"
      );
    } catch (err) {
      console.error(err);
    }
  }
}

export default Product;