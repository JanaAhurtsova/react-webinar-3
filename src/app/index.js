import { Route, Routes } from "react-router";
import { useEffect } from "react";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import useStore from "../store/use-store";
import Product from './product';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load(JSON.parse(localStorage.getItem('skip')));
  }, []);
  console.log(activeModal);
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
