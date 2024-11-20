'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function Page() {
  // Retrieve invoice data from the Redux store
  const invoiceData = useSelector(
    (state: RootState) => state.invoices.invoiceData
  );

  return (
    <div>
      <h2>Invoice List</h2>
      {invoiceData.length === 0 ? (
        <p>No invoices available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Customer Name</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Tax</th>
              <th>Total Amount</th>
              <th>Invoice Date</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.map((invoice, index) =>
              // Loop through each invoice to display the rows
              invoice.items.map((item, itemIndex) => (
                <tr key={`${index}-${itemIndex}`}>
                  <td>{`${index + 1}.${itemIndex + 1}`}</td>
                  <td>{invoice.invoiceInformation.consignee}</td>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{item.gst}</td>
                  <td>{item.amount}</td>
                  <td>{invoice.invoiceInformation.invoiceDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
