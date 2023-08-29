/* eslint-disable react/prop-types */

const RenderIf = ({ children, isTrue, fallback }) =>
  isTrue ? children : fallback || null;

export default RenderIf;
