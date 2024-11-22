'use client';
import { updateInvoice } from '@/redux/slices/invoicesSlice';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CustomersPage() {
  const invoices = useSelector(
    (state: RootState) => state.invoices.invoiceData
  );
  const dispatch = useDispatch();

  if (!invoices || invoices.length === 0) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="flex flex-col items-center justify-between w-full">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">
            No Customer Data Available
          </h3>
          <Link
            href={'/'}
            className="px-3 py-1 border rounded-md bg-slate-200 hover:bg-slate-300 duration-200 ease-in-out"
          >
            Go back
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    invoiceIndex: number,
    field: string
  ) => {
    let updatedValue = e.target.value;

    // Special handling for fields like totalPurchaseAmount (removing commas)
    if (field === 'totalPurchaseAmount') {
      updatedValue = updatedValue.replace(/,/g, ''); // Remove commas if necessary
    }

    dispatch(
      updateInvoice({
        invoiceIndex,
        itemIndex: -1, // Not updating items, just customer-level fields
        field,
        value: updatedValue,
      })
    );
  };

  const groupedData = invoices.reduce((acc, invoice, invoiceIndex) => {
    const name = invoice.invoiceInformation?.consignee || 'Not Mentioned';
    const consigneePhone =
      invoice.invoiceInformation?.consigneePhone || 'Not Mentioned';
    const uniqueKey = `${name}-${consigneePhone}`;
    const amountString = invoice.chargesAndTotals?.total || '0';
    const cleanedAmount =
      typeof amountString === 'string'
        ? amountString.replace(/[^0-9.]/g, '')
        : amountString;
    const amount = parseFloat(cleanedAmount) || 0;

    if (!acc[uniqueKey]) {
      acc[uniqueKey] = {
        name,
        consigneePhone,
        totalPurchaseAmount: 0,
        bankDetails: invoice.bankDetails || {},
        invoiceIndex, // Store the invoice index here
      };
    }

    acc[uniqueKey].totalPurchaseAmount += amount;

    return acc;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as Record<string, { name: string; consigneePhone: string; totalPurchaseAmount: number; bankDetails: any; invoiceIndex: number }>);

  const customers = Object.values(groupedData).map((customer) => {
    const hasDuplicatePhone =
      Object.values(groupedData).filter(
        (c) => c.consigneePhone === customer.consigneePhone
      ).length > 1;

    return {
      ...customer,
      name:
        hasDuplicatePhone && customer.name === 'Not Mentioned'
          ? 'Duplicate Name'
          : customer.name,
    };
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-6 justify-between w-full">
        <h1 className="text-3xl font-semibold">Customers List</h1>
        <Link
          href={'/'}
          className="px-3 py-1 border rounded-md bg-slate-200 hover:bg-slate-300 duration-200 ease-in-out"
        >
          Go back
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Customer Name</th>
              <th className="px-6 py-4 text-left">Phone Number</th>
              <th className="px-6 py-4 text-left">Total Purchase Amount</th>
              <th className="px-6 py-4 text-left">Bank Name</th>
              <th className="px-6 py-4 text-left">Account Number</th>
              <th className="px-6 py-4 text-left">IFSC Code</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {customers.map(
              (customer, index) =>
                customer.name !== 'Not Mentioned' && (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 border-b last:border-b-0"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={customer.name}
                        className="w-full border-gray-300 rounded-md p-2"
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            customer.invoiceIndex,
                            'consignee'
                          )
                        }
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={customer.consigneePhone}
                        className="w-full border-gray-300 rounded-md p-2"
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            customer.invoiceIndex,
                            'consigneePhone'
                          )
                        }
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={`₹ ${customer.totalPurchaseAmount.toFixed(2)}`}
                        className="w-full border-gray-300 rounded-md p-2"
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            customer.invoiceIndex,
                            'totalPurchaseAmount'
                          )
                        }
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={customer.bankDetails?.bankName || 'Not Provided'}
                        className="w-full border-gray-300 rounded-md p-2"
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            customer.invoiceIndex,
                            'bankName'
                          )
                        }
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={
                          customer.bankDetails?.accountNumber || 'Not Provided'
                        }
                        className="w-full border-gray-300 rounded-md p-2"
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            customer.invoiceIndex,
                            'accountNumber'
                          )
                        }
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={customer.bankDetails?.ifscCode || 'Not Provided'}
                        className="w-full border-gray-300 rounded-md p-2"
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            customer.invoiceIndex,
                            'ifscCode'
                          )
                        }
                      />
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
