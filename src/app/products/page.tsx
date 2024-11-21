'use client';
import { RootState, store } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { updateInvoice } from '@/redux/slices/invoicesSlice';

const Page: React.FC = () => {
  // Select all invoice data from the Redux store
  const invoices = useSelector(
    (state: RootState) => state.invoices.invoiceData
  );

  // Helper function to format numbers by removing commas
  const formatNumberWithoutCommas = (value: string | number) => {
    if (!value) return '';
    return Number(String(value).replace(/,/g, ''));
  };

  // Handle the update of the edited invoice data
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    invoiceIndex: number,
    itemIndex: number,
    field: string
  ) => {
    let updatedValue = e.target.value;

    // Remove commas for numeric fields
    if (
      field === 'quantity' ||
      field === 'rate' ||
      field === 'taxableValue' ||
      field === 'amount'
    ) {
      updatedValue = updatedValue.replace(/,/g, ''); // Remove all commas
    }

    store.dispatch(
      updateInvoice({ invoiceIndex, itemIndex, field, value: updatedValue })
    );
  };

  if (!invoices || invoices.length === 0) {
    return <div className="text-xl text-gray-600">No invoices available</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h3 className="text-3xl font-semibold mb-6">Product List</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Product Name</th>
              <th className="px-6 py-4 text-left">Quantity</th>
              <th className="px-6 py-4 text-left">Rate</th>
              <th className="px-6 py-4 text-left">Taxable Value</th>
              <th className="px-6 py-4 text-left">GST</th>
              <th className="px-6 py-4 text-left">Amount</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {invoices.map((invoice, invoiceIndex) => (
              <React.Fragment key={invoiceIndex}>
                {invoice.items?.map((item, itemIndex) => (
                  <tr
                    key={itemIndex}
                    className="hover:bg-gray-100 border-b last:border-b-0"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={item.description || item.productName || ''}
                        onChange={(e) =>
                          handleChange(
                            e,
                            invoiceIndex,
                            itemIndex,
                            'description'
                          )
                        }
                        className="w-full border-gray-300 rounded-md p-2"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={formatNumberWithoutCommas(item.quantity || '')}
                        onChange={(e) =>
                          handleChange(e, invoiceIndex, itemIndex, 'quantity')
                        }
                        className="w-full border-gray-300 rounded-md p-2"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={formatNumberWithoutCommas(item.rate || '')}
                        onChange={(e) =>
                          handleChange(e, invoiceIndex, itemIndex, 'rate')
                        }
                        className="w-full border-gray-300 rounded-md p-2"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={formatNumberWithoutCommas(
                          item.taxableValue || ''
                        )}
                        onChange={(e) =>
                          handleChange(
                            e,
                            invoiceIndex,
                            itemIndex,
                            'taxableValue'
                          )
                        }
                        className="w-full border-gray-300 rounded-md p-2"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={item.gst || ''}
                        onChange={(e) =>
                          handleChange(e, invoiceIndex, itemIndex, 'gst')
                        }
                        className="w-full border-gray-300 rounded-md p-2"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={formatNumberWithoutCommas(item.amount || '')}
                        onChange={(e) =>
                          handleChange(e, invoiceIndex, itemIndex, 'amount')
                        }
                        className="w-full border-gray-300 rounded-md p-2"
                      />
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
