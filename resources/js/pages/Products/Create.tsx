import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, useForm } from '@inertiajs/react'
import { Textarea } from "@/components/ui/textarea"
import { FormEvent, useState } from 'react'
import { CheckCircle, TriangleAlert } from 'lucide-react'

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Create a New Product', href: "/products/create" },
]

const style = {
  labelStyle: "font-bold",
  inputStyle: "mb-4"
}

export default function Create() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    price: '',
    description: '',
  })

  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  function submitHandler(e: FormEvent) {
    e.preventDefault()
    post("/products/store");
    

    // ✅ Show success message
    setAlert({ type: 'success', message: 'Product created successfully!' })

    // ✅ Empty fields after submit
    reset()
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Products" />

      <Link href={"/products"}>
        <Button className='font-bold text-2xl w-15 mx-4 my-2'>{'<-'}</Button>
      </Link>

      <h1 className='text-2xl m-5 font-bold'>Let's create a new product</h1>


{errors && Object.keys(errors).length > 0 && (
  <div className="w-1/2 m-auto mb-4">
    <Alert className="bg-red-500 text-white">
      <TriangleAlert color='#ffffff' className="h-4 w-4" />
      <AlertTitle className='font-bold'>Error</AlertTitle>
      <AlertDescription className='text-white'>
        {Object.values(errors).map((error, index) => (
          <div key={index}>{error}</div>
        ))}
      </AlertDescription>
    </Alert>
  </div>
)}


      <form onSubmit={submitHandler}>
        <div className='m-auto w-1/2 border border-gray-300 p-8 rounded-2xl shadow-sm'>
          <div>
            <Label htmlFor='productName' className={style.labelStyle}>Product Name</Label>
            <Input
              name='productName'
              className={style.inputStyle}
              placeholder='Product name'
              value={data.name}
              onChange={e => setData('name', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor='productPrice' className={style.labelStyle}>Product Price</Label>
            <Input
              type='number'
              name='productPrice'
              min="0"
               step="0.01"
              className={style.inputStyle}
              placeholder='Product price'
              value={data.price}
              onChange={e => setData('price', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor='productDescription' className={style.labelStyle}>Product Description</Label>
            <Textarea
              name='productDescription'
              placeholder='Product description'
              value={data.description}
              onChange={e => setData('description', e.target.value)}
            />
          </div>
        </div>

        <div className='text-center mt-6'>
          <Button type='submit' disabled={processing}>Create</Button>
        </div>
      </form>
    </AppLayout>
  )
}
