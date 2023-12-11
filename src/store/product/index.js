import StoreModule from "../module";

class Product extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      product: {},
      isLoading: true,
    };
  }

  async load(id) {
    try {
      this.setState(
        {
          ...this.getState(),
          isLoading: true,
        });

      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
      );
      const json = await response.json();

      this.setState(
        {
          ...this.getState(),
          product: json.result,
          isLoading: false
        },
        "Загружен товар по id из АПИ"
      );
    } catch (err) {
      console.error("Ошибка загрузки товара по id:", err.message);
    }
  }
}

export default Product;