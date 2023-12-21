import {memo, useMemo} from 'react';
import PropTypes from "prop-types";
import Select from '../../components/select';

function LocaleSelect({ lang, setLang }) {
  const options = {
    lang: useMemo(
      () => [
        { value: "ru", title: "Русский" },
        { value: "en", title: "English" },
      ],
      []
    ),
  };

  return <Select onChange={setLang} value={lang} options={options.lang} />;
}

LocaleSelect.propTypes = {
  lang: PropTypes.string,
  setLang: PropTypes.func
};

export default memo(LocaleSelect);
