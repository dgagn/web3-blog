import {useCallback, useLayoutEffect, useRef} from 'react';

/**
 * This makes sure the function is safe from unmounting.
 *
 * @param {*} dispatch the dispatcher function
 * @return {function(...[*]): *} the safe function
 */
function useSafeFunction(dispatch) {
  const mounted = useRef(false);
  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch],
  );
}

export default useSafeFunction;
