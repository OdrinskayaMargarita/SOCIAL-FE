import { oneOfType, func, shape, object } from "prop-types";

// eslint-disable-next-line react/forbid-prop-types
const forwardRef = oneOfType([func, shape({ current: object })]);

export default forwardRef;
