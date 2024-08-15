import { useTransactionsContext } from "../contexts/TransactionsContext";

type Output = {
  income: number;
  outcome: number;
  total: number;
};

export function useSummary(): Output {
  const { transactions } = useTransactionsContext();

  const summary = transactions.reduce(
    (acc, cur) => {
      if (cur.type === "income") {
        acc.income += cur.price;
        acc.total += cur.price;
      }
      if (cur.type === "outcome") {
        acc.outcome += cur.price;
        acc.total -= cur.price;
      }
      return acc;
    },
    { income: 0, outcome: 0, total: 0 }
  );

  return summary;
}
