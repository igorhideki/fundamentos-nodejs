import Transaction from '../models/Transaction';
import TransactionType from '../models/TransactionType';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: TransactionType;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.transactions.reduce(
      (acc, item) => {
        if (String(item.type) === 'income') {
          acc.income += item.value;
          acc.total += item.value;

          return acc;
        }
        acc.outcome = item.value;
        acc.total -= item.value;

        return acc;
      },
      { income: 0, outcome: 0, total: 0 } as Balance,
    );
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    if (String(type) === 'outcome' && value > this.getBalance().total) {
      throw new Error('Balance insufficient');
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
