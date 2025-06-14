import { memo } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    variant: ButtonVariant;
};

const variantStyles: { [key in ButtonVariant]: string } = {
    primary:
        "flex-1 rounded-lg bg-red-500 px-6 py-3 font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-300 cursor-pointer",
    secondary:
        "flex-1 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 cursor-pointer",
};

export const Button = memo((props: ButtonProps) => {
    const { children, onClick, disabled, variant, type } = props;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`${variantStyles[variant]}`}
        >
            {children}
        </button>
    );
});
