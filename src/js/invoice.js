const invoice = {
    sender: 'ABC Corp',
    billTo: 'John Doe, 456 Elm Street, Springfield',
    shipTo: 'Jane Doe, 789 Oak Avenue, Springfield',
    invoiceNum: 'INV-001',
    date: '2024-11-18',
    dueDate: '2024-12-01',
    additionalNote: 'Thank you for your business. We appreciate your prompt payment.',
    items: [
      {
        description: 'Product 1 - High-quality widget',
        quantity: '2',
        rate: '50',
        amount: '100',
      }

    ],
    note: 'Please pay within the due date to avoid penalties.',
    terms: 'Net 30 days. Late payments will incur a 2% monthly interest.',
    subtotal: '250',
    tax: '25',
    total: '275',
  };

export {invoice}