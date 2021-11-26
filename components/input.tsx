import { forwardRef } from 'react';

import cn from '../utils/classnames';
import FormField, { FormFieldProps } from './form-field';

export interface InputProps
  extends FormFieldProps,
    React.ComponentProps<'input'> {
  noRightRound?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, noRightRound, ...props }, ref) => {
    return (
      <FormField className={className} error={error}>
        <input
          ref={ref}
          className={cn(
            'form__field',
            error && 'error',
            noRightRound && 'no-right-round'
          )}
          {...props}
        />
      </FormField>
    );
  }
);

Input.displayName = 'Input';

export default Input;
