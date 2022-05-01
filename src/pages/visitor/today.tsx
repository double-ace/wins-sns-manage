import { useEffect, useState } from "react";
import { VisitorTable } from "src/components/VisitorTable";
import { Layout } from "../../components/Layout";
import dayjs from "dayjs";
import { requestHttpGet } from "src/utils/requestBase";

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
  const [isLoading, setIsLoading] = useState(true);
  const [visitorList, setVisitorList] = useState<Visitor[]>([]);
  useEffect(() => {
    getTodayVisitor();
  }, []);

  const getTodayVisitor = async (): Promise<void> => {
    const res = await requestHttpGet(
      `/owner/visitor-history/?date=${dayjs(new Date()).format("YYYY-MM-DD")}`
    );
    setVisitorList([...res.data]);
    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="pt-2">
        <div className="border-b w-full pb-2 mb-4">
          <h1 className="inline-block text-2xl font-bold text-cyan-600 tracking-widest">
            当日来店顧客
          </h1>
        </div>
        <VisitorTable
          visitorList={visitorList}
          setVisitorList={setVisitorList}
          isLoading={isLoading}
          type="today"
        />
      </div>
    </Layout>
  );
}
