import { Route, Routes } from "react-router";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import Product from './product';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/catalog/:page" element={<Main />} />
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
