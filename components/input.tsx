import cn from '../utils/classnames';

interface InputProps extends React.ComponentProps<'input'> {}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        'border-2 border-gray-200 focus:border-green-500 focus:outline-none px-4 py-3 rounded-lg transition-colors w-full',
        className
      )}
      {...props}
    />
  );
};

export default Input;
