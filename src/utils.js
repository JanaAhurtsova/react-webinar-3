/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, locale, variants = {} ) {
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

export function range(start, end) {
  let length = end - start + 1;
  /*
    Создание массива определенной длины и установка в нем элементов от
    начального значения до конечного.
  */
  return Array.from({ length }, (_, idx) => idx + start);
};

export const DOTS = "...";

export function paginationRange ({
  totalCount,
  pageSize = 10,
  siblingCount = 1,
  currentPage,
}) {
  const totalPageCount = Math.ceil(totalCount / pageSize);
  const totalPageNumbers = siblingCount + 3;

  if (totalPageNumbers >= totalPageCount) {
    return range(1, totalPageCount);
  }

const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);
const shouldShowLeftDots = leftSiblingIndex > 2;
const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  // не показывать левые точки
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 1 + 2 * siblingCount;
    let leftRange = range(1, leftItemCount);
    if (rightSiblingIndex !== 4) {
      return [...leftRange, DOTS, totalPageCount];
    } else {
      leftRange = range(1, leftItemCount + 1);
      return [...leftRange, DOTS, totalPageCount];
    }
  }

  //не показывать правые точки
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 1 + 2 * siblingCount;
    let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
    if (leftSiblingIndex > totalPageCount - 3) {
      return [firstPageIndex, DOTS, ...rightRange];
    } else if (leftSiblingIndex === totalPageCount - 3) {
      rightRange = range(totalPageCount - rightItemCount, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }
  }

  //показывать точки с двух сторон
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }
};

export function translate(lang, dictionary, name) {
  return dictionary[lang][name];
}
