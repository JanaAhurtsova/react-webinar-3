/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = "ru-RU") {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || "";
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = "ru-RU", options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

function createCategoriesTree(arr) {
  const map = new Map(
    arr.map((item) => [
      item._id,
      {
        value: item._id,
        title: item.title,
        parent: item.parent,
        children: item.children,
      },
    ])
  );
  for (let item of map.values()) {
    if (!item.parent || !map.has(item.parent._id)) {
      continue;
    }

    const parent = map.get(item.parent._id);

    parent.children = [...parent.children || [], item];
  }

  return [...map.values()].filter(item => !item.parent)
}

export function buildNestedCategories(arr) {
  const tree = createCategoriesTree(arr);
  function build(array, depth = 0, result = []) {
    array.forEach((item) => {
      const prefix = "- ".repeat(depth);
      const itemWithPrefix = { ...item, title: `${prefix}${item.title}` };
      result.push({ ...itemWithPrefix });
      if (item.children && item.children.length > 0) {
        build(item.children, depth + 1, result);
      }
    });
    return result;
  };

  return build(tree);
}

// возвращает куки с указанным name,
// или undefined, если ничего не найдено
export function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


export function deleteCookie(name) {
  document.cookie = name + "=; Max-Age=0";
}