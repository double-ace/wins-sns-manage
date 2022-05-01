import { Header } from "@mantine/core";

export const LayoutLogin = ({ children }) => {
  return (
    <div>
      <Header height={70} p="md">
        <div className="flex items-center h-full">
          <div className="text-4xl text-cyan-800 font-semibold font-serif">
            WIN'S<span className="text-xl text-cyan-700 ml-4">管理者用</span>
          </div>
        </div>
      </Header>
      {children}
    </div>
  );
};
