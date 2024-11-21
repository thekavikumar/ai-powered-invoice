import CustomLink from '@/components/CustomLink';
import { UploadBtn } from '@/components/UploadBtn';
import { PackageSearch, Receipt, UsersRound } from 'lucide-react';
import Image from 'next/image';
import Banner from '../assets/banner.png';

export default function Home() {
  return (
    <div className="flex gap-8 items-center justify-center h-screen">
      <div className="flex flex-col gap-5">
        <div className=" max-w-2xl w-full flex flex-col gap-4">
          <h1 className="text-5xl font-extrabold text-gray-800 w-full">
            Welcome to AI Powered Invoice Management System
          </h1>
          <p className="font-normal text-gray-500 text-lg">
            A simple and easy to use invoice management system that uses AI to
            automatically extract data from invoices. Just upload your invoices
            and let the AI do the rest. Your data is safe and secure with us.{' '}
            Upload your first invoice now! 🚀
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6">
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
      <div className="">
        <Image src={Banner} alt="banner" width={500} height={150} />
      </div>
    </div>
  );
}
