import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, useForm } from '@inertiajs/react'
import { Textarea } from "@/components/ui/textarea"
import { FormEvent, useCallback, useEffect, useState } from 'react'
import { CheckCircle, TriangleAlert, UploadCloud } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { route } from 'ziggy-js'

interface Product {
  id: number
  name: string
  price: number
  stock: number
  description?: string
  image_url?: string
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
  const { data, setData, post, processing, errors } = useForm({
    name: product.name || '',
    price: product.price || '',
    stock: product.stock || '',
    description: product.description || '',
    image: null as File | null,
    _method: "PUT"
  })

  // Dropzone for image
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setData('image', acceptedFiles[0])
    }
  }, [setData])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  })

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()

    console.log(data);

    post(route("products.update", product.id), {
      forceFormData: true, // important for file upload
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

      <form onSubmit={submitHandler} encType="multipart/form-data" >
        <div className='m-auto w-1/2 border border-gray-300 p-8 rounded-2xl shadow-sm'>
         {/* Product Image Dropzone */}
          <div className='mt-4'>
            <Label className={style.labelStyle}>Product Image</Label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition 
              ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-400 hover:border-blue-400'}`}
            >
              <input {...getInputProps()} />
              {data.image ? (
                <div className='flex flex-col items-center'>
                  <img
                    src={URL.createObjectURL(data.image)}
                    alt="Preview"
                    className='w-32 h-32 object-cover rounded-lg mb-2'
                  />
                  <span className='text-gray-700 font-medium'>{data.image.name}</span>
                </div>
              ) : product.image_url ? (
                <div className='flex flex-col items-center'>
                  {/* <span className='bg-red-700'>x</span> */}
                  <img
                    src={product.image_url}
                    alt="Current"
                    className='w-32 h-32 object-cover rounded-lg mb-2'
                  />
                  <span className='text-gray-700 font-medium'>Current Image</span>
                </div>
              ) : (
                <div className='flex flex-col items-center'>
                  <UploadCloud className='w-10 h-10 text-gray-500 mb-2' />
                  <p className='text-gray-600'>Drag & drop your image here, or click to select one</p>
                </div>
              )}
            </div>
          </div>

          {/* Product Name */}
          <div>
            <Label htmlFor='name' className={style.labelStyle}>Product Name</Label>
            <Input
              name='name'
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
                    {/* Product Stock */}
                    <div>
                      <Label htmlFor='stock' className={style.labelStyle}>Product Stock</Label>
                      <Input
                        type='number'
                        name='stock'
                        min="0"
                        className={style.inputStyle}
                        placeholder='Product stock'
                        value={data.stock}
                        onChange={e => setData('stock', e.target.value)}
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
          <Button type='submit' disabled={processing} className={processing ? "bg-gray-400" : "bg-black"}>Update</Button>
        </div>
      </form>
    </AppLayout>
  )
}
