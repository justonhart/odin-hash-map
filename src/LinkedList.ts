import Node from './Node';
export default class LinkedList {
	private firstNode: Node = null;

	/**
	 * Adds a new node containing {value} to the end of the list
	 */
	append(value: any): void {
		const newNode = new Node();
		newNode.value = value;
		if (this.firstNode === null) {
			this.firstNode = newNode;
		} else {
			this.tail().nextNode = newNode;
		}
	}

	/**
	 * Adds a new node containing {value} to the start of the list
	 */
	prepend(value: any): void {
		const newNode = new Node();
		newNode.value = value;
		newNode.nextNode = this.head();
		this.firstNode = newNode;
	}

	/**
	 * Returns the total number of nodes in the list
	 */
	size(): number {
		let lastNode = this.firstNode;
		let count = 0;

		while (lastNode !== null) {
			lastNode = lastNode.nextNode;
			count++;
		}

		return count;
	}

	/**
	 * Returns the first node in the list
	 */
	head(): Node | null {
		return this.firstNode;
	}

	/**
	 * Returns the last node in the list
	 */
	tail(): Node | null {
		let lastNode = this.firstNode;

		if (lastNode === null) {
			return null;
		}

		while (lastNode.nextNode !== null) {
			lastNode = lastNode.nextNode;
		}

		return lastNode;
	}

	/**
	 * Returns the node at the given index
	 */
	at(index: number): Node | null {
		let currentIndex = 0;
		let currentNode = this.firstNode;
		while (currentIndex < index) {
			if (currentNode === null) {
				return null;
			}
			currentNode = currentNode.nextNode;
			currentIndex++;
		}
		return currentNode;
	}

	/**
	 * Removes the last element from the list
	 */
	pop(): void {
		if (this.firstNode === null) {
			return;
		}

		if (this.firstNode.nextNode === null) {
			this.firstNode = null;
			return;
		}

		let penultimateNode = this.firstNode;
		while (penultimateNode.nextNode.nextNode !== null) {
			penultimateNode = penultimateNode.nextNode;
		}

		penultimateNode.nextNode = null;
	}

	/**
	 * Returns true if the passed-in key is in the list, otherwise false
	 */
	containsKey(key: string): boolean {
		let currentNode = this.firstNode;
		while (currentNode !== null) {
			if (currentNode.key === key) {
				return true;
			}
			currentNode = currentNode.nextNode;
		}
		return false;
	}

	/**
	 * Returns true if the passed-in value is in the list, otherwise false
	 */
	containsValue(value: string): boolean {
		let currentNode = this.firstNode;
		while (currentNode !== null) {
			if (currentNode.value === value) {
				return true;
			}
			currentNode = currentNode.nextNode;
		}
		return false;
	}

	/**
	 * Returns the index of the node containing the provided value, otherwise null
	 */
	getNodeByKey(key: string): Node | null {
		let currentIndex = 0;
		let currentNode = this.firstNode;
		while (currentNode !== null) {
			if (currentNode.key === key) {
				return currentNode;
			}
			currentIndex++;
			currentNode = currentNode.nextNode;
		}
		return null;
	}

	/**
	 * Returns the index of the node containing the provided value, otherwise null
	 */
	getNodeByValue(value: string): Node | null {
		let currentIndex = 0;
		let currentNode = this.firstNode;
		while (currentNode !== null) {
			if (currentNode.value === value) {
				return currentNode;
			}
			currentIndex++;
			currentNode = currentNode.nextNode;
		}
		return null;
	}

	/**
	 * Returns a string representation of the linked list
	 */
	toString(): string {
		let currentNode = this.firstNode;
		let returnVal: string = '';
		while (currentNode != null) {
			returnVal += `[${currentNode.key}: ${currentNode.value}] -> `;
			currentNode = currentNode.nextNode;
		}
		return returnVal + 'null';
	}

	getNodesAsArray(): Node[] {
		let arr = [];
		let currentNode = this.firstNode;
		while(currentNode != null) {
			arr.push(currentNode);
			currentNode = currentNode.nextNode;
		}
		return arr;
	}
}
