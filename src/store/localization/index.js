import StoreModule from "../module";

class Localization extends StoreModule {
  initState() {
    return {
      lang: 'ru'
    }
  }

  changeLocalization(lang) {
    this.setState({
      ...this.getState(),
      lang
    })
  }
}

export default Localization;