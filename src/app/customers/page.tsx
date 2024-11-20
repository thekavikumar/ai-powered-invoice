'use client';
import { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';

export default function CustomersPage() {
  // Select invoice data from the Redux store
  const invoices = useSelector(
    (state: RootState) => state.invoices.invoiceData
  );

  if (!invoices || invoices.length === 0) {
    return <div>No invoices available</div>;
  }

  return (
    <div>
      <h1>Customers List</h1>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Total Purchase Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={index}>
              <td>{invoice.invoiceInformation.consignee}</td>{' '}
              {/* Customer Name */}
              <td>{invoice.invoiceInformation.companyPhone}</td>{' '}
              {/* Phone Number */}
              <td>{invoice.chargesAndTotals.total}</td>{' '}
              {/* Total Purchase Amount */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
