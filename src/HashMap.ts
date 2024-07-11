import LinkedList from './LinkedList';
export default class HashMap {
	private capacity: number = 16;
	private readonly LOAD_FACTOR: number = 0.75;
	private buckets: LinkedList[];
	private hash(key: string): number {
		let hashCode: number = 0;
		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
		}
		return hashCode;
	}

	/**
	 * A helper function to mock index out-of-bounds behavior in less dynamic languages, as described in the prompt
	 */
	private getBucket(index: number) {
		if(index < 0 || index >= this.buckets.length) {
			throw new Error("Trying to access index out of bound");
		}
		return this.buckets[index];
	}

	public set(key: string, value: string): void {

	}

	public get(key:string): string {
		return;
	}

	public has(key: string): boolean {
		return;
	}

	public remove(key: string): boolean {
		return;
	}

	public length(): number {
		return;
	}

	public clear(): void {

	}

	public keys(): string[] {
		return;
	}

	public values(): string[] {
		return;
	}

	public entries(): string[][] {
		return;
	}
}
