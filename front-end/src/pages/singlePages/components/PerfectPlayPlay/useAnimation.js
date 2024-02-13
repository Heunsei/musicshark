import React, { useRef, useEffect, useCallback } from 'react';

export const useAnimation = (
  callback,
  delay,
  deps,
) => {
  const requestRef = useRef();
  const previousTimeRef = useRef(0);

  const animate = useCallback(
    (timestamp) => {
      if (previousTimeRef.current !== undefined) {
        const progress = timestamp - previousTimeRef.current;
        if (progress > delay) {
          callback();
          previousTimeRef.current = timestamp;
        }
      }
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback],
  );

  const depsArray = deps || [];
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== undefined) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [requestRef, animate, ...depsArray]);
};
