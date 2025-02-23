// place files you want to import through the `$lib` alias in this folder.

export const APP_NAME = 'Financial Platform';

function _delay(minSeconds: number, maxSeconds: number) {
	let min = Math.ceil(minSeconds * 1000);
	let max = Math.floor(maxSeconds * 1000);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function delay(minSeconds: number, maxSeconds: number): Promise<void> {
	return new Promise((fullfill) => setTimeout(fullfill, _delay(minSeconds, maxSeconds)));
}
