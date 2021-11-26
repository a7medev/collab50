import { forwardRef } from 'react';

import cn from '../utils/classnames';
import FormField, { FormFieldProps } from './form-field';

export interface SelectProps
  extends FormFieldProps,
    React.ComponentProps<'select'> {
  noRightRound?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, noRightRound, ...props }, ref) => {
    return (
      <FormField className={className} error={error}>
        <select
          ref={ref}
          className={cn(
            'form__field',
            error && 'error',
            noRightRound && 'rounded-r-none'
          )}
          {...props}
        />
      </FormField>
    );
  }
);

Select.displayName = 'Select';

export default Select;
