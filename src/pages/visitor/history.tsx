import { useEffect, useState } from "react";
import { VisitorTable } from "src/components/VisitorTable";
import { Layout } from "src/components/Layout";
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
  const [isLoading, setIsLoading] = useState(false);
  const [visitorList, setVisitorList] = useState<Visitor[]>([]);
  useEffect(() => {
    changeDate(date);
  }, []);

  const changeDate = async (selDate: Date): Promise<void> => {
    setIsLoading(true);
    setDate(selDate);
    const res = await requestHttpGet(
      `/owner/visitor-history/?date=${dayjs(selDate).format("YYYY-MM-DD")}`
    );
    setVisitorList([...res.data]);
    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="pt-2">
        <div className="border-b w-full pb-2 mb-4 flex row items-center">
          <h1 className="inline-block text-2xl font-bold text-cyan-600 tracking-widest">
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
        </div>
        <VisitorTable
          visitorList={visitorList}
          setVisitorList={setVisitorList}
          isLoading={isLoading}
          type="history"
        />
      </div>
    </Layout>
  );
}
