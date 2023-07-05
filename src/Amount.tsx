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

    return (
        <div
            {...props}
            className={`flex items-center justify-between ${className ?? ''}`}
        >
            <div>
                <span className="block text-white">{label}</span>
                <span className="block text-cyan-dark-grayish">/ person</span>
            </div>
            <span className="grow text-end text-3xl text-cyan-strong sm:text-5xl">
                ${parsedAmount}
            </span>
        </div>
    );
};

const MemoizedAmount = memo(Amount);

export default MemoizedAmount;
