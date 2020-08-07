import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import TransactionType from '../models/TransactionType';

interface Request {
  title: string;
  value: number;
  type: TransactionType;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const transation = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transation;
  }
}

export default CreateTransactionService;
