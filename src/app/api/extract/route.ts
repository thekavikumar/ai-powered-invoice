import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import * as fs from 'fs';
import * as path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate file input
    if (!body.file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }

    // Initialize GoogleGenerativeAI and GoogleAIFileManager with API_KEY
    const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
    const fileManager = new GoogleAIFileManager(process.env.API_KEY!);

    // Initialize the model
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash', // Choose your model
    });

    // Store the base64-encoded file temporarily
    const tmpFilePath = path.join(__dirname, 'tempfile.pdf');
    const fileBuffer = Buffer.from(body.file, 'base64');

    // Write the buffer to a temporary file
    fs.writeFileSync(tmpFilePath, fileBuffer);

    // Upload the file from the temporary file
    const uploadResponse = await fileManager.uploadFile(tmpFilePath, {
      mimeType: 'application/pdf', // Assuming PDF format
      displayName: 'Uploaded Document', // Customize name
    });

    console.log(
      `Uploaded file: ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`
    );

    // Extract the table data from the document
    const tableExtraction = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      {
        text: `Please extract all relevant information from the document and provide it in the following structured format:

    {
      "invoiceInformation": {
        "consignee": "<Consignee Name>",
        "gstin": "<GSTIN Number>",
        "invoiceNumber": "<Invoice Number>",
        "invoiceDate": "<Invoice Date>",
        "placeOfSupply": "<Place of Supply>",
        "companyName": "<Company Name>",
        "companyGSTIN": "<Company GSTIN>",
        "companyPhone": "<Company Phone>"
      },
      "items": [
        {
          "description": "<Item Description>",
          "rate": "<Item Rate>",
          "quantity": "<Item Quantity>",
          "taxableValue": "<Item Taxable Value>",
          "gst": "<GST Amount>",
          "amount": "<Item Amount>"
        },
        ...
      ],
      "chargesAndTotals": {
        "makingCharges": "<Making Charges>",
        "debitCardCharges": "<Debit Card Charges>",
        "shippingCharges": "<Shipping Charges>",
        "taxableAmount": "<Taxable Amount>",
        "cgst": "<CGST>",
        "sgst": "<SGST>",
        "total": "<Total>",
        "amountPayable": "<Amount Payable>",
        "totalAmountDue": "<Total Amount Due>",
        "totalItemsQty": "<Total Items Quantity>"
      },
      "bankDetails": {
        "bankName": "<Bank Name>",
        "accountNumber": "<Account Number>",
        "ifscCode": "<IFSC Code>",
        "branch": "<Branch>",
        "beneficiaryName": "<Beneficiary Name>"
      },
      "additionalNotes": "<Additional Notes or Terms>"
    }

    Make sure to return the information as structured key-value pairs as shown above. Do not provide extra information or deviate from this structure.`,
      },
    ]);

    const extractedData = tableExtraction.response.text();
    // console.log('Extracted Data:', extractedData);

    // Return success
    return NextResponse.json({
      success: true,
      data: extractedData,
    });
  } catch (error) {
    console.error('Error processing file:', error);

    // Detailed error logging
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message, stack: error.stack }, // Return error details
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Processing failed' },
      { status: 500 }
    );
  }
}
