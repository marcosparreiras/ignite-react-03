import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryContainer, SummaryCard } from "./styles";
import { useTransactionsContext } from "../../contexts/TransactionsContext";

export function Summary() {
  const { transactions } = useTransactionsContext();

  const { income, outcome, total } = transactions.reduce(
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

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>R$ {income}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saidas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>R$ {outcome}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>R$ {total}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
