import {
	Child,
	VElement
} from './src/types';


export declare function h(name: string, props: Object, ...children: Child[]): VElement;
export declare function updateChildren(root: HTMLElement, oldVDom: any, newVDom: any): void;
