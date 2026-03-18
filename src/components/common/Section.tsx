import { clsx } from 'clsx';
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
}

export default function Section({ children, className, id, containerClassName }: SectionProps) {
  return (
    <section id={id} className={clsx('section-padding', className)}>
      <div className={clsx('container', containerClassName)}>
        {children}
      </div>
    </section>
  );
}
