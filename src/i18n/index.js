import * as translations from "./translations";

class I18nService {
  constructor(services, config = {}) {
    this.services = services;
    this.lang = config.lang;
  }

  /**
   * Перевод фразу по словарю
   * @param lang {String} Код языка
   * @param text {String} Текст для перевода
   * @param [plural] {Number} Число для плюрализации
   * @returns {String} Переведенный текст
   */
  translate(lang, text, plural) {
    let changedLang = lang ? lang : this.lang;
    let result =
      translations[changedLang] && text in translations[changedLang]
        ? translations[changedLang][text]
        : text;

    if (typeof plural !== "undefined") {
      const key = new Intl.PluralRules(changedLang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

  setLang(newLang) {
    this.lang = newLang;
    this.services.api.setHeader("X-lang", newLang);
  }
}

export default I18nService;
