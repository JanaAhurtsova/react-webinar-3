import StoreModule from "../module";

class CategoriesState extends StoreModule {
  initState() {
    return {
      categories: [],
    };
  }

  async load() {
    try {
      const response = await fetch(
        "/api/v1/categories?fields=_id,title,parent(_id)&limit=*"
      );
      const json = await response.json();
      this.setState({
        categories: json.result.items,
      }, "Установлены категории");
    } catch(err) {
      console.error(err)
    }
  }
}

export default CategoriesState;