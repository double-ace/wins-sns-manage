export const Alert = ({ text }) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-8 rounded relative"
      role="alert"
    >
      <span className="block sm:inline">{text}</span>
    </div>
  );
};
