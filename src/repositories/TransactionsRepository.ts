import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionCreation {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): object {
    return { transactions: this.transactions, balance: this.getBalance() };
  }

  public getBalance(): Balance {
    const resultingBalance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value;
            accumulator.total += transaction.value;
            break;
          case 'outcome':
            accumulator.outcome += transaction.value;
            accumulator.total -= transaction.value;
            break;
          default:
            console.log('Something is wrong...');
        }

        return resultingBalance;
      },
      resultingBalance,
    );

    return resultingBalance;
  }

  public findByWholeObject({
    title,
    value,
    type,
  }: TransactionCreation): Transaction | null {
    const newTransaction = new Transaction({ title, value, type });

    const existentTransaction = this.transactions.find(
      transaction =>
        transaction.title === newTransaction.title &&
        transaction.value === newTransaction.value &&
        transaction.type === newTransaction.type,
    );

    if (existentTransaction) {
      return existentTransaction;
    }

    return null;
  }

  public create({ title, value, type }: TransactionCreation): Transaction {
    const newTransaction = new Transaction({ title, value, type });

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
