import '@reach/checkbox/styles.css';
import { CustomCheckbox, CustomCheckboxProps } from '@reach/checkbox';
import cn from '../utils/classnames';

interface CheckboxProps extends CustomCheckboxProps {
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <label className={className}>
      <CustomCheckbox {...props}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </CustomCheckbox>

      {children}
    </label>
  );
};

export default Checkbox;
