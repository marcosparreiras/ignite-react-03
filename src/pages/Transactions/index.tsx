import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";
import { useTransactionsContext } from "../../contexts/TransactionsContext";

export function Transactions() {
  const { transactions } = useTransactionsContext();

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.length > 0 &&
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td width="40%">{transaction.description}</td>
                  <td>
                    <PriceHighLight variant={transaction.type}>
                      R$ ${transaction.price}
                    </PriceHighLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
