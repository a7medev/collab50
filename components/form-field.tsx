import type { FieldError } from 'react-hook-form';

export interface FormFieldProps {
  className?: string;
  error?: FieldError;
}

const FormField: React.FC<FormFieldProps> = ({
  children,
  className,
  error,
}) => {
  return (
    <div className={className}>
      {children}

      {error && <p className="text-red-600 text-left mt-1">{error.message}</p>}
    </div>
  );
};

export default FormField;
