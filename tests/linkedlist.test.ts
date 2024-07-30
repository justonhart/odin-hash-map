import LinkedList from '../src/LinkedList';

let list: LinkedList;

beforeEach(() => {
	list = new LinkedList();
});

test('append sets head in new list', () => {
	list.append('one', '1');
	expect(list.head()?.value).toBe('1');
});

test('prepend sets head in new list', () => {
	list.prepend('one', '1');
	expect(list.head()?.value).toBe('1');
});

test('tail is head in list with single item', () => {
	list.append('one', '1');
	expect(list.tail()?.value).toBe('1');
});

test('size returns number of nodes in list', () => {
	expect(list.size()).toBe(0);
	list.append('one', '1');
	expect(list.size()).toBe(1);
	list.append('ten', '10');
	expect(list.size()).toBe(2);
});

test('at returns the node at given index', () => {
	expect(list.at(0)).toBeNull();
	list.append('one', '1');
	expect(list.at(0)?.value).toBe('1');
});

test('pop removes the last existing node', () => {
	list.pop();
	expect(list.size()).toBe(0);
	list.append('one', '1');
	list.pop();
	expect(list.size()).toBe(0);
});

test('containsKey works as expected', () => {
	expect(list.containsKey('eleven')).toBe(false);
	list.append('one', '1');
	expect(list.containsKey('eleven')).toBe(false);
	list.append('eleven', '11');
	expect(list.containsKey('eleven')).toBe(true);
});

test('containsValue works as expected', () => {
	expect(list.containsValue('11')).toBe(false);
	list.append('one', '1');
	expect(list.containsValue('11')).toBe(false);
	list.append('eleven', '11');
	expect(list.containsValue('11')).toBe(true);
});

test('getNodeByKey works as expected', () => {
	expect(list.getNodeByKey('eleven')).toBeNull();
	list.append('one', '1');
	expect(list.getNodeByKey('eleven')).toBeNull();
	list.append('eleven', '11');
	expect(list.getNodeByKey('eleven')).toBe(1);
});

test('getNodeByValue works as expected', () => {
	expect(list.getNodeByValue('11')).toBeNull();
	list.append('one', '1');
	expect(list.getNodeByValue('11')).toBeNull();
	list.append('eleven', '11');
	expect(list.getNodeByValue('11')).toBe(1);
});

test('toString prints key-value pairs in order, ending with null', () => {
	expect(list.toString()).toEqual('null');
	for(let i = 1; i < 6; i++) {
		list.append(i.toString(), i.toString());
	}
	expect(list.toString()).toEqual('[1: 1] -> [2: 2] -> [3: 3] -> [4: 4] -> [5: 5] -> null');

	list = new LinkedList();
	for(let i = 1; i < 6; i++) {
		list.prepend(i.toString(), i.toString());
	}
	expect(list.toString()).toEqual('[5: 5] -> [4: 4] -> [3: 3] -> [2: 2] -> [1: 1] -> null');
});

test('removeNodeAtIndex works as expected mid-list', () => {
	list.append('one', '1');
	list.append('two', '2');
	list.append('three', '3');
	list.removeNodeAtIndex(1);
	expect(list.tail()?.value).toBe('3');
	expect(list.size()).toBe(2);
	expect(list.toString()).toEqual('[one: 1] -> [three: 3] -> null');
});

test('removeNodeAtIndex works as expected with index 0', () => {
	list.append('one', '1');
	list.append('two', '2');
	list.append('three', '3');
	list.removeNodeAtIndex(0);
	expect(list.tail()?.value).toBe('3');
	expect(list.size()).toBe(2);
	expect(list.toString()).toEqual('[two: 2] -> [three: 3] -> null');
});
