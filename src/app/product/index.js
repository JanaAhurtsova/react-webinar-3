import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import PageLayout from "../../components/page-layout";
import BasketTool from "../../components/basket-tool";
import Card from "../../components/card";
import Head from "../../components/head";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    _id: "",
    title: "",
    description: "",
    price: 0,
    madeIn: {},
    edition: 0,
    category: {},
  });

  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.localization.lang
  }));

  useEffect(() => {
    fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`)
      .then((res) => res.json())
      .then((data) => setProduct(data.result));
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
      <Head title={product.title} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        lang={select.lang}
      />
      <Card
        _id={product._id}
        description={product.description}
        madeIn={product.madeIn.title}
        code={product.madeIn.code}
        price={product.price}
        edition={product.edition}
        category={product.category.title}
        onAdd={callbacks.addToBasket}
        lang={select.lang}
      />
    </PageLayout>
  );
}

export default memo(Product);
