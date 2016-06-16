const expect = require('expect.js');
const {h, updateChildren} = require('../dist');
const jsdom = require('mocha-jsdom');


describe('h', () => {
	it('creates a vnode', () => {
		const vnode = h('div', null);
		expect(vnode).to.be.eql({
			type: 'element',
			name: 'div',
			props: {},
			children: []
		});
	});

	it('creates nested vnodes', () => {
		const vnode = h('div', null, h('span'));
		expect(vnode).to.be.eql({
			type: 'element',
			name: 'div',
			props: {},
			children: [{
				type: 'element',
				name: 'span',
				props: {},
				children: [],
				index: 0
			}]
		});
	});

	it('creates nested vnodes with string children', () => {
		const vnode = h('div', null, 'teststring');
		expect(vnode).to.be.eql({
			type: 'element',
			name: 'div',
			props: {},
			children: [{
				type: 'text',
				text: 'teststring',
				index: 0
			}]
		});
	});

	it('creates nested vnodes with null children', () => {
		const vnode = h('div', null, null);
		expect(vnode).to.be.eql({
			type: 'element',
			name: 'div',
			props: {},
			children: []
		});
	});

	it('creates nested vnodes with undefined children', () => {
		const vnode = h('div', null, undefined);
		expect(vnode).to.be.eql({
			type: 'element',
			name: 'div',
			props: {},
			children: []
		});
	});

	it('creates nested vnodes with number children', () => {
		const vnode = h('div', null, 0);
		expect(vnode).to.be.eql({
			type: 'element',
			name: 'div',
			props: {},
			children: [{
				type: 'text',
				text: '0',
				index: 0
			}]
		});
	});

	it('creates nested vnodes with boolean children', () => {
		const vnode = h('div', null, true);
		expect(vnode).to.be.eql({
			type: 'element',
			name: 'div',
			props: {},
			children: [{
				type: 'text',
				text: 'true',
				index: 0
			}]
		});
	});

	it('creates nested vnodes with empty array children', () => {
		const vnode = h('div', null, []);
		expect(vnode).to.be.eql({
			type: 'element',
			name: 'div',
			props: {},
			children: [{
				type: 'text',
				text: '',
				index: 0
			}]
		});
	});

	it('creates nested vnodes with populated array children', () => {
		const vnode = h('div', null, [5, 's']);
		expect(vnode).to.be.eql({
			type: 'element',
			name: 'div',
			props: {},
			children: [{
				type: 'text',
				text: '5,s',
				index: 0
			}]
		});
	});

	it('creates nested vnodes with object children', () => {
		const vnode = h('div', null, {});
		expect(vnode).to.be.eql({
			type: 'element',
			name: 'div',
			props: {},
			children: [{
				type: 'text',
				text: '[object Object]',
				index: 0
			}]
		});
	});
});

describe('updateChildren', () => {
	jsdom();

	it('can add an element', () => {
		const root = $c('div');
		const domA = null;
		const domB = h('div', null);

		updateChildren(root, domA, domB);
		expect(root.childNodes.length).to.be.eql(1);
		expect(root.childNodes[0].localName).to.be.eql('div');
	});

	it('can add an element with an attribute', () => {
		const root = $c('div');
		const domA = null;
		const domB = h('div', {'attrbte': 'testvalue'});

		updateChildren(root, domA, domB);
		expect(root.childNodes[0].getAttribute('attrbte')).to.be.eql('testvalue');
	});

	it('can add several elements', () => {
		const root = $c('div');
		const domA = null;
		const domB = [
			h('div', null),
			h('span')
		];

		updateChildren(root, domA, domB);
		expect(root.childNodes.length).to.be.eql(2);
		expect(root.childNodes[0].localName).to.be.eql('div');
		expect(root.childNodes[1].localName).to.be.eql('span');
	});

	it('can remove an element', () => {
		const root = $c('div');
		root.appendChild($c('div'));
		const domA = h('div', null);
		const domB = null;

		updateChildren(root, domA, domB);
		expect(root.childNodes.length).to.be.eql(0);
	});

	it('can add a text child node', () => {
		const root = $c('div');
		const domA = [];
		const domB = ['txt'];

		updateChildren(root, domA, domB);
		expect(root.childNodes.length).to.be.eql(1);
		expect(root.childNodes[0].nodeName).to.be.eql('#text');
		expect(root.childNodes[0].textContent).to.be.eql('txt');
	});

	it('can update a text child node', () => {
		const root = $c('div');
		root.appendChild($t('txt'));
		const domA = 'txt';
		const domB = 'text';

		updateChildren(root, domA, domB);
		expect(root.childNodes.length).to.be.eql(1);
		expect(root.childNodes[0].nodeName).to.be.eql('#text');
		expect(root.childNodes[0].textContent).to.be.eql('text');
	});

	it('can update several text child nodes', () => {
		const root = $c('div');
		root.appendChild($t('txt1'));
		root.appendChild($t('txt2'));
		const domA = ['txt1', 'txt2'];
		const domB = ['text1', 'text2', 'text3'];

		updateChildren(root, domA, domB);
		expect(root.childNodes.length).to.be.eql(3);
		expect(root.childNodes[0].textContent).to.be.eql('text1');
		expect(root.childNodes[1].textContent).to.be.eql('text2');
		expect(root.childNodes[2].textContent).to.be.eql('text3');
	});

	it('can remove a text child node', () => {
		const root = $c('div');
		root.appendChild($t('txt'));
		const domA = 'txt';
		const domB = null;

		updateChildren(root, domA, domB);
		expect(root.childNodes.length).to.be.eql(0);
	});

	it('can add an attribute', () => {
		const root = $c('div');
		root.appendChild($c('div'));
		const domA = h('div', {});
		const domB = h('div', {class: 'testclass'});

		updateChildren(root, domA, domB);
		expect(root.childNodes[0].attributes.length).to.be.eql(1);
		expect(root.childNodes[0].getAttribute('class')).to.be.eql('testclass');
	});

	it('can add a className property', () => {
		const root = $c('div');
		root.appendChild($c('div'));
		const domA = h('div', {});
		const domB = h('div', {className: 'testclass'});

		updateChildren(root, domA, domB);
		expect(root.childNodes[0].attributes.length).to.be.eql(1);
		expect(root.childNodes[0].getAttribute('class')).to.be.eql('testclass');
	});

	it('can add a data attribute', () => {
		const root = $c('div');
		root.appendChild($c('div'));
		const domA = h('div', {});
		const domB = h('div', {'data-test': 'testvalue'});

		updateChildren(root, domA, domB);
		expect(root.childNodes[0].getAttribute('data-test')).to.be.eql('testvalue');
	});

	it('can update an attribute', () => {
		const root = $c('div');
		root.appendChild($c('div'));
		const domA = h('div', {class: 'testclass'});
		const domB = h('div', {class: 'anotherclass'});

		updateChildren(root, domA, domB);
		expect(root.childNodes[0].attributes.length).to.be.eql(1);
		expect(root.childNodes[0].getAttribute('class')).to.be.eql('anotherclass');
	});

	it('can remove an attribute', () => {
		const root = $c('div');
		root.appendChild($c('div'));
		const domA = h('div', {class: 'testclass'});
		const domB = h('div', {});

		updateChildren(root, domA, domB);
		expect(root.childNodes[0].attributes.length).to.be.eql(0);
	});

	it('can add an event handler', () => {
		const clickHandler = () => {};

		const root = $c('div');
		const domA = null;
		const domB = h('button', {onclick: clickHandler});

		updateChildren(root, domA, domB);
		expect(root.childNodes[0].onclick).to.be.eql(clickHandler);
	});
});


function $c(name) {
	return document.createElement(name);
}

function $t(name) {
	return document.createTextNode(name);
}
