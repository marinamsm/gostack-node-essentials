import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import ListTransactionService from '../services/ListTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactionsListService = new ListTransactionService(
      transactionsRepository,
    );

    const transacions = transactionsListService.execute();

    return response.json(transacions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const transactionCreation = new CreateTransactionService(
      transactionsRepository,
    );

    const newTransaction = transactionCreation.execute({ title, value, type });

    return response.json(newTransaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
