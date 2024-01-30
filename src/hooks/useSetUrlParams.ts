type UrlParam = {
	[key: string]: string | number;
};

export type SetUrlParamsFunction = (...args: UrlParam[]) => void;

const useSetUrlParams = () => {
	const setUrlParams: SetUrlParamsFunction = (...args) => {
		const urlSearchParams = new URLSearchParams(window.location.search);

		if (args) {
			args.forEach((paramObject) => {
				Object.entries(paramObject).forEach(([key, value]) => {
					urlSearchParams.set(key, value.toString());
				});
			});
		}
		window.history.pushState(null, '', `/?${urlSearchParams.toString()}`);
	};
	return setUrlParams;
};

export default useSetUrlParams;
