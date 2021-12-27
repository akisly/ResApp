import { useCallback, useEffect } from "react";

/**
 * @param fn - A callback function to use debounce effect on.
 * @param delay - A number that indicates how much time it waits.
 * @param deps - A dependency list.
 */
export const useDebounce = (
	fn,
	delay,
	deps
) => {
	const callback = useCallback(fn, deps);

	useEffect(() => {
		const handler = setTimeout(() => {
			callback()
		}, delay);

		return () => {
			clearTimeout(handler);
		}
	}, [callback])
}
