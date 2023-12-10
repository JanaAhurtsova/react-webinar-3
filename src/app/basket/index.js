import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import langJSON from "../../assets/lang.json";
import { translate } from '../../utils';

function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.localization.lang
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(
      (_id) => store.actions.basket.removeFromBasket(_id),
      [store]
    ),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    translate: (name) => translate(select.lang, langJSON, name),
  };

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} translate={callbacks.translate} onClose={callbacks.closeModal} onRemove={callbacks.removeFromBasket}/>
    }, [callbacks.removeFromBasket, callbacks.translate]),
  };

  return (
    <ModalLayout
      translate={callbacks.translate}
      title={callbacks.translate("cart")}
      onClose={callbacks.closeModal}
    >
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal translate={callbacks.translate} sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);
