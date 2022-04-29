import { useEffect, useState } from "react";
import { TodayTable } from "../../components/TodayTable";
import { Layout } from "../../components/Layout";
import Link from "next/link";

type Visitor = {
  email: string;
  family_name: string;
  first_name: string;
  point: number;
  visited_date: Date;
  first_visit: Date;
  last_visit: Date;
  previous_visit: Date;
};

export default function Today() {
  const [visitorList, setVisitorList] = useState<Visitor[]>([]);
  useEffect(() => {
    if (!localStorage.getItem("access")) {
      window.location.href = "/signin";
    }
  });

  return (
    <Layout>
      <div className="h-96 p-8">
        <div className="border-b w-full pb-2 mb-8">
          <h1 className="inline-block font-bold text-4xl text-blue-500 tracking-widest mr-8">
            当日来店顧客
          </h1>
          <Link href="/">
            <a className="bg-indigo-700 text-white p-2 duration-300 rounded-md hover:bg-indigo-600 w-28 text-md">
              顧客一覧表
            </a>
          </Link>
        </div>
        <TodayTable visitorList={visitorList} type="today" />
      </div>
    </Layout>
  );
}
