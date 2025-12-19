import { jsx as _jsx } from "react/jsx-runtime";
const variantClassName = (variant) => {
    switch (variant) {
        case 'secondary':
            return 'btn btn-secondary';
        case 'outline':
            return 'btn btn-outline-primary';
        case 'primary':
        default:
            return 'btn btn-primary';
    }
};
export const Button = ({ variant = 'primary', className, ...rest }) => {
    const classes = `${variantClassName(variant)} ${className ?? ''}`.trim();
    return _jsx("button", { className: classes, ...rest });
};
export default Button;
