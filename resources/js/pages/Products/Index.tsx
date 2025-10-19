import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircle, CirclePlus, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Products',
    href: "/products",
  },
];

interface Product {
    id: number,
    name: string,
    price: number
    description: string
}

export default function Index() {
  const { flash }: any = usePage().props; 
  const [showAlert, setShowAlert] = useState(!!flash?.message);

  // 🕒 Auto hide after 4 seconds
  useEffect(() => {
    if (flash?.message) {
      setShowAlert(true);
      const timer = setTimeout(() => setShowAlert(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [flash?.message]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Products" />

      <div>
        <Link href={"/products/create"}>
          <Button className="m-4 flex items-center gap-2">
            <CirclePlus /> Create New Product
          </Button>
        </Link>

        {/* ✅ Success Alert */}
        {showAlert && (
          <div className="w-1/2 m-auto mb-6 relative">
            <Alert className="bg-green-500 text-white flex items-start pr-10">
              <CheckCircle className="h-4 w-4 text-white mt-1" />
              <div className="ml-2">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription className="text-white">
                  {flash.message}
                </AlertDescription>
              </div>
              {/* ❌ Close button */}
              <button
                onClick={() => setShowAlert(false)}
                className="absolute right-3 top-3 hover:opacity-80 transition"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </Alert>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
