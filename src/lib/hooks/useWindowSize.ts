import { useEffect, useState } from "react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    height: 0,
    width: 0,
  });

  const handler = () => {
    setWindowSize({
      height: window.innerHeight,
      width: innerWidth,
    });
  };

  useEffect(() => {
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return windowSize;
}

export default useWindowSize;
