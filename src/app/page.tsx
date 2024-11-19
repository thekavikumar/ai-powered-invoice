import CustomLink from '@/components/CustomLink';
import { UploadBtn } from '@/components/UploadBtn';
import { PackageSearch, Receipt, UsersRound } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col gap-12 items-center justify-center h-screen">
      <h1 className="text-4xl font-extrabold text-gray-700 text-center max-w-xl">
        AI Powered Data Extraction And Invoice Management Application
      </h1>
      <div className="flex items-center gap-6">
        <UploadBtn />
        <CustomLink href="/invoices">
          <Receipt size={20} />
          Invoices
        </CustomLink>
        <CustomLink href="/products">
          <PackageSearch size={20} />
          Products
        </CustomLink>
        <CustomLink href="/customers">
          <UsersRound size={20} />
          Customers
        </CustomLink>
      </div>
    </div>
  );
}
