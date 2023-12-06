import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import langJSON from "../../assets/lang.json";

function Main() {
  const store = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    store.actions.catalog.load(skip);
  }, [skip]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.localization.lang,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменение страницы товаров
    onPageChange: (page) => {
      setCurrentPage(page);
      setSkip(page*10 - 10)
    }
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} lang={select.lang} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket, select.lang]),
  };

  return (
    <PageLayout>
      <Head title={langJSON[select.lang].store} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        lang={select.lang}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination currentPage={currentPage} totalCount={select.count} onPageChange={callbacks.onPageChange}/>
    </PageLayout>
  );
}

export default memo(Main);
