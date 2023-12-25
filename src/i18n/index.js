import * as translations from "./translations";

class I18nService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.listeners = new Set();
    this.services.api.setHeader("X-lang", this.config.lang);

    //использование функций без потери контекста
    this.getSnapshot = this.getSnapshot.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.setLang = this.setLang.bind(this);
    this.translate = this.translate.bind(this);
  }

  /**
   * Перевод фразу по словарю
   * @param lang {String} Код языка
   * @param text {String} Текст для перевода
   * @param [plural] {Number} Число для плюрализации
   * @returns {String} Переведенный текст
   */
  translate(lang, text, plural) {
    let changedLang = lang ? lang : this.config.lang;
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

  getSnapshot() {
    return this.config;
  }

  setLang(newLang) {
    const lang = newLang || this.config.lang;
    this.config = {
      ...this.config,
      lang,
    };
    this.services.api.setHeader("X-lang", lang);
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export default I18nService;
