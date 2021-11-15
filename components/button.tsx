import Link from 'next/link';

import cn from '../utils/classnames';

interface ButtonProps extends React.ComponentProps<'button'> {}

const Button: React.FC<ButtonProps> = ({ className, disabled, ...props }) => {
  return (
    <button
      className={cn(
        'border-2 border-transparent text-white focus:outline-none px-4 py-3 rounded-lg transition-colors inline-block',
        disabled && 'opacity-50',
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
};

interface LinkButtonProps extends React.ComponentProps<'a'> {
  href: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  className,
  href,
  ...props
}) => {
  return (
    <Link href={href}>
      <a
        className={cn(
          'border-2 border-transparent text-white focus:outline-none px-4 py-3 rounded-lg transition-colors inline-block',
          className
        )}
        {...props}
      />
    </Link>
  );
};

export default Button;
