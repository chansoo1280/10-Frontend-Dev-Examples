const RN_API = {
	GET_VERSION: 'GET_VERSION'
};
const WebViewMessage = (type, data) =>
	new Promise((resolve, reject) => {
		if (!window.ReactNativeWebView) {
			// alert('ReactNativeWebView 객체가 없습니다.');
			reject('ReactNativeWebView 객체가 없습니다.');
			return;
		}
		const reqId = Date.now(); // uuid로 구현해도 좋습니다.
		const TIMEOUT = 3000; // 3 * 1000 = 3s
		const timer = setTimeout(() => {
			/** android */
			document.removeEventListener('message', listener);
			/** ios */
			window.removeEventListener('message', listener);
			reject('TIMEOUT');
		}, TIMEOUT);
		const listener = (event) => {
			const { data: listenerData, reqId: listenerReqId } = JSON.parse(event.data);
			// 같은 id만 처리합니다.
			if (listenerReqId === reqId) {
				clearTimeout(timer);
				/** android */
				document.removeEventListener('message', listener);
				/** ios */
				window.removeEventListener('message', listener);
				resolve(listenerData);
			}
		};
		window.ReactNativeWebView.postMessage(
			JSON.stringify({
				type,
				data,
				reqId
			})
		);
		/** android */
		document.addEventListener('message', listener);
		/** ios */
		window.addEventListener('message', listener);
	});
