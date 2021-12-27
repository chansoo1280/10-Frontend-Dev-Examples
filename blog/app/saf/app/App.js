import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import { getDirectoryUri, readDir, createFile, readFile, deleteFile } from './src/Services';

const App = () => {
	const [ directoryUri, setDirectoryUri ] = useState('');
	const [ filepath, setFilepath ] = useState('');
	return (
		<View>
			<Text>{directoryUri || '폴더를 지정해주세요.'}</Text>
			<Text>{filepath || '파일을 생성해주세요.'}</Text>
			<Button
				title="폴더 지정"
				onPress={async () => {
					const uri = await getDirectoryUri();
					setDirectoryUri(uri || '');
				}}
			/>
			<Button
				title="폴더 읽기"
				onPress={async () => {
					if (directoryUri === '') {
						alert('폴더를 지정해주세요.');
						return;
					}
					const fileList = await readDir(directoryUri);
					console.log(fileList);
				}}
			/>
			<Button
				title="파일생성"
				onPress={async () => {
					if (directoryUri === '') {
						alert('폴더를 지정해주세요.');
						return;
					}
					const fileName = 'test.txt';
					const contents = 'text';
					const newFilepath = await createFile(directoryUri, fileName, contents);
					setFilepath(newFilepath);
				}}
			/>
			<Button
				title="파일 읽기"
				onPress={async () => {
					if (directoryUri === '') {
						alert('폴더를 지정해주세요.');
						return;
					}
					const file = await readFile(filepath);
					console.log(file);
				}}
			/>
			<Button
				title="파일 삭제"
				onPress={async () => {
					if (directoryUri === '') {
						alert('폴더를 지정해주세요.');
						return;
					}
					await deleteFile(filepath);
					setFilepath('');
				}}
			/>
		</View>
	);
};

export default App;
