import { Header } from "./Header";

export const Layout = ({ children }) => {
  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("access");
    window.location.href = "/";
  };

  return (
    <div>
      <Header>
        <button
          onClick={logout}
          className="bg-green-700 text-white p-2 duration-300 rounded-md hover:bg-green-600 w-28 text-md"
        >
          ログアウト
        </button>
      </Header>
      {children}
    </div>
  );
};
