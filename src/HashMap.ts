import LinkedList from './LinkedList';
export default class HashMap {
	private capacity: number;
	private readonly LOAD_FACTOR: number = 0.75;
	private buckets: LinkedList[];

	constructor() {
		this.capacity = 16;
		this.buckets = [];
		this.createBuckets();
	}

	/**
	 * Populate the buckets array with new LinkedLists
	 */
	private createBuckets(): void {
		for (let i = 0; i < this.capacity; i++) {
			this.buckets[i] = new LinkedList();
		}
	}

	/**
	 * Compute the hash for a given key to decide which bucket the node belongs in
	 */
	private hash(key: string): number {
		let hashCode: number = 0;
		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
		}
		return hashCode % this.capacity;
	}

	/**
	 * Gets the number of non-empty buckets. Used for calculating load and determining when to resize
	 */
	private getNonEmptyBucketCount(): number {
		return this.buckets.reduce(
			(sum, next) => (sum + next.size() > 0 ? 1 : 0),
			0,
		);
	}

	/**
	 * A helper function to mock index out-of-bounds behavior in less dynamic languages, as described in the prompt
	 */
	private getBucket(index: number): LinkedList {
		if (index < 0 || index >= this.buckets.length) {
			throw new Error('Trying to access index out of bound');
		}
		return this.buckets[index];
	}

	/**
	 * Resize the buckets array, doubling capacity and reducing load. Replace all old values at their new locations
	 */
	private resize(): void {
		const oldBuckets = this.buckets;
		this.capacity *= 2;
		this.createBuckets();

		oldBuckets.forEach((bucket) => {
			bucket.getNodesAsArray().forEach((node) => {
				this.set(node.key, node.value);
			});
		});
	}

	/**
	 * Create the provided key-value pair in the hashmap
	 */
	public set(key: string, value: string): void {
		let keyhash = this.hash(key);
		if (this.getBucket(keyhash).containsKey(key)) {
			let index = this.getBucket(keyhash).getNodeByKey(key);
			this.getBucket(keyhash).removeNodeAtIndex(index);
		}

		this.getBucket(keyhash).append(key, value);

		if (this.length() > this.capacity * this.LOAD_FACTOR) {
			console.log(
				`After setting ${key} at length ${this.length()}, resizing`,
			);
			this.resize();
		}
	}

	/**
	 * Returns the value associated to provided key. If not found, returns null
	 */
	public get(key: string): string | null {
		let keyhash = this.hash(key);
		let nodeIndex = this.getBucket(keyhash).getNodeByKey(key);
		return this.getBucket(keyhash).at(nodeIndex).value;
	}

	/**
	 * Returns true if any bucket contains the provided key, otherwise false
	 */
	public has(key: string): boolean {
		let keyhash = this.hash(key);
		return this.getBucket(keyhash).containsKey(key);
	}

	/**
	 * If a node with the provided key exists, removes that node and returns true; otherwise false
	 */
	public remove(key: string): boolean {
		let keyhash = this.hash(key);
		let bucket = this.getBucket(keyhash);
		if (bucket.containsKey(key)) {
			let nodeIndex = bucket.getNodeByKey(key);
			bucket.removeNodeAtIndex(nodeIndex);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Returns the number of stored key-value pairs
	 */
	public length(): number {
		let count = 0;
		this.buckets.forEach((bucket) => {
			count += bucket.size();
		});
		return count;
	}

	/**
	 * Removes all key-value pairs and resizes the bucket array back to 16
	 */
	public clear(): void {
		this.capacity = 16;
		this.buckets = [];
		this.createBuckets();
	}

	/**
	 * Returns all keys in the hashmap in an array
	 */
	public keys(): string[] {
		let keys = [];
		this.buckets.forEach((bucket) =>
			keys.push(...bucket.getNodesAsArray().map((node) => node.key)),
		);
		return keys;
	}

	/**
	 * Returns all values in the hashmap in an array
	 */
	public values(): string[] {
		let values = [];
		this.buckets.forEach((bucket) =>
			values.push(...bucket.getNodesAsArray().map((node) => node.value)),
		);
		return values;
	}

	/**
	 * Returns all key-value pairs in the hashmap as an array of pair arrays
	 */
	public entries(): string[][] {
		let entries = [];

		this.buckets.forEach((bucket) => {
			entries.push(
				...bucket.getNodesAsArray().map((node) => {
					return [node.key, node.value];
				}),
			);
		});

		return entries;
	}

	public getLoadRatio(): number {
		return this.length() / this.capacity;
	}
}
