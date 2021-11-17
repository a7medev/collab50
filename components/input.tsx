import { forwardRef } from 'react';
import type { FieldError } from 'react-hook-form';

import cn from '../utils/classnames';

interface InputProps extends React.ComponentProps<'input'> {
  error?: FieldError;
  noRightRound?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, noRightRound, ...props }, ref) => {
    return (
      <div className={className}>
        <input
          ref={ref}
          className={cn(
            'border-2 focus:outline-none px-4 py-3 rounded-lg transition-colors w-full',
            noRightRound && 'rounded-r-none',
            error
              ? 'border-red-200 focus:border-red-500 bg-red-100 placeholder-red-400'
              : 'border-gray-200 focus:border-green-500'
          )}
          {...props}
        />

        {error && (
          <p className="text-red-600 text-left mt-1">{error.message}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
