import { Header } from "./Header";

export const LayoutLogin = ({ children }) => {
  return (
    <div>
      <Header>{null}</Header>
      {children}
    </div>
  );
};
