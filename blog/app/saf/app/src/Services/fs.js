import { StorageAccessFramework } from 'expo-file-system';
0;
const filetype = 'utf8';

export const getDirectoryUri = async () => {
	const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync().catch((e) => alert(e));
	if (permissions && permissions.granted) {
		// Gets SAF URI from response
		return permissions.directoryUri;
	}
	return false;
};
export const readDir = (directoryUri) =>
	StorageAccessFramework.readDirectoryAsync(directoryUri).catch((err) => {
		console.log(err);
		return [];
	});
export const readFile = (filepath) =>
	StorageAccessFramework.readAsStringAsync(filepath, {
		encoding: filetype
	});
export const createFile = (directoryUri, fileName, contents) =>
	StorageAccessFramework.createFileAsync(directoryUri, fileName, 'text/plain').then((filepath) =>
		StorageAccessFramework.writeAsStringAsync(filepath, contents, { encoding: filetype }).then(() => filepath)
	);
export const modifyFile = (filepath, contents) =>
	StorageAccessFramework.writeAsStringAsync(filepath, contents, { encoding: filetype });

export const deleteFile = (filepath) => StorageAccessFramework.deleteAsync(filepath);
