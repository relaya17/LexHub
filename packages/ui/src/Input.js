import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Input = ({ label, id, ...rest }) => {
    const inputId = id ?? (label ? `input-${label}` : undefined);
    return (_jsxs("div", { className: "mb-3 text-end", children: [label && (_jsx("label", { className: "form-label", htmlFor: inputId, children: label })), _jsx("input", { id: inputId, className: "form-control", ...rest })] }));
};
export default Input;
