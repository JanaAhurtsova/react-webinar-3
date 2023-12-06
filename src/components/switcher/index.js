import { memo } from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Switcher() {
  const store = useStore();
  const localizationLang = useSelector((state) => state.localization.lang);

  const callbacks = {
    setLanguage: (lang) => {
      store.actions.localization.changeLocalization(lang);
    },
  };

  return (
    <select
      value={localizationLang}
      onChange={(e) => callbacks.setLanguage(e.target.value)}
    >
      <option value={"ru"}>Ru</option>
      <option value={"en"}>En</option>
    </select>
  );
}

export default memo(Switcher)