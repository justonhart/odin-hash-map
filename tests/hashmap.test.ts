import HashMap from '../src/HashMap';

let map: HashMap;

beforeEach(() => {
	map = new HashMap();
	map.set('one', '1');
	map.set('two', '2');
	map.set('three', '3');
	map.set('four', '4');
	map.set('five', '5');
});

test('verify that set overwrites existing keys', () => {
	map.set('one', 'ONE');
	expect(map.get('one')).toBe('ONE');
});

test('test get', () => {
	expect(map.get('three')).toBe('3');
	expect(map.get('six')).toBeNull;
	map.set('six', '6');
	expect(map.get('six')).toBe('6');
});

test('test has', () => {
	expect(map.has('three')).toBe(true);
	expect(map.has('six')).toBe(false);
	map.set('six', '6');
	expect(map.has('six')).toBe(true);
});

test('test remove', () => {
	expect(map.has('three')).toBe(true);
	map.remove('three');
	expect(map.has('three')).toBe(false);
});

test('test length', () => {
	expect(map.length()).toBe(5);
});

test('test clear', () => {
	map.clear();
	expect(map.length()).toBe(0);
});

test('project-defined test script', () => {
	//clear out the predefined values
	map.clear();

	map.set('apple', 'red');
	map.set('banana', 'yellow');
	map.set('carrot', 'orange');
	map.set('dog', 'brown');
	map.set('elephant', 'gray');
	map.set('frog', 'green');
	map.set('grape', 'purple');
	map.set('hat', 'black');
	map.set('ice cream', 'white');
	map.set('jacket', 'blue');
	map.set('kite', 'pink');
	map.set('lion', 'golden');

	expect(map.getLoadRatio()).toBe(0.75);

	map.set('lion', 'cat');
	map.set('kite', 'small');
	map.set('ice cream', 'vanilla');

	expect(map.getLoadRatio()).toBe(0.75);

	map.set('moon', 'silver');
	expect(map.getLoadRatio()).toBeLessThan(0.75);
});
