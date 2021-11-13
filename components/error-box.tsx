const ErrorBox: React.FC = ({ children }) => {
  return (
    <p className="py-3 px-4 rounded-lg bg-red-100 text-red-600 mb-4">
      {children}
    </p>
  );
};

export default ErrorBox;
