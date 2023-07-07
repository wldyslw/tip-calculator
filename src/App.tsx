import {
    Fragment,
    useCallback,
    useMemo,
    useState,
    type ChangeEventHandler,
} from 'react';

import Input from './Input';
import Amount from './Amount';
import useNumericValidation from './useNumericValidation';

import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as Dollar } from '../images/icon-dollar.svg';
import { ReactComponent as Person } from '../images/icon-person.svg';

const predefinedTips = [5, 10, 15, 25, 50];

function App() {
    const [billInputProps, billValue, resetBill] = useNumericValidation('bill');
    const [customTipInputProps, customTipValue, resetCustomTip] =
        useNumericValidation('customTip', { allowZero: true });
    const [peopleInputProps, peopleValue, resetPeople] = useNumericValidation(
        'peopleAmount',
        {
            allowFractional: false,
        }
    );

    const [selectedPredefinedTip, setSelectedPredefinedTip] = useState<
        number | null
    >(null);
    const handleTipChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (e) => {
            const tipAmount = +e.target.value;
            setSelectedPredefinedTip(tipAmount);
            resetCustomTip();
        },
        [resetCustomTip]
    );

    const handleCustomTip = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (e) => {
            if (selectedPredefinedTip !== null) {
                setSelectedPredefinedTip(null);
            }
            customTipInputProps.onChange(e);
        },
        [customTipInputProps, selectedPredefinedTip]
    );

    const tip = selectedPredefinedTip ?? customTipValue;

    const canCalculateTotals = useMemo(() => {
        const validationErrors = [
            billInputProps,
            peopleInputProps,
            customTipInputProps,
        ].some((prop) => prop.errorMessage !== undefined);
        const emptyValues = [billValue, peopleValue, tip].some((val) =>
            Number.isNaN(val)
        );
        return !validationErrors && !emptyValues;
    }, [
        billInputProps,
        billValue,
        customTipInputProps,
        peopleInputProps,
        peopleValue,
        tip,
    ]);

    const tipAmount = useMemo(() => {
        return canCalculateTotals ? (tip / 100) * billValue : 0;
    }, [billValue, canCalculateTotals, tip]);

    const totalAmount = useMemo(() => {
        return canCalculateTotals ? (billValue + tipAmount) / peopleValue : 0;
    }, [billValue, canCalculateTotals, peopleValue, tipAmount]);

    const handleReset = useCallback(() => {
        resetBill();
        resetPeople();
        resetCustomTip();
        setSelectedPredefinedTip(null);
    }, [resetBill, resetCustomTip, resetPeople]);

    const canReset = useMemo(() => {
        return (
            selectedPredefinedTip ||
            [
                billInputProps.value,
                peopleInputProps.value,
                customTipInputProps.value,
            ].some((v) => v !== '')
        );
    }, [
        billInputProps.value,
        customTipInputProps.value,
        peopleInputProps.value,
        selectedPredefinedTip,
    ]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="my-10 lg:mb-16 lg:mt-0">
                <Logo />
            </div>
            <main className="mx-10 flex w-full max-w-2xl grow basis-full flex-col gap-5 rounded-t-3xl bg-white p-10 drop-shadow-2xl lg:w-auto lg:max-w-4xl lg:grow-0 lg:basis-auto lg:flex-row lg:rounded-b-3xl">
                <div id="form" className="lg:basis-6/12">
                    <Input
                        {...billInputProps}
                        icon={<Dollar />}
                        id="bill"
                        label="Bill"
                        placeholder="0"
                        className="pb-10"
                    />
                    <fieldset
                        id="tip"
                        className="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-3 pb-10 sm:grid-cols-[repeat(3,minmax(0,1fr))]"
                    >
                        <legend className="mb-2 text-cyan-dark-grayish">
                            Select Tip %
                        </legend>
                        {predefinedTips.map((tipAmount) => {
                            const radioId = `tip-${tipAmount}`;
                            return (
                                <Fragment key={tipAmount}>
                                    <input
                                        type="radio"
                                        name="tip"
                                        id={radioId}
                                        className="absolute opacity-0" // leaves it accessible
                                        value={tipAmount}
                                        checked={
                                            tipAmount === selectedPredefinedTip
                                        }
                                        onChange={handleTipChange}
                                    />
                                    <label
                                        htmlFor={radioId}
                                        className="bare-label basis-1/3 cursor-pointer self-center rounded-md bg-cyan-very-dark p-2 text-center text-2xl text-white active:bg-cyan-strong-light active:text-cyan-very-dark"
                                    >
                                        {tipAmount}%
                                    </label>
                                </Fragment>
                            );
                        })}
                        <Input
                            {...customTipInputProps}
                            onChange={handleCustomTip}
                            errorMessage={undefined}
                            id="customTip"
                            placeholder="Custom"
                            className="basis-1/3"
                        />
                    </fieldset>
                    <Input
                        {...peopleInputProps}
                        icon={<Person />}
                        id="peopleNumber"
                        label="Number of People"
                        placeholder="0"
                    />
                </div>
                <div
                    id="summary"
                    className="flex flex-col rounded-2xl bg-cyan-very-dark p-10 lg:basis-6/12"
                >
                    <Amount
                        label="Tip Amount"
                        amount={tipAmount}
                        className="mb-10"
                    />
                    <Amount
                        label="Total"
                        amount={totalAmount}
                        className="mb-10"
                    />
                    <button
                        disabled={!canReset}
                        onClick={handleReset}
                        className="mt-auto w-full rounded-md bg-cyan-strong p-2 text-2xl uppercase text-cyan-very-dark focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-cyan-strong active:bg-cyan-strong-light disabled:cursor-not-allowed disabled:bg-cyan-strong disabled:opacity-30"
                    >
                        Reset
                    </button>
                </div>
            </main>
        </div>
    );
}

export default App;
