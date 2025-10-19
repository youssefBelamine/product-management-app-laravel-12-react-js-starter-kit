import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, useForm } from '@inertiajs/react'
import { Textarea } from "@/components/ui/textarea"
import { FormEvent, useState, useCallback } from 'react'
import { CheckCircle, TriangleAlert, UploadCloud } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { route } from 'ziggy-js'

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
    stock: '',
    description: '',
    image: null as File | null,
  })

  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // 🖼️ Dropzone setup
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

  function submitHandler(e: FormEvent) {
    e.preventDefault()
    console.log(data)
    post(route('products.store'), {
      forceFormData: true, // ⚠️ Important for file upload
      onSuccess: () => {
        // setAlert({ type: 'success', message: 'Product created successfully!' })
        reset()
      },
      onError: () => {
        setAlert({ type: 'error', message: 'Something went wrong!' })
      },
    })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Products" />

      <Link href={route("products.index")}>
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

      <form onSubmit={submitHandler}
  encType="multipart/form-data">
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

          {/* Product Price */}
          <div>
            <Label htmlFor='price' className={style.labelStyle}>Product Price</Label>
            <Input
              type='number'
              name='price'
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

          {/* Product Description */}
          <div>
            <Label htmlFor='description' className={style.labelStyle}>Product Description</Label>
            <Textarea
              name='description'
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
