import { useLayoutEffect, useRef } from "react";

/**
 * Не даёт длинным словам в заголовке обрезаться.
 *
 * Размер шрифта заголовка задан в CSS от ширины экрана, а длину имени
 * CSS не знает: «Маргарита» или «Олександр» при таком размере могут
 * не поместиться в свою колонку. Хук измеряет самое длинное слово
 * (каждое слово — отдельная строка заголовка) и, если оно не влезает,
 * уменьшает шрифт ровно настолько, чтобы влезло. Если всё помещается —
 * ничего не меняется, работает обычный размер из CSS.
 *
 * @param {string} text — текст заголовка; при его смене (другой язык,
 *                        другая история) размер пересчитывается
 * @returns ref, который нужно повесить на заголовок
 */
export function useFitTitle(text) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const title = ref.current;
    const container = title?.parentElement;
    if (!title || !container) return undefined;

    const fit = () => {
      // Сначала возвращаем размер из CSS, потом меряем
      title.style.fontSize = "";

      const containerStyle = getComputedStyle(container);
      const available =
        container.clientWidth -
        parseFloat(containerStyle.paddingLeft) -
        parseFloat(containerStyle.paddingRight);

      const lines = title.children.length ? [...title.children] : [title];
      const needed = Math.max(
        ...lines.map((line) => {
          const range = document.createRange();
          range.selectNodeContents(line);
          return range.getBoundingClientRect().width;
        })
      );

      if (available > 0 && needed > available) {
        const cssSize = parseFloat(getComputedStyle(title).fontSize);
        // Небольшой запас (2%), чтобы буквы точно не касались края
        title.style.fontSize = `${Math.floor((cssSize * available * 0.98) / needed)}px`;
      }
    };

    fit();

    // Пересчитываем при изменении ширины окна и после загрузки шрифтов
    const observer = new ResizeObserver(() => fit());
    observer.observe(container);
    document.fonts?.ready.then(fit);

    return () => observer.disconnect();
  }, [text]);

  return ref;
}
