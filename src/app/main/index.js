import {memo, useCallback, useEffect, useState} from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import Item from "../../components/item";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import langJSON from "../../assets/lang.json";
import { translate } from '../../utils';
import Spinner from '../../components/spinner';

function Main() {
  const store = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    store.actions.catalog.load(skip);
  }, [skip]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    isLoading: state.catalog.isLoading,
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
      setSkip(page*10 - 10);
    },
    translate: (name) => translate(select.lang, langJSON, name)
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} translate={callbacks.translate} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket, callbacks.translate]),
  };

  return (
    <PageLayout>
      <Head title={callbacks.translate("store")} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        translate={callbacks.translate} />
      {select.isLoading ? <Spinner/> : <List list={select.list} renderItem={renders.item} />}
      <Pagination
        currentPage={currentPage}
        totalCount={select.count}
        onPageChange={callbacks.onPageChange}
      />
    </PageLayout>
  );
}

export default memo(Main);
