const oneOf = (list, value, defValue) =>
	Array.isArray(list) && list.includes(value) ? value : defValue;

export default oneOf;
