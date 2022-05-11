import Link from "next/link";

export const NavMenu = () => {
  return (
    <div className="flex flex-col justify-start w-full pb-2 mb-8">
      <Link href="/">
        <a className="p-2 text-slate-700 rounded-sm duration-300 hover:bg-slate-100">
          顧客一覧
        </a>
      </Link>
      <Link href="/visitor/today">
        <a className="p-2 text-slate-700 rounded-sm duration-300 hover:bg-slate-100">
          当日来店顧客
        </a>
      </Link>
      <Link href="/visitor/history">
        <a className="p-2 text-slate-700 rounded-sm duration-300 hover:bg-slate-100">
          過去来店顧客
        </a>
      </Link>
      <Link href="/post">
        <a className="p-2 text-slate-700 rounded-sm duration-300 hover:bg-slate-100">
          投稿一覧
        </a>
      </Link>
      <Link href="/chat">
        <a className="p-2 text-slate-700 rounded-sm hover:bg-slate-100">
          チャット一覧
        </a>
      </Link>
    </div>
  );
};
