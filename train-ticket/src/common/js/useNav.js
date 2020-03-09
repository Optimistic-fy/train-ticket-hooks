import { useCallback } from 'react';
import { getStartDate } from './fp';

export default function useNav(departDate, dispatch, prevDate, nextDate) {
    const isPrevDisabled = getStartDate(departDate) <= getStartDate();
    const isNextDisabled = getStartDate(departDate) - getStartDate() > 20 * 86400 * 1000;

    const prev = useCallback(() => {
        if (isPrevDisabled) {
            return;
        }
        dispatch(prevDate());
    }, [isPrevDisabled]);

    const next = useCallback(() => {
        if (isNextDisabled) {
            return;
        }
        dispatch(nextDate());
    }, [isNextDisabled]);

    return {
        isPrevDisabled,
        isNextDisabled,
        prev,
        next,
    };
}
