import { useEffect, useRef } from "react";

// https://stackoverflow.com/a/53446665/7982963
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePrevious;
