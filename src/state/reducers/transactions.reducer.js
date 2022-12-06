import {createSlice} from '@reduxjs/toolkit';
// import type {User} from '../services/userAuthServices';
// import {RootState} from '../store';

const slice = createSlice({
  name: 'transactionreducers',
  initialState: {
    deposits: null,
    withdrawals: null,
  },
  reducers: {
    setDeposits: (state, {payload: {deposits}}) => {
      state.deposits = deposits;
    },
    addDeposits: (state, {payload: {transaction}}) => {
      state.transactions = [...state.transactions, transaction];
    },

    setWithdrawals: (state, {payload: {withdrawals}}) => {
      state.withdrawals = withdrawals;
    },
    addWithdrawals: (state, {payload: {withdrawal}}) => {
      state.withdrawals = [...state.withdrawals, withdrawal];
    },
  },
});

export const {setDeposits, setWithdrawals} = slice.actions;

export default slice.reducer;

export const selectDeposits = state => state.transactions.deposits;
export const selectWithdrawals = state => state.transactions.withdrawals;
