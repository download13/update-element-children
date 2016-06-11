const expect = require('expect.js');
const {VNode, DOMChanges} = require('./types');
const {h, diffNode, updateNode} = require('./index');
const {Document} = require('simple-dom');


const {AddNode, RemoveNode, InsertChild, UpdateChild, RemoveChild, SetAttribute, RemoveAttribute} = DOMChanges;


describe('diffNode', () => {
	it('can add an element', () => {
		const domA = null;
		const domB = h('div', null);

		expect(diffNode(domA, domB)).to.be.eql([
			AddNode(
				VNode.Element('div', {}, [])
			)
		]);
	});

	it('can remove an element', () => {
		const domA = h('div', null);
		const domB = null;

		expect(diffNode(domA, domB)).to.be.eql([
			RemoveNode()
		]);
	});

	it('can add a text child node', () => {
		const domA = h('div', {});
		const domB = h('div', {}, 'txt');

		//console.log(54, diffNode(domA, domB));
		expect(diffNode(domA, domB)).to.be.eql([
			InsertChild(VNode.Text('txt'), 0)
		]);
	});

	it('can update a text child node', () => {
		const domA = h('div', {}, 'txt');
		const domB = h('div', {}, 'text');

		// TODO: Need keys
		expect(diffNode(domA, domB)).to.be.eql([
			UpdateChild(VNode.Text('text'))
		]);
	});

	it('can remove a text child node', () => {
		const domA = h('div', {}, 'txt');
		const domB = h('div', {});

		expect(diffNode(domA, domB)).to.be.eql([
			RemoveChild(0)
		]);
	});

	it('can add an attribute', () => {
		const domA = h('div', {});
		const domB = h('div', {'class': 'testclass'});

		expect(diffNode(domA, domB)).to.be.eql([
			SetAttribute('class', 'testclass')
		]);
	});

	it('can update an attribute', () => {
		const domA = h('div', {'class': 'testclass'});
		const domB = h('div', {'class': 'anotherclass'});

		expect(diffNode(domA, domB)).to.be.eql([
			SetAttribute('class', 'anotherclass')
		]);
	});

	it('can remove an attribute', () => {
		const domA = h('div', {'class': 'testclass'});
		const domB = h('div', {});

		expect(diffNode(domA, domB)).to.be.eql([
			RemoveAttribute('class')
		]);
	});
});

describe('updateNode', () => {
	const document = new Document();

	it('adds a node', () => {
		const root = document.createElement('div');
		const diff = [AddNode(VNode.Element('span', {}, []))];

		updateNode(document, root, diff);

		expect(root.childNodes.item(0)).to.have.property('nodeName', 'SPAN');
		expect(root.childNodes.item(1)).to.be(null);
	});

	it('adds a nested node', () => {
		const root = document.createElement('div');
		const diff = [AddNode(VNode.Element('span', {}, [
			VNode.Text('some text')
		]))];

		updateNode(document, root, diff);

		expect(root.childNodes.item(0)).to.have.property('nodeName', 'SPAN');
		expect(root.firstChild.firstChild).to.have.property('nodeValue', 'some text');
		expect(root.childNodes.item(1)).to.be(null);
	});
});
