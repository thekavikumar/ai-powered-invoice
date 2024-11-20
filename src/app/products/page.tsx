'use client';
import { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';

const Page: React.FC = () => {
  // Select all invoice data from the Redux store
  const invoices = useSelector(
    (state: RootState) => state.invoices.invoiceData
  );

  if (!invoices || invoices.length === 0) {
    return <div>No invoices available</div>;
  }

  return (
    <div>
      <h3>Products</h3>
      <table className="product-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Taxable Value</th>
            <th>GST</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, invoiceIndex) => (
            <React.Fragment key={invoiceIndex}>
              {invoice.items.map((item, itemIndex) => (
                <tr key={itemIndex}>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{item.rate}</td>
                  <td>{item.taxableValue}</td>
                  <td>{item.gst}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
