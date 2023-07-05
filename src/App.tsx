import { Fragment } from 'react';

import Input from './Input';
import Amount from './Amount';

import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as Dollar } from '../images/icon-dollar.svg';
import { ReactComponent as Person } from '../images/icon-person.svg';

const defaultTips = [5, 10, 15, 25, 50];

function App() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="my-10 lg:mb-16 lg:mt-0">
                <Logo />
            </div>
            <main className="mx-10 flex w-full max-w-2xl grow basis-full flex-col gap-5 rounded-t-3xl bg-white p-10 drop-shadow-2xl lg:w-auto lg:max-w-4xl lg:grow-0 lg:basis-auto lg:flex-row lg:rounded-b-3xl">
                <div id="form" className="lg:basis-6/12">
                    <Input
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
                                    />
                                    <label
                                        htmlFor={radioId}
                                        className="bare-label basis-1/3 cursor-pointer rounded-md bg-cyan-very-dark p-3 text-center text-2xl text-white active:bg-cyan-strong-light active:text-cyan-very-dark"
                                    >
                                        {tipAmount}%
                                    </label>
                                </Fragment>
                            );
                        })}
                        <Input
                            id="customTip"
                            placeholder="Custom"
                            className="basis-1/3"
                        />
                    </fieldset>
                    <Input
                        icon={<Person />}
                        errorMessage="Cannot be zero!"
                        invalid
                        id="peopleNumber"
                        label="Number of People"
                        placeholder="0"
                    />
                </div>
                <div
                    id="summary"
                    className="flex flex-col rounded-2xl bg-cyan-very-dark p-10 lg:basis-6/12"
                >
                    <Amount label="Tip Amount" amount={0} className="mb-10" />
                    <Amount label="Total" amount={0} className="mb-10" />
                    <button
                        disabled
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
