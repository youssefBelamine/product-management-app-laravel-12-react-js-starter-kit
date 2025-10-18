import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
// import { useRoute } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: "/products",
    },
];

export default function Index() {
    // const route = useRoute();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />
            {/* <h1 className='text-3xl m-5 font-bold'>Products List</h1> */}
            <Link href={"/products/create"}> <Button className='m-4'>Create New Product</Button> </Link>
        </AppLayout>
    );
}
