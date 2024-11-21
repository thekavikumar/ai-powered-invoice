'use client';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

export default function CustomersPage() {
  // Select invoice data from the Redux store
  const invoices = useSelector(
    (state: RootState) => state.invoices.invoiceData
  );

  if (!invoices || invoices.length === 0) {
    return (
      <div className="text-xl text-gray-600 p-8">No invoices available</div>
    );
  }

  // Group by unique customer (name + phone) and calculate total purchase amount
  const groupedData = invoices.reduce((acc, invoice) => {
    const name = invoice.invoiceInformation?.consignee || 'Not Mentioned';
    const phone = invoice.invoiceInformation?.consigneePhone || 'Not Mentioned';
    const uniqueKey = `${name}-${phone}`; // Combine name and phone as a unique key
    const amountString = invoice.chargesAndTotals?.total || '0';
    // check if the amount is a string and remove any currency symbols or commas

    const cleanedAmount =
      typeof amountString === 'string'
        ? amountString.replace(/[^0-9.]/g, '')
        : amountString;
    const amount = parseFloat(cleanedAmount) || 0;

    if (!acc[uniqueKey]) {
      acc[uniqueKey] = {
        name,
        phone,
        totalPurchaseAmount: 0,
      };
    }

    acc[uniqueKey].totalPurchaseAmount += amount;

    return acc;
  }, {} as Record<string, { name: string; phone: string; totalPurchaseAmount: number }>);

  // Handle cases where "Unknown" entries exist but still preserve them correctly
  const customers = Object.values(groupedData).map((customer) => {
    // If there are multiple invoices with the same phone but different names
    const hasDuplicatePhone =
      Object.values(groupedData).filter((c) => c.phone === customer.phone)
        .length > 1;

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
      <div className="flex items-center justify-between w-full">
        <h1 className="text-3xl font-semibold mb-6">Customers List</h1>
        <Link href={'/'}>Go back</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Customer Name</th>
              <th className="px-6 py-4 text-left">Phone Number</th>
              <th className="px-6 py-4 text-left">Total Purchase Amount</th>
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
                    <td className="px-6 py-4">{customer.name}</td>
                    <td className="px-6 py-4">{customer.phone}</td>
                    <td className="px-6 py-4">
                      ₹ {customer.totalPurchaseAmount.toFixed(2)}
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
