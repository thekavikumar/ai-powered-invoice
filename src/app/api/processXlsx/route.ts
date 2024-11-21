import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

export async function POST(request: NextRequest) {
  const { file } = await request.json();

  // Convert base64 string to binary
  const fileBuffer = Buffer.from(file, 'base64');

  // Read the Excel file
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

  // Assume the first sheet contains the relevant data
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  // Parse the data into a JSON format
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawData: any[] = XLSX.utils.sheet_to_json(sheet);

  const invoices = rawData.reduce((acc, item) => {
    // console.log('item:', item);
    const invoiceNumber = item['Serial Number'] as string;
    if (invoiceNumber && invoiceNumber != 'Totals') {
      if (!acc[invoiceNumber]) {
        acc[invoiceNumber] = {
          invoiceInformation: {
            invoiceNumber: invoiceNumber,
            consignee: item['Party Name'] || null,
            invoiceDate: item['Invoice Date'],
            companyName: item['Party Company Name'] || null,
            consigneePhone: item['Phone Number'] || null,
          },
          items: [],
          chargesAndTotals: {
            total: 0,
          },
        };
      }

      const productDetails = {
        description: item['Description'] || null,
        productName: item['Product Name'] || null,
        quantity: item['Qty'] || null,
        rate: item['Unit Price'] || null,
        taxableValue: item['Tax (%)'] || null,
        itemDiscount: item['Item Discount'] || null,
        priceAfterTax: item['Price with Tax'] || null,
        amount:
          item['Item Total Amount'] ||
          item['Total Amount'] ||
          item['Price After Tax'] ||
          item['Qty'] * item['Unit Price'],
      };

      acc[invoiceNumber].items.push(productDetails);

      acc[invoiceNumber].chargesAndTotals.total += Number(
        productDetails.amount
      );
    }
    return acc;
  }, {});

  const formattedData = Object.values(invoices);

  // const response = {
  //   data: formattedData,
  //   rawData: rawData,
  // };

  return NextResponse.json({
    success: true,
    message: 'Data processed and aggregated successfully.',
    data: formattedData,
  });
}
