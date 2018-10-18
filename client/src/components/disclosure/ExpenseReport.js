import { cloneDeep } from 'lodash';
import { expenseCategories, Expense } from './Expense';

function makeDefaultExpenses() {
  return expenseCategories.map(category => new Expense(category, 0));
}

export default class ExpenseReport {
  constructor(expenses = []) {
    if (expenses.length === 0) {
      this._expenses = makeDefaultExpenses();
    } else {
      this._expenses = expenses.map(expense => new Expense(expense.category, expense.amount));
    }
  }

  expenses() {
    return cloneDeep(this._expenses);
  }

  setAmount(category, amount) {
    this._expenses.forEach((expense) => {
      if (expense.category() === category) {
        expense.setAmount(amount);
      }
    });
  }

  totalAmount() {
    return this._expenses.reduce((total, curExpense) => total + curExpense.amountAsFloat(), 0);
  }

  makeMongoExpenseReport() {
    return {
      expenses: this._expenses.map(expense => expense.makeMongoExpense())
    };
  }
}
