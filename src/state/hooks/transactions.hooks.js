import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {
  selectDeposits,
  selectWithdrawals,
} from '../reducers/transactions.reducer';

export const useTransactions = () => {
  const deposits = useSelector(selectDeposits);
  const withdrawals = useSelector(selectWithdrawals);

  return useMemo(() => ({deposits, withdrawals}), [deposits, withdrawals]);
};
