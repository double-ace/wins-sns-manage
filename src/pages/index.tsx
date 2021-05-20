import { useEffect } from 'react';
import Link from 'next/link';
import { CustomerTable } from '../components/CustomerTable';
import { Layout } from '../components/Layout';

export default function Home() {
  useEffect(() => {
    if (!localStorage.getItem('access')) {
      window.location.href = '/signin';
    }
  })

  return (
    <Layout>
      <div className="h-96 p-8">
        <div className="border-b w-full pb-2 mb-8">
          <h1 className="inline-block font-bold text-4xl text-blue-500 tracking-widest mr-8">顧客一覧表</h1>
          <Link href="/daily"><a className="bg-indigo-700 text-white p-2 duration-300 rounded-md hover:bg-indigo-600 w-28 text-md">当日来店顧客</a></Link>
        </div>
        <CustomerTable />
      </div>
    </Layout>
  )
}
