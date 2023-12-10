import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import Card from "../../components/card";

function Product() {
  const { id } = useParams();
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.product.product,
    lang: state.localization.lang
  }));

  useEffect(() => {
    store.actions.product.load(id);
  }, [id]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
  };
  return (
    <PageLayout>
      <Head title={select.product.title} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        lang={select.lang}
      />
      <Card
        product={select.product}
        onAdd={callbacks.addToBasket}
        lang={select.lang}
      />
    </PageLayout>
  );
}

export default memo(Product);
