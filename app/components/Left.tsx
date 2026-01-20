import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  className: string;
}

export function Left({ children, className }: Props) {
  return <div className={className}>{children}</div>;
}
