import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { CheckCircle, CirclePlus, Trash2, X, SquarePen } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { route } from 'ziggy-js';

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

function DeleteProductButton({ onConfirm, name }: { onConfirm: () => void, name: string }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='mx-2' variant="destructive"> <Trash2/> </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure you want to delete <br/>{name} ?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the product from your system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}  className='bg-red-600'> <Trash2/> </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}



export default function Index() {
  const { flash }: any = usePage().props; 
  const { products }: any = usePage().props; 
const [alertMessage, setAlertMessage] = useState(flash?.message || null);
  const [showAlert, setShowAlert] = useState(!!flash?.message);

const handleDelete = (product: Product) => {
  setShowAlert(false); // reset before new delete
  setAlertMessage(null);
  router.delete(`/products/${product.id}`, {
    preserveScroll: true,
    onSuccess: () => {
      console.log(`${product.name} deleted successfully`);
    },
  });
};

  // 🕒 Auto hide after 4 seconds
  useEffect(() => {
    if (flash?.message) {
      setShowAlert(true);
      setAlertMessage(flash?.message);
      const timer = setTimeout(() => {
        setShowAlert(false);
        setAlertMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [flash?.message]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Products" />

      <div>
        <Link href={route("products.create")}>
          <Button className="m-4 flex items-center gap-2">
            <CirclePlus /> Create New Product
          </Button>
        </Link>
        
        {/* <h1> {showAlert ? "you can show alert": "you can't"} </h1>
        <h1> {alertMessage ? "there is alert": "no alert to show"} </h1> */}

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
      <Table className='w-4/5 m-auto'>
  <TableCaption>A list of Products.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">ID</TableHead>
      <TableHead>Product name</TableHead>
      <TableHead>Product price</TableHead>
      <TableHead className="text-center">Product description</TableHead>
      <TableHead className="text-center">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
                    {products && products.length > 0 ? (
                        products.map((p: any) => (
                            <TableRow key={p.id}>
                                <TableCell className="font-medium">{p.id}</TableCell>
                                <TableCell className="font-medium">{p.name}</TableCell>
                                <TableCell>{p.price}</TableCell>
                                <TableCell>
                                    {p.description && p.description.length > 50
                                        ? p.description.substring(0, 50) + '  ...'
                                        : p.description}
                                </TableCell>

                                {/* <TableCell className="text-center">${p.price}</TableCell> */}
                                <TableCell className="text-center">
                                     <Link href={route("products.edit", p.id)}><Button className='mx-2'><SquarePen /></Button></Link>
                                     
                                     <DeleteProductButton onConfirm={() => handleDelete(p)} name={p.name} /> 
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500">
                                No products found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
</Table>
    </AppLayout>
  );
}
