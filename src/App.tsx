import {
    Fragment,
    useCallback,
    useMemo,
    useState,
    type ChangeEventHandler,
} from 'react';

import Input from './Input';
import Amount from './Amount';

import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as Dollar } from '../images/icon-dollar.svg';
import { ReactComponent as Person } from '../images/icon-person.svg';
import useNumericValidation from './useNumericValidation';

const defaultTips = [5, 10, 15, 25, 50];

const customTipValidator = () => undefined;

function App() {
    const [billInputProps, billValue, resetBill] = useNumericValidation('bill');
    const [customTipInputProps, customTipValue, resetCustomTip] =
        useNumericValidation('customTip', { validator: customTipValidator });
    const [peopleInputProps, peopleValue, resetPeople] = useNumericValidation(
        'peopleAmount',
        {
            allowFractional: false,
        }
    );
    const [selectedTip, setSelectedTip] = useState<number | null>(null);

    const handleCustomTip = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (e) => {
            if (selectedTip !== null) {
                setSelectedTip(null);
            }
            customTipInputProps.onInput(e);
        },
        [customTipInputProps, selectedTip]
    );

    const tip = selectedTip ?? customTipValue;

    const canCalculate = useMemo(() => {
        return [billValue, peopleValue, tip].some((v) => Number.isNaN(v));
    }, [billValue, peopleValue, tip]);

    const tipAmount = useMemo(() => {
        return canCalculate ? 0 : (tip / 100) * billValue;
    }, [billValue, canCalculate, tip]);

    const totalAmount = useMemo(() => {
        return canCalculate ? 0 : (billValue + tipAmount) / peopleValue;
    }, [billValue, canCalculate, peopleValue, tipAmount]);

    const reset = useCallback(() => {
        resetBill();
        resetPeople();
        resetCustomTip();
    }, [resetBill, resetCustomTip, resetPeople]);

    const canReset = useMemo(() => {
        return [
            billInputProps.value,
            peopleInputProps.value,
            customTipInputProps.value,
        ].some((v) => v !== '');
    }, [
        billInputProps.value,
        customTipInputProps.value,
        peopleInputProps.value,
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
                        {defaultTips.map((tipAmount) => {
                            const radioId = `tip-${tipAmount}`;
                            return (
                                <Fragment key={tipAmount}>
                                    <input
                                        type="radio"
                                        name="tip"
                                        id={radioId}
                                        className="absolute opacity-0"
                                        value={tipAmount}
                                        checked={tipAmount === selectedTip}
                                        onChange={() => {
                                            setSelectedTip(tipAmount);
                                            resetCustomTip();
                                        }}
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
                            onInput={handleCustomTip}
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
                        onClick={reset}
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
