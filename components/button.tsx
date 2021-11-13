import Link from 'next/link';

import cn from '../utils/classnames';

interface ButtonBaseProps {
  color?: string;
  hoverColor?: string;
}

interface ButtonProps extends React.ComponentProps<'button'>, ButtonBaseProps {}

const getClassName = ({
  color = 'green-500',
  hoverColor = 'green-600',
  className = '',
  disabled = false,
}) =>
  cn(
    `bg-${color} border-2 border-transparent text-white hover:bg-${hoverColor} focus:outline-none px-4 py-3 rounded-lg transition-colors inline-block`,
    disabled && 'opacity-50',
    className
  );

const Button: React.FC<ButtonProps> = ({
  className,
  color,
  hoverColor,
  disabled,
  ...props
}) => {
  return (
    <button
      className={getClassName({ color, hoverColor, className, disabled })}
      disabled={disabled}
      {...props}
    />
  );
};

interface LinkButtonProps extends React.ComponentProps<'a'>, ButtonBaseProps {
  href: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  className,
  color,
  hoverColor,
  href,
  ...props
}) => {
  return (
    <Link href={href}>
      <a
        className={getClassName({ color, hoverColor, className })}
        {...props}
      />
    </Link>
  );
};

export default Button;
