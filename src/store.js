/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.sum = 0;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   */
  addItemToCart(code) {
    const [item] = this.state.list.filter((elem) => elem.code === code);
    const [existItem] = this.state.cart.filter((elem) => elem.code === code);

    this.sum += item.price;

    if (existItem) {
      existItem.count += 1;
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...item, count: 1 }],
      });
    }
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteItemFromCart(code) {
    const [item] = this.state.cart.filter((item) => item.code === code);

    this.sum -= item.price*item.count;

    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемого товара
      cart: this.state.cart.filter((item) => item.code !== code),
    });
  }

  /**
   * Подсчет суммарной стоимости товаров
   * @returns {Number}
   */
  getSum() {
    return this.sum;
  }
}

export default Store;
