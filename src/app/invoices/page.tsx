'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store'; // assuming you have an action to update the invoice
import { updateInvoice } from '@/redux/slices/invoicesSlice';
import Link from 'next/link';

export default function Page() {
  // Retrieve invoice data from the Redux store
  const invoiceData = useSelector(
    (state: RootState) => state.invoices.invoiceData
  );
  const dispatch = useDispatch();

  // Handle the update of the edited invoice data
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    invoiceIndex: number,
    itemIndex: number,
    field: string
  ) => {
    let updatedValue = e.target.value;

    // Remove commas before updating the value
    if (field === 'quantity' || field === 'amount') {
      updatedValue = updatedValue.replace(/,/g, ''); // Remove all commas
    }

    dispatch(
      updateInvoice({ invoiceIndex, itemIndex, field, value: updatedValue })
    );
  };

  // Format the value with commas for display
  const formatNumberWithoutCommas = (value: string | number) => {
    if (!value) return '';
    return Number(String(value).replace(/,/g, '')); // Converts to number and removes any commas, keeping two decimal places.
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-3xl font-semibold mb-6">Invoice List</h2>
        <Link href="/">Go back</Link>
      </div>
      {invoiceData?.length === 0 ? (
        <p className="text-xl text-gray-600">No invoices available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Serial Number</th>
                <th className="px-6 py-4 text-left">Customer Name</th>
                <th className="px-6 py-4 text-left">Product Name</th>
                <th className="px-6 py-4 text-left">Quantity</th>
                <th className="px-6 py-4 text-left">Tax</th>
                <th className="px-6 py-4 text-left">Total Amount</th>
                <th className="px-6 py-4 text-left">Invoice Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {invoiceData?.map((invoice, invoiceIndex) =>
                invoice.items?.map((item, itemIndex) => (
                  <tr
                    key={`${invoiceIndex}-${itemIndex}`}
                    className="hover:bg-gray-100 border-b last:border-b-0"
                  >
                    <td className="px-6 py-4">
                      {invoice?.invoiceInformation?.invoiceNumber
                        ? invoice.invoiceInformation.invoiceNumber
                        : `${invoiceIndex + 1}.${itemIndex + 1}`}
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={invoice?.invoiceInformation?.consignee || ''}
                        onChange={(e) =>
                          handleChange(e, invoiceIndex, itemIndex, 'consignee')
                        }
                        className="w-full border-gray-300 rounded-md p-2"
                      />
                    </td>
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
                        value={item.gst ? item.gst.split(' ')[0] : ''} // Display only numeric value of GST
                        onChange={(e) =>
                          handleChange(e, invoiceIndex, itemIndex, 'gst')
                        }
                        className="w-full border-gray-300 rounded-md p-2"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={formatNumberWithoutCommas(item.amount || 0)}
                        onChange={(e) =>
                          handleChange(e, invoiceIndex, itemIndex, 'amount')
                        }
                        className="w-full border-gray-300 rounded-md p-2"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="date"
                        value={
                          invoice.invoiceInformation?.invoiceDate
                            ? formatDate(invoice.invoiceInformation.invoiceDate)
                            : ''
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            invoiceIndex,
                            itemIndex,
                            'invoiceDate'
                          )
                        }
                        className="w-full border-gray-300 rounded-md p-2"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
