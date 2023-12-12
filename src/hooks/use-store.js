import {useContext} from "react";
<<<<<<< HEAD:src/store/use-store.js
import {StoreContext} from "./context";
=======
import {StoreContext} from "../store/context";
>>>>>>> upstream/lecture-4:src/hooks/use-store.js

/**
 * Хук для доступа к объекту хранилища
 * @return {Store}
 */
export default function useStore() {
  return useContext(StoreContext);
}
