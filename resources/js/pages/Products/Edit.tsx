import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, useForm } from '@inertiajs/react'
import { Textarea } from "@/components/ui/textarea"
import { FormEvent, useEffect, useState } from 'react'
import { CheckCircle, TriangleAlert } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  description?: string
}

interface Props {
  product: Product
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Edit Product', href: "/products" },
]

const style = {
  labelStyle: "font-bold",
  inputStyle: "mb-4"
}

export default function Edit({ product }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: product.name || '',
    price: product.price || '',
    description: product.description || '',
  })

  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()

    put(`/products/${product.id}`, {
      onSuccess: () => {
        setAlert({ type: 'success', message: 'Product updated successfully!' })
      },
      onError: () => {
        setAlert({ type: 'error', message: 'Failed to update the product.' })
      }
    })
  }

  useEffect(() => {
    console.log(product)
  }, [])

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Product" />

      <Link href={"/products"}>
        <Button className='font-bold text-2xl w-15 mx-4 my-2'>{'<-'}</Button>
      </Link>

      <h1 className='text-2xl m-5 font-bold'>Edit Product</h1>

      {alert && (
        <div className="w-1/2 m-auto mb-4">
          <Alert className={alert.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}>
            {alert.type === 'success' ? (
              <CheckCircle color="#ffffff" className="h-4 w-4" />
            ) : (
              <TriangleAlert color="#ffffff" className="h-4 w-4" />
            )}
            <AlertTitle className='font-bold'>
              {alert.type === 'success' ? 'Success' : 'Error'}
            </AlertTitle>
            <AlertDescription className='text-white'>
              {alert.message}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {errors && Object.keys(errors).length > 0 && (
        <div className="w-1/2 m-auto mb-4">
          <Alert className="bg-red-500 text-white">
            <TriangleAlert color='#ffffff' className="h-4 w-4" />
            <AlertTitle className='font-bold'>Validation Errors</AlertTitle>
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
          <Button type='submit' disabled={processing}>Update</Button>
        </div>
      </form>
    </AppLayout>
  )
}
