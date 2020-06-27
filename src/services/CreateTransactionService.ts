import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionCreation {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({
    title,
    value,
    type,
  }: TransactionCreation): Transaction | null {
    const existentTransaction = this.transactionsRepository.findByWholeObject({
      title,
      value,
      type,
    });

    if (existentTransaction) {
      throw new Error('This transaction already exists');
    }

    if (type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();

      if (total - value < 0) {
        throw new Error('Invalid Transaction');
      }
    }

    const newTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return newTransaction;
  }
}

export default CreateTransactionService;
