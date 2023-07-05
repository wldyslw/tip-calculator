import type React from 'react';
import { memo } from 'react';

type HtmlInputProps = Omit<
    React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >,
    'id' | 'type' | 'className'
>;

type InputProps = HtmlInputProps & {
    id: string;
    icon?: React.ReactNode;
    invalid?: boolean;
    label?: string;
    errorMessage?: string;
    className?: string;
    inputClasses?: string;
    labelClasses?: string;
    errorLabelClasses?: string;
};

const Input: React.FC<InputProps> = ({
    id,
    icon,
    invalid,
    label,
    errorMessage,
    className,
    inputClasses,
    labelClasses,
    errorLabelClasses,
    ...props
}) => {
    return (
        <div className={`flex flex-wrap justify-between ${className ?? ''}`}>
            <label
                id="mainLabel"
                htmlFor={id}
                className={`text-cyan-dark-grayish ${labelClasses ?? ''}`}
            >
                {label}
            </label>
            <label
                htmlFor={id}
                id="errorLabel"
                className={`text-error ${errorLabelClasses ?? ''}`}
            >
                {errorMessage}
            </label>
            <div className="relative mt-2 w-full">
                <i className="absolute left-3 top-1/2 block h-4 w-4 -translate-y-1/2">
                    {icon}
                </i>
                <input
                    {...props}
                    className={`remove-arrows w-full rounded-md bg-cyan-very-light-grayish px-3 py-1 text-end text-2xl text-cyan-very-dark placeholder:p-0 placeholder:text-cyan-grayish ${
                        invalid
                            ? 'caret-error outline outline-[3px] outline-error'
                            : 'caret-cyan-strong focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-cyan-strong '
                    } ${inputClasses ?? ''}`}
                    type="number"
                    id={id}
                />
            </div>
        </div>
    );
};

const MemoizedInput = memo(Input);

export default MemoizedInput;
