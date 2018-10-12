// Expense categories matching the MongoDB enum.
export const expenseCategories = [
  'Food & Beverage',
  'Enternatinment',
  'Research',
  'Communications',
  'Media/Advertising',
  'Publications',
  'Travel',
  'Lodging',
  'Special Events',
  'Other'
];

function categoryIsValid(category) {
  return expenseCategories.indexOf(category) > -1;
}

function amountIsValid(amountString) {
  // Regex for positive floats with up to two decimal places.
  const regex = /^\s*[1-9]\d*(\.\d{0,2})?\s*$/;
  return amountString === '' || regex.test(amountString);
}

const defaultCategory = expenseCategories[0];

export class Expense {
  constructor(category = defaultCategory, amount = '') {
    this._category = defaultCategory;
    this._amount = '';
    this.setCategory(category);
    this.setAmount(amount);
  }

  category() {
    return this._category;
  }

  amount() {
    return this._amount;
  }

  amountAsFloat() {
    return parseFloat(this._amount) || 0;
  }

  isBlank() {
    return this.amountAsFloat() === 0;
  }

  setCategory(category) {
    if (categoryIsValid(category)) {
      this._category = category;
    } else {
      this._category = defaultCategory;
    }
  }

  setAmount(amount) {
    const amountString = amount === 0 ? '' : `${amount}`;
    if (amountIsValid(amountString)) {
      this._amount = amountString;
    }
  }

  makeMongoExpense() {
    return {
      category: this.category(),
      amount: this.amountAsFloat()
    };
  }
}
