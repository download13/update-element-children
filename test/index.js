const expect = require('expect.js');
const {h, updateChildren} = require('../dist');
const jsdom = require('mocha-jsdom');


describe('h', () => {
	it('creates a vnode', () => {
		const vnode = h('div', null);
		expect(vnode).to.be.eql({
			type: 'div',
			props: {},
			children: []
		});
	});
	it('creates nested vnodes', () => {
		const vnode = h('div', null, h('span'));
		expect(vnode).to.be.eql({
			type: 'div',
			props: {},
			children: [{type: 'span', props: {}, children: []}]
		});
	});
	it('creates nested vnodes with string children', () => {
		const vnode = h('div', null, 'teststring');
		expect(vnode).to.be.eql({
			type: 'div',
			props: {},
			children: ['teststring']
		});
	});
	it('creates nested vnodes with null children', () => {
		const vnode = h('div', null, null);
		expect(vnode).to.be.eql({
			type: 'div',
			props: {},
			children: [null]
		});
	});
	it('creates nested vnodes with undefined children', () => {
		const vnode = h('div', null, undefined);
		expect(vnode).to.be.eql({
			type: 'div',
			props: {},
			children: [null]
		});
	});
});

describe('updateChildren', () => {
	jsdom();

	it('can add an element', () => {
		const root = document.createElement('div');
		const domA = null;
		const domB = h('div', null);

		updateChildren(root, domA, domB);
		expect(root.childNodes.length).to.be.eql(1);
		expect(root.childNodes[0].localName).to.be.eql('div');
	});

	it('can remove an element', () => {
		const root = document.createElement('div');
		root.appendChild(document.createElement('div'));
		const domA = h('div', null);
		const domB = null;

		updateChildren(root, domA, domB);
		expect(root.childNodes.length).to.be.eql(0);
	});

	xit('can add a text child node', () => {
		const domA = h('div', {});
		const domB = h('div', {}, 'txt');

		//console.log(54, diffNode(domA, domB));
		expect(diffNode(domA, domB)).to.be.eql([
			InsertChild(VNode.Text('txt'), 0)
		]);
	});

	xit('can update a text child node', () => {
		const domA = h('div', {}, 'txt');
		const domB = h('div', {}, 'text');

		// TODO: Need keys
		expect(diffNode(domA, domB)).to.be.eql([
			UpdateChild(VNode.Text('text'))
		]);
	});

	xit('can remove a text child node', () => {
		const domA = h('div', {}, 'txt');
		const domB = h('div', {});

		expect(diffNode(domA, domB)).to.be.eql([
			RemoveChild(0)
		]);
	});

	xit('can add an attribute', () => {
		const domA = h('div', {});
		const domB = h('div', {'class': 'testclass'});

		expect(diffNode(domA, domB)).to.be.eql([
			SetAttribute('class', 'testclass')
		]);
	});

	xit('can update an attribute', () => {
		const domA = h('div', {'class': 'testclass'});
		const domB = h('div', {'class': 'anotherclass'});

		expect(diffNode(domA, domB)).to.be.eql([
			SetAttribute('class', 'anotherclass')
		]);
	});

	xit('can remove an attribute', () => {
		const domA = h('div', {'class': 'testclass'});
		const domB = h('div', {});

		expect(diffNode(domA, domB)).to.be.eql([
			RemoveAttribute('class')
		]);
	});
});
