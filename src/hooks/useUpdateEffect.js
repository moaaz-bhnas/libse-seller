import { useEffect, useRef } from "react";

// https://stackoverflow.com/a/57632587/7982963
const useUpdateEffect = (effect, dependencies = []) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    }
  }, dependencies);
};

export default useUpdateEffect;
