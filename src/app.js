import React, {useCallback, useState} from 'react';
import List from "./components/lists/list";
import Head from "./components/head";
import PageLayout from "./components/layouts/page-layout";
import ShoppingCartInfo from './components/shopping-cart-info';
import ShoppingCart from './components/shopping-cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;
  const sortedCart = cart.sort((a, b) => a.code - b.code);
  const [totalSum, setTotalSum] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItemFromCart(code);
        setTotalSum(store.getSum());
      },
      [store]
    ),

    onAddItem: useCallback((code) => {
      store.addItemToCart(code);
      setTotalSum(store.getSum());
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <ShoppingCartInfo
        count={cart.length ? cart.length : 0}
        sum={totalSum}
        onMoveToCart={() => setIsOpen(true)}
      />
      <List list={list} onAddItemToCart={callbacks.onAddItem} />
      {isOpen && (
        <ShoppingCart
          setIsOpen={setIsOpen}
          onCloseModal={() => setIsOpen(false)}
          list={sortedCart}
          onDeleteItem={callbacks.onDeleteItem}
          sum={totalSum}
        />
      )}
    </PageLayout>
  );
}

export default App;
