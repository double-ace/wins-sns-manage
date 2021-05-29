import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { CustomerTable } from '../components/CustomerTable';
import { Layout } from '../components/Layout';

export default function Home() {
  const [openQrReader, setOpenQrReader] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('access')) {
      window.location.href = '/signin';
    }
  })

  const QrReader = dynamic(
    () => import('../components/QrRead'), {ssr: false}
  )

  const openCamera = () => {
    setOpenQrReader(!openQrReader);
  }

  return (
    <Layout>
      {openQrReader && <QrReader isOpened={openQrReader} setIsOpened={setOpenQrReader} />}
      <div className="h-96 p-8">
        <div className="border-b w-full pb-2 mb-8">
          <h1 className="inline-block font-bold text-4xl text-blue-500 tracking-widest">顧客一覧表</h1>
          <Link href="/daily"><a className="bg-indigo-700 text-white p-2 ml-8 duration-300 rounded-md hover:bg-indigo-600 text-md">当日来店顧客</a></Link>
          {<button className="bg-pink-600 text-white p-2 ml-4 duration-300 rounded-md hover:bg-pink-500 text-md" onClick={openCamera}>QRコード読取</button>}
        </div>
        <CustomerTable />
      </div>
    </Layout>
  )
}
