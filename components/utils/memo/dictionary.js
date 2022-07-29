const Node = () => ({ next: new Map() });

const add = (root) => (tokens, value) => {
	const leaf = tokens.reduce((node, token) => {
		const subNode = node.next.get(token);
		if (subNode) return subNode;
		const newNode = Node();
		node.next.set(token, newNode);
		return newNode;
	}, root);
	leaf.value = value;
};

const get = (root) => (tokens) => {
	let node = root;
	const l = tokens.length;
	for (let i = 0; node && i < l; i += 1) {
		node = node.next.get(tokens[i]);
	}
	return node && node.value;
};

const DictionaryAPI = (root) => ({
	add: add(root),
	get: get(root),
});

const Dictionary = () => DictionaryAPI(Node());

export default Dictionary;
