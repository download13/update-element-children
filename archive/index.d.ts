type JsxInput = string | Component<any>;

type Component<Props> = FunctionalComponent<Props>;

type FunctionalComponent<Props> = (model: FunctionalModel<Props>) => VNode;

interface FunctionalModel<Props> {
	props: Props;
	children: VNode[];
	h(component: JsxInput, attributes: Object, ...children: VNodeChild[]): VNode;
}

type State = any;
interface Command {
	type: string;
	payload: any;
}
interface StatefulModel<A> extends FunctionalModel<A> {
	state: State;
	update(state: State, command: Command): State;
}

type VNode = StringVNode | ElementVNode;

interface StringVNode {
	type: 'string';
	v: string;
}

interface ElementVNode {
	type: 'element';
	name: string;
	attributes: Object;
	children: VNode[]
}

type VNodeChild = number | string | VNode;

declare namespace JSX {
	type Element = VNode;
	interface IntrinsicElements {
		div: any;
		p: any;
		a: any;
	}
}
