import fs from "fs";

export const getFilesSizeInBytes = (fileName: string) => {
	try {
		const stats = fs.statSync(fileName);
		const fileSizeInBytes = stats["size"];
		const fileSizeInMegabytes = fileSizeInBytes / 1000000;
		return fileSizeInBytes;
	} catch (error) {
		return 0;

	}
}

export const convertStringToNumber = (string: string | undefined) => {
	if (string) {
		const number: number = parseFloat(string);
		return number
	}
	return 0;
}

export const convertStringToBoolean = (value: string | boolean | undefined) => {
	if (value) {
		if (typeof value === 'string') {
			if (value === 'true') return true;
			else return false;
		} else return value;
	} else return false;
}