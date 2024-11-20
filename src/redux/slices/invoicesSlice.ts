import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InvoiceItem {
  description: string;
  rate: string;
  quantity: string;
  taxableValue: string;
  gst: string;
  amount: string;
}

interface ChargesAndTotals {
  makingCharges: string;
  debitCardCharges: string;
  shippingCharges: string;
  taxableAmount: string;
  cgst: string | null;
  sgst: string | null;
  total: string;
  amountPayable: string;
  totalAmountDue: string;
  totalItemsQty: string;
}

interface BankDetails {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branch: string;
  beneficiaryName: string;
}

interface InvoiceData {
  invoiceInformation: {
    consignee: string;
    gstin: string;
    invoiceNumber: string;
    invoiceDate: string;
    placeOfSupply: string;
    companyName: string;
    companyGSTIN: string;
    companyPhone: string;
  };
  items: InvoiceItem[];
  chargesAndTotals: ChargesAndTotals;
  bankDetails: BankDetails;
  additionalNotes: string;
}

interface InvoiceState {
  invoiceData: InvoiceData[];
}

const initialState: InvoiceState = {
  invoiceData: [],
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<InvoiceData>) => {
      state.invoiceData.push(action.payload); // Add the new invoice to the list
    },
  },
});

export const { addInvoice } = invoicesSlice.actions;

export default invoicesSlice.reducer;
