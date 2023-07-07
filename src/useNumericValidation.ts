import {
    useCallback,
    useState,
    type ChangeEventHandler,
    type FocusEventHandler,
    type KeyboardEventHandler,
    type ClipboardEventHandler,
    useMemo,
    useDebugValue,
    useRef,
} from 'react';

/**
 * @param value source value
 * @returns error message (i.e. `string`) if any, `undefined` otherwise
 */
const getErrorMsg = (value: number): string | undefined => {
    if (Number.isNaN(value)) {
        return 'Invalid input!';
    }
    if (value === 0) {
        return 'Cannot be zero!';
    }
    if (value < 0) {
        return 'Negative? Impossible!';
    }
    return undefined;
};

type UseNumericValidationOptions = {
    allowFractional: boolean;
    validator: (value: number) => string | undefined;
};

type UseNumericValidationType = (
    name: string,
    options?: Partial<UseNumericValidationOptions>
) => [
    {
        onInput: ChangeEventHandler<HTMLInputElement>;
        onBlur: FocusEventHandler<HTMLInputElement>;
        value: string;
        name: string;
        invalid: boolean;
        errorMessage?: string;
    },
    number,
    () => void
];

const useNumericValidation: UseNumericValidationType = (name, options = {}) => {
    const { allowFractional = true, validator = getErrorMsg } = options;

    const ref = useRef<HTMLInputElement | null>(null);
    const [rawValue, setRawValue] = useState('');
    const numericValue = useMemo(() => parseFloat(rawValue), [rawValue]);
    const [errorMessage, setErrorMessage] =
        useState<ReturnType<typeof getErrorMsg>>(undefined);

    useDebugValue(errorMessage ?? 'Valid');

    const onInput = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (e) => {
            if (errorMessage) {
                setErrorMessage(undefined);
            }
            const { value } = e.currentTarget;
            setRawValue(value);
        },
        [errorMessage]
    );

    const onPaste = useCallback<ClipboardEventHandler<HTMLInputElement>>(
        (e) => {
            e.preventDefault();
            const text = e.clipboardData.getData('text');
            const parsedData = allowFractional
                ? parseFloat(text)
                : parseInt(text);
            if (!Number.isNaN(parsedData)) {
                if (errorMessage) {
                    setErrorMessage(undefined);
                }
                setRawValue(parsedData.toString());
            }
        },
        [allowFractional, errorMessage]
    );

    const onBlur = useCallback<FocusEventHandler<HTMLInputElement>>(() => {
        const error = validator(numericValue);
        setErrorMessage(error);
    }, [numericValue, validator]);

    const onKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
        (e) => {
            if (e.key === 'Escape') {
                ref.current?.blur();
            }
            // allow only numbers, but also shortcuts (with ctrl and meta key)
            const regex = allowFractional ? /[0-9.]/ : /[0-9]/;
            if (
                !e.ctrlKey &&
                !e.metaKey &&
                e.key !== 'Backspace' &&
                e.key !== 'Delete' &&
                e.key !== 'Tab' &&
                !regex.test(e.key)
            ) {
                e.preventDefault();
            }
        },
        [allowFractional]
    );

    const reset = useCallback(() => {
        if (ref.current) {
            ref.current.value = '';
        }
        setRawValue('');
        setErrorMessage(undefined);
    }, []);

    return [
        {
            ref,
            onKeyDown,
            onInput,
            onBlur,
            onPaste,
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
