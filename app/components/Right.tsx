import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  className: string;
}

export function Right({ children, className }: Props) {
  return <div className={className}>{children}</div>;
}
