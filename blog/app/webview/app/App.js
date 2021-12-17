import React, { createRef } from 'react';
import { View } from 'react-native';
import { RN_API, WebViewWrapper } from '@Service';

const App = () => {
	const webview = createRef();
	return (
		<View
			style={{
				width: '100%',
				height: '100%'
			}}
		>
			<WebViewWrapper
				ref={webview}
				uri="http://172.30.1.40:8080"
				onMessage={async (req) => {
					if (!req) return;
					const { data, type, reqId } = req;
					console.log(reqId, type);
					switch (type) {
						case RN_API.GET_VERSION: {
							webview.current.postMessage(
								JSON.stringify({
									reqId: req.reqId,
									type: type,
									data: '1.0'
								})
							);
							break;
						}
					}
				}}
			/>
		</View>
	);
};

export default App;
