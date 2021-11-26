interface AddButtonProps extends React.ComponentProps<'button'> {
  hint: string;
}

const AddButton: React.FC<AddButtonProps> = ({ hint, ...props }) => {
  return (
    <button
      className="ml-4 h-7 w-7 rounded-full inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white transition-colors"
      {...props}
    >
      <span aria-hidden>+</span>
      <span className="sr-only">{hint}</span>
    </button>
  );
};

export default AddButton;
