const Type = require('./index');
const assert = require('assert');


describe('Type', () => {
	let Test;

	function isAlice(a) {
		return a === 'alice';
	}

	it('creates types', () => {
		Test = Type({
			Experiment: [],
			Trial: [],
			Observation: ['number'],
			Study: [isAlice]
		});

		assert(Test);
	});
	it('has members', () => {
		assert(Test.Experiment);
		assert(Test.Trial);
	});
	it('can test for type membership', () => {
		const {Experiment, Trial} = Test;
		assert(Experiment.isInstance(Experiment()));
		assert(Trial.isInstance(Trial()));
		assert(!Experiment.isInstance(Trial()));
		assert(!Trial.isInstance(Experiment()));
		assert(Test.isInstance(Experiment()));
		assert(Test.isInstance(Trial()));
	});
	it('validates input on member creation', () => {
		const {Experiment, Observation, Study} = Test;

		Experiment();
		Observation(6);
		Study('alice');

		assert.throws(() => {
			Experiment(0);
		});
		assert.throws(() => {
			Observation('a string');
		});
		assert.throws(() => {
			Study('bob');
		});
	});
	xit('', () => {});
});
