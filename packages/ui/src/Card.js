import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Card = ({ title, children, className, ...rest }) => {
    const classes = `card mb-3 ${className ?? ''}`.trim();
    return (_jsxs("div", { className: classes, ...rest, children: [title && (_jsx("div", { className: "card-header text-end", children: _jsx("strong", { children: title }) })), _jsx("div", { className: "card-body text-end", children: children })] }));
};
export default Card;
