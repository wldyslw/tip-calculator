import type React from 'react';
import { memo, useMemo } from 'react';

type HtmlDivProps = Omit<
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >,
    'className'
>;

type AmountProps = HtmlDivProps & {
    label: string;
    amount: number;
    className?: string;
};

const Amount: React.FC<AmountProps> = ({
    label,
    amount,
    className,
    ...props
}) => {
    const parsedAmount = useMemo(() => {
        return amount.toFixed(2);
    }, [amount]);

    /**
     * Changes font scale if numbers get too long.
     * For the sake of simplicity, it purely empirical for this very project.
     *
     * Based on the following function: https://www.wolframalpha.com/input?i=plot+1-ln%28x%29%2F4+%2B+0.03+from+-1+to+25,
     *
     * where x is the amount of symbols minus threshold of 5 symbols, before which nothing gets scaled.
     *
     * 'Fast inverse square root' in scale of this project :)
     */
    const fontSizeScalingFactor = useMemo(() => {
        const length = parsedAmount.length;
        const maxSymbols = 5; // after that number of symbols font should get smaller
        const overflow = parsedAmount.length - maxSymbols;
        return length <= maxSymbols ? 1 : 1 - Math.log(overflow) / 4 + 0.03;
    }, [parsedAmount.length]);

    return (
        <div
            {...props}
            className={`flex items-center justify-between ${className ?? ''}`}
        >
            <div>
                <span className="block text-xs text-white sm:text-base">
                    {label}
                </span>
                <span className="block text-xs text-cyan-dark-grayish sm:text-base">
                    / person
                </span>
            </div>
            <span
                style={{
                    fontSize: `calc(var(--amount-block-base-text-size) * ${fontSizeScalingFactor})`,
                }}
                className="grow text-end text-3xl text-cyan-strong sm:text-5xl"
            >
                ${parsedAmount}
            </span>
        </div>
    );
};

const MemoizedAmount = memo(Amount);

export default MemoizedAmount;
