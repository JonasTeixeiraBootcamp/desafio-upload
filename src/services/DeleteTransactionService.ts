import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const transactionExists = await transactionRepository.findOne(id);

    if (!transactionExists) {
      throw new AppError('Transaction does not exist', 400);
    }

    await transactionRepository.delete(id);
  }
}

export default DeleteTransactionService;
