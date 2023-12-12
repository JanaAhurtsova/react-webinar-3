<<<<<<< HEAD:src/store/use-selector.js
import useStore from "./use-store";
import {useEffect, useLayoutEffect, useMemo, useState} from "react";
import shallowequal from 'shallowequal';

/**
 * Хук для выборки данных из store и отслеживания их изменения
 * @param selector {Function}
 * @return {*}
 */
export default function useSelector(selector) {
  const store = useStore();

  const [state, setState] = useState(() => selector(store.getState()));
=======
import {useEffect, useLayoutEffect, useMemo, useState} from "react";
import shallowequal from 'shallowequal';
import useStore from "./use-store";

/**
 * Хук для выборки данных из store и отслеживания их изменения
 * @param selectorFunc {Function}
 * @return {*}
 */
export default function useSelector(selectorFunc) {
  const store = useStore();

  const [state, setState] = useState(() => selectorFunc(store.getState()));
>>>>>>> upstream/lecture-4:src/hooks/use-selector.js

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return store.subscribe(() => {
<<<<<<< HEAD:src/store/use-selector.js
      const newState = selector(store.getState());
=======
      const newState = selectorFunc(store.getState());
>>>>>>> upstream/lecture-4:src/hooks/use-selector.js
      setState(prevState => shallowequal(prevState, newState) ? prevState : newState);
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка от store при демонтировании компонента
  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  return state;
}
