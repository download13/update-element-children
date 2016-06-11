function createType(spec) {
	const memberIsInstances = [];
	const type = {};

	Object.keys(spec).forEach(key => {
		const member = createTypeMember(key, spec[key]);
		type[key] = member;
		memberIsInstances.push(member.isInstance);
	});

	// Is it an instance of any member type
	type.isInstance = t => memberIsInstances.some(isInstance => isInstance(t));
	type.case = (caseSpec, instance) => {
		if(!instance) throw new Error('Pass an instance as the second argument');
		let handler = caseSpec[instance.name];
		if(!handler) handler = caseSpec._;
		if(!handler) throw new Error('A type came along that you didn\'t check for. ' + instance.name);
		return handler(...instance._data);
	};
	return type;
}

function createTypeMember(name, spec) {
	if(!Array.isArray(spec)) throw new Error('createTypeMember takes an Array. Got ' + spec);

	const specValidators = spec.map(presetValidators);

	function ctor(...args) {
		if(args.length !== spec.length) {
			throw new Error(`Wrong number of arguments passed to ${name}. Needed ${spec.length}, got ${args.length}`);
		}

		Object.defineProperties(this, {
			name: {
				value: name,
				writable: false,
				enumerable: true
			},
			_data: {
				value: args,
				enumerable: false
			}
		});
		for(let i = 0; i < args.length; i++) {
			const arg = args[i];
			const validator = specValidators[i];
			if(!validator(arg)) {
				throw new Error(`${name}: Validation failed for argument ${i} with value ${arg} using ${validator.toString()}`);
			}
			this[i] = arg;
		}
	}

	function factory(...args) {
		return new ctor(...args);
	}
	ctor.prototype = {
		type: factory,
		toString() {
			return name + ' ' + this._data.join(' ');
		}
	};
	Object.defineProperties(factory, {
		name: {
			value: name,
			writable: false
		},
		isInstance: {
			value: t => t instanceof ctor,
			writable: false
		}
	});

	return factory;
}


function presetValidators(type) {
	if(typeof type === 'string') {
		switch(type) {
			case 'string':
				return isTypeOf('string');
			case 'number':
				return isTypeOf('number');
			case 'bool':
			case 'boolean':
				return isTypeOf('boolean');
			case 'array':
				return Array.isArray;
			case 'object':
				return isTypeOf('object');
			default:
				throw new Error('No preset available for ' + type);
		}
	}
	return type;
}

function isTypeOf(type) {
	const fn = a => typeof a === type;
	fn.toString = () => 'typeof a === ' + type;
	return fn;
}


module.exports = createType;
