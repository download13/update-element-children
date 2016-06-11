declare module 'dift' {
	export const CREATE: number;
	export const UPDATE: number;
	export const MOVE: number;
	export const REMOVE: number;

	export default function<T>(oldVNodes: T[], newVNodes: T[], effects: Effects<T>, key: Key): void;

	type Effects<T> = (editType: number, old: T, next: T, index: number) => void;

	type Key = (item: any) => string;
}
