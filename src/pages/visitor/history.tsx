import { useEffect, useState } from "react";
import { HistoryTable } from "src/components/HistoryTable";
import { Layout } from "src/components/Layout";
import Link from "next/link";
import { DatePicker } from "@mantine/dates";
import { requestHttpGet } from "src/utils/requestBase";
import dayjs from "dayjs";
import "dayjs/locale/ja";

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

export default function History() {
  const [date, setDate] = useState(new Date());
  const [visitorList, setVisitorList] = useState<Visitor[]>([]);
  useEffect(() => {
    if (!localStorage.getItem("access")) {
      window.location.href = "/signin";
    }
  });

  const changeDate = async (date: Date): Promise<void> => {
    const res = await requestHttpGet(
      `/owner/visitor-history/?date=${dayjs(date).format("YYYY-MM-DD")}`
    );
    console.log(res);
    setVisitorList([...res.data]);
  };

  return (
    <Layout>
      <div className="h-96 p-8">
        <div className="border-b w-full pb-2 mb-8 flex row items-center">
          <h1 className="inline-block font-bold text-4xl text-blue-500 tracking-widest mr-8">
            過去来店顧客
          </h1>
          <DatePicker
            locale="ja"
            placeholder="日付を選択"
            inputFormat="YYYY/MM/DD"
            maxDate={dayjs(new Date()).toDate()}
            value={date}
            onChange={(date) => changeDate(date)}
            required
            className="mx-2"
          />
          <Link href="/">
            <a className="bg-indigo-700 text-white text-center p-2 duration-300 rounded-md hover:bg-indigo-600 w-28 text-md">
              顧客一覧表
            </a>
          </Link>
        </div>
        <HistoryTable visitorList={visitorList} />
      </div>
    </Layout>
  );
}
