import {
    useCallback,
    useState,
    type ChangeEventHandler,
    // type FocusEventHandler,
    type KeyboardEventHandler,
    // type ClipboardEventHandler,
    useMemo,
    useDebugValue,
    useRef,
} from 'react';

type UseNumericValidationOptions = {
    allowFractional: boolean;
    allowZero: boolean;
    validator: (value: number) => string | undefined;
};

type UseNumericValidationType = (
    name: string,
    options?: Partial<UseNumericValidationOptions>
) => [
    {
        onChange: ChangeEventHandler<HTMLInputElement>;
        value: string;
        name: string;
        invalid: boolean;
        errorMessage?: string;
    },
    number,
    () => void
];

const useNumericValidation: UseNumericValidationType = (name, options = {}) => {
    const { allowFractional = true, allowZero = false } = options;

    const validate = useCallback(
        (value: number) => {
            if (
                Number.isNaN(value) ||
                (!allowFractional && !Number.isInteger(value))
            ) {
                return 'Invalid input!';
            }
            if (!allowZero && value === 0) {
                return 'Cannot be zero!';
            }
            if (value < 0) {
                return 'Negative? Impossible!';
            }
            return undefined;
        },
        [allowFractional, allowZero]
    );

    const ref = useRef<HTMLInputElement | null>(null);
    const [rawValue, setRawValue] = useState('');
    const numericValue = useMemo(
        () => (rawValue === '' ? NaN : +rawValue.replace(',', '.')),
        [rawValue]
    );

    const errorMessage = useMemo(() => {
        return rawValue === '' ? undefined : validate(numericValue);
    }, [numericValue, rawValue, validate]);

    useDebugValue(errorMessage ?? 'Valid');

    const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
        const { value } = e.currentTarget;
        setRawValue(value);
    }, []);

    const onKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
        (e) => {
            if (e.key === 'Escape') {
                ref.current?.blur();
            }
        },
        []
    );

    const reset = useCallback(() => {
        setRawValue('');
    }, []);

    return [
        {
            ref,
            onKeyDown,
            onChange,
            value: rawValue,
            name,
            invalid: !!errorMessage,
            errorMessage,
        },
        numericValue,
        reset,
    ];
};

export default useNumericValidation;
