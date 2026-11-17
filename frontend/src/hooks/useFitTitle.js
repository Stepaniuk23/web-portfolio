import { useLayoutEffect, useRef } from "react";

/**
 * Не даёт длинным словам в заголовке обрезаться или вылезать за экран.
 *
 * Размер шрифта заголовков задан в CSS от ширины экрана, а длину слов
 * CSS не знает: «Маргарита», «наблюдательный» или «Storyteller» при таком
 * размере могут не поместиться в свою колонку. Хук измеряет самое длинное
 * слово заголовка и, если оно не влезает, уменьшает шрифт ровно настолько,
 * чтобы влезло. Если всё помещается — ничего не меняется, работает обычный
 * размер из CSS.
 *
 * @param {string} text — текст заголовка; при его смене (другой язык,
 *                        другая страница) размер пересчитывается
 * @returns ref, который нужно повесить на заголовок
 */
export function useFitTitle(text) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const title = ref.current;
    if (!title) return undefined;

    const fit = () => {
      // Сначала возвращаем размер из CSS, потом меряем
      title.style.fontSize = "";

      const style = getComputedStyle(title);
      const available =
        title.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight);

      const needed = longestWordWidth(title);

      if (available > 0 && needed > available) {
        const cssSize = parseFloat(style.fontSize);
        // Небольшой запас (2%), чтобы буквы точно не касались края
        title.style.fontSize = `${Math.floor((cssSize * available * 0.98) / needed)}px`;
      }
    };

    fit();

    // Пересчитываем при изменении ширины (не высоты!) и после загрузки шрифтов.
    // Высоту не отслеживаем: подгонка шрифта сама меняет высоту блока, и
    // браузер ругался бы на «ResizeObserver loop». По той же причине
    // пересчёт откладываем до следующего кадра.
    let lastWidth = null;
    let frameId = null;
    const scheduleFit = () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        frameId = null;
        fit();
      });
    };

    const observer = new ResizeObserver((entries) => {
      const width = Math.round(entries[0].contentRect.width);
      if (width === lastWidth) return;
      lastWidth = width;
      scheduleFit();
    });
    observer.observe(title.parentElement || title);
    document.fonts?.ready.then(scheduleFit);

    return () => {
      observer.disconnect();
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [text]);

  return ref;
}

/** Ширина самого длинного слова внутри элемента (с учётом шрифта и заглавных букв) */
function longestWordWidth(element) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  let max = 0;

  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const words = /\S+/g;
    let match;
    while ((match = words.exec(node.textContent))) {
      range.setStart(node, match.index);
      range.setEnd(node, match.index + match[0].length);
      max = Math.max(max, range.getBoundingClientRect().width);
    }
  }

  return max;
}
