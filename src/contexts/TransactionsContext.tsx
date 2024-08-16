import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type PropsWithChildren,
} from "react";
import {
  transactionsReducer,
  type Transaction,
} from "../reducers/transactions";

interface TransactionsContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: Omit<Transaction, "id" | "createdAt">) => void;
}

const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(transactionsReducer, {
    transactions: [],
  });

  async function fetchTransactions(query?: string): Promise<void> {
    const url = new URL("http://localhost:3000/transactions");
    if (query) {
      url.searchParams.set("q", query);
    }
    const result = await fetch(url);
    const data = await result.json();
    dispatch({ type: "LOAD_TRANSACTIONS", payload: data });
  }

  function createTransaction(
    data: Omit<Transaction, "id" | "createdAt">
  ): void {
    const transaction: Transaction = {
      ...data,
      id: new Date().getTime(),
      createdAt: new Date().toString(),
    };
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        createTransaction,
        fetchTransactions,
        transactions: state.transactions,
      }}
    >
      {props.children}
    </TransactionsContext.Provider>
  );
}

export function useTransactionsContext() {
  const context = useContext(TransactionsContext);
  return context;
}
