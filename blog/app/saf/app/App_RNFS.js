import React from 'react';
import { PermissionsAndroid, Button, View } from 'react-native';
var RNFS = require('react-native-fs');
// const path = RNFS.DocumentDirectoryPath; // 잘만들어집니다.
const path = RNFS.ExternalStorageDirectoryPath; // 안됩니다.
const App = () => {
	const requestPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log('You can use the READ_EXTERNAL_STORAGE');
			} else {
				console.log('READ_EXTERNAL_STORAGE permission denied');
			}
		} catch (err) {
			console.warn(err);
		}
		try {
			const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log('You can use the WRITE_EXTERNAL_STORAGE');
			} else {
				console.log('WRITE_EXTERNAL_STORAGE permission denied');
			}
		} catch (err) {
			console.warn(err);
		}
	};
	const createFile = () =>
		RNFS.writeFile(path + '/test.txt', '절대로 안 만들어집니다...', 'utf8')
			.then((success) => {
				console.log('FILE WRITTEN!');
			})
			.catch((err) => {
				console.log(err.message); // ENOENT: open failed: EPERM (Operation not permitted), open '/storage/emulated/0/test.txt'
			});
	return (
		<View>
			<Button
				title="권한요청"
				onPress={() => {
					requestPermission();
				}}
			/>
			<Button
				title="파일생성"
				onPress={() => {
					createFile();
				}}
			/>
		</View>
	);
};

export default App;
