# AI-Powered Invoice Management System

This React-based web application automates the extraction, processing, and management of invoice data from various file formats. It uses AI-powered tools to extract relevant details and organizes them into three key sections: **Invoices**, **Products**, and **Customers**. Real-time synchronization across tabs is achieved using Redux for centralized state management.

![Banner](<https://storage.googleapis.com/example-offi-1/Safari%20(Big%20Sur)%20-%20Light.png>)

---

## Features

### **1. File Uploads and AI-Powered Data Extraction**

- **Supported File Types**:
  - **Excel Files**: Extract transaction details (serial numbers, net/total amounts, customer info).
  - **PDF and Image Files**: Extract customer, product, and invoice details, including totals and tax information.
- **AI Data Extraction**:
  - Automatically processes uploaded files using a generic AI model.
  - Handles various data formats and identifies key details for tabular organization.

### **2. Organized Data in Tabs**

- **Invoices Tab**:  
  Displays the following fields:
  - Serial Number, Customer Name, Product Name, Quantity, Tax, Total Amount, and Date.
- **Products Tab**:  
  Displays the following fields:
  - Name, Quantity, Unit Price, Tax, Price with Tax (optional: Discount).
- **Customers Tab**:  
  Displays the following fields:
  - Customer Name, Phone Number, Total Purchase Amount (optional: additional customer fields).

### **3. Real-Time Updates Using Redux**

- Centralized state management with **Redux** ensures real-time updates.
- Changes in one tab reflect instantly in others. For example:
  - Updating a product name in the **Products Tab** updates it in the **Invoices Tab** dynamically.

### **4. Data Validation and Error Handling**

- Validates extracted data for accuracy and completeness.
- Highlights missing fields and provides user-friendly prompts to correct them.
- Displays clear feedback for unsupported file types or extraction errors.

### **5. API Integration**

The app integrates AI-powered APIs (e.g., Google Gemini) to extract structured data from uploaded files.

---

## Installation

### **Prerequisites**

- Node.js (v16 or higher)
- npm or yarn

### **Steps**

1. Clone the repository:
   ```bash
   git clone https://github.com/thekavikumar/ai-powered-invoice.git
   cd ai-powered-invoice
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### **Environment Variables**

Create a `.env.local` file in the root directory and add the following:

```
API_KEY=<your_gemini_api_key>
```

### **Deployment**

The app is deployed on [Vercel](https://vercel.com/) (or any preferred platform). Access the live version [here](https://ai-powered-invoice.vercel.app/).

---

## Folder Structure

```
src/
├── app/                     # Core application files
│   ├── api/                 # Backend API logic for data extraction and processing
│   │   ├── extract/         # AI extraction logic (e.g., parsing PDFs/images)
│   │   └── processXlsx/     # Excel file processing utilities
│   ├── customers/           # Customer-related logic and components
│   ├── invoices/            # Invoice-related logic and components
│   ├── products/            # Product-related logic and components
│   ├── favicon.ico          # Favicon for the app
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Layout component for app structure
│   └── page.tsx             # Entry point for the app
├── components/              # Reusable UI components
│   ├── ui/                  # Shared UI components
│   │   ├── CustomLink.tsx   # Custom link component
│   │   ├── ReduxWrapper.tsx # Redux provider wrapper
│   │   └── UploadBtn.tsx    # Upload button component
├── lib/                     # Utility functions and helpers
│   ├── utils.ts             # Shared utility functions
├── redux/                   # Redux store and slices
│   ├── slices/              # Redux slices for state management
│   └── store.ts             # Redux store configuration
├── .env.local               # Environment variables
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Git ignore rules
├── components.json          # Component registry (if used)
├── next-env.d.ts            # Next.js environment types
├── next.config.ts           # Next.js configuration
├── package-lock.json        # Dependency lock file
└── package.json             # Project metadata and dependencies
```

---

## API Reference

### **1. File Upload API**

Handles the upload and extraction of invoice data.  
**Endpoint**: `/api/extract`  
**Method**: `POST`  
**Payload**:

```json
{
  "file": <uploaded_file>,
  "type": "pdf" | "image" | "excel"
}
```

**Response**:

```json
{
  "invoiceInformation": {...},
  "items": [...],
  "chargesAndTotals": {...},
  "bankDetails": {...},
}
```

### **2. Excel Processing API**

Handles the parsing of Excel files.  
**Endpoint**: `/api/processXlsx`  
**Method**: `POST`  
**Payload**:

```json
{
  "file": <uploaded_excel_file>
}
```

**Response**:

```json
{
  "status": "success",
  "data": [...]
}
```

---

## AI Test Cases

### **Tested Scenarios**

1. **Case 1**: Single Invoice PDF
2. **Case 2**: Invoice PDF + Image
3. **Case 3**: Single Excel File
4. **Case 4**: Multiple Excel Files
5. **Case 5**: Mixed File Types

For missing data, the app highlights incomplete fields and prompts users for manual updates.

---

## Technologies Used

- **Frontend**: React, Redux, Next.js, TailwindCSS
- **AI Integration**: Google Gemini API
- **Deployment**: Vercel

---

## Contribution

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## Contact

For feedback or queries:

- **Name**: [Kavikumar M](https://www.linkedin.com/in/thekavikumar/)
- **Email**: kavikumar.hackathons@gmail.com
- **GitHub**: [thekavikumar](https://github.com/thekavikumar)
