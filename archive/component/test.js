const expect = require('expect.js');
const lib = require('./individual');
const {
	h,
	diffNode,
	VNode,
	DOMChanges
} = lib;


describe('diffNode', () => {
	const {AddNode, RemoveNode, InsertNode, SetAttribute, RemoveAttribute} = DOMChanges;

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
			InsertNode(VNode.Text('txt'), 0)
		]);
	});

	it('can update a text child node', () => {
		const domA = h('div', {}, 'txt');
		const domB = h('div', {}, 'text');

		// TODO: Need keys
		expect(diffNode(domA, domB)).to.be.eql([
			RemoveNode()
		]);
	});

	it('can remove a text child node', () => {
		const domA = h('div', {}, 'txt');
		const domB = h('div', {});

		expect(diffNode(domA, domB)).to.be.eql([
			RemoveNode()
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
