import { useEffect, useState } from "react";

export function useCounter(startCount, end, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!startCount) return;

    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setValue(start);
      if (start === end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [startCount, end, duration]);

  return value;
}
