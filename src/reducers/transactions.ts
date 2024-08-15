export interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

type TransactionsState = {
  transactions: Transaction[];
};

type TransactionsAction =
  | {
      type: "ADD_TRANSACTION";
      payload: Transaction;
    }
  | {
      type: "LOAD_TRANSACTIONS";
      payload: Transaction[];
    };

export function transactionsReducer(
  state: TransactionsState,
  action: TransactionsAction
): TransactionsState {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "LOAD_TRANSACTIONS":
      return { ...state, transactions: action.payload };
    default:
      return state;
  }
}
