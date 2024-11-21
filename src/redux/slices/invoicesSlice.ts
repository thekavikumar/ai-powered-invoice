import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InvoiceItem {
  description?: string;
  rate?: string;
  quantity?: string;
  taxableValue?: string;
  gst?: string;
  productName?: string;
  amount?: string;
  [key: string]: string | undefined;
}

interface ChargesAndTotals {
  makingCharges?: string;
  debitCardCharges?: string;
  shippingCharges?: string;
  taxableAmount?: string;
  cgst?: string | null;
  sgst?: string | null;
  total?: string;
  amountPayable?: string;
  totalAmountDue?: string;
  totalItemsQty?: string;
}

interface BankDetails {
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  branch?: string;
  beneficiaryName?: string;
}

interface InvoiceData {
  invoiceInformation?: {
    consignee?: string;
    gstin?: string;
    invoiceNumber?: string;
    consigneePhone?: string;
    invoiceDate?: string;
    placeOfSupply?: string;
    companyName?: string;
    companyGSTIN?: string;
    companyPhone?: string;
  };
  items?: InvoiceItem[];
  chargesAndTotals?: ChargesAndTotals;
  bankDetails?: BankDetails;
  additionalNotes?: string;
}

interface InvoiceState {
  invoiceData?: InvoiceData[];
}

const initialState: InvoiceState = {
  invoiceData: [],
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<InvoiceData>) => {
      state.invoiceData?.push(action.payload); // Add the new invoice to the list
    },
    updateInvoice: (
      state,
      action: PayloadAction<{
        invoiceIndex: number;
        itemIndex: number;
        field: string;
        value: string;
      }>
    ) => {
      const { invoiceIndex, itemIndex, field, value } = action.payload;

      const invoice = state.invoiceData?.[invoiceIndex];
      const item = invoice?.items?.[itemIndex];

      if (invoice && item) {
        // Update the specific field for the item
        item[field] = value;
      }
    },
  },
});

export const { addInvoice, updateInvoice } = invoicesSlice.actions;

export default invoicesSlice.reducer;
