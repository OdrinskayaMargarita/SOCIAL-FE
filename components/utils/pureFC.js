import React from "react";

const pureFC = (Component) => Object.assign(React.memo(Component), Component);

export default pureFC;
