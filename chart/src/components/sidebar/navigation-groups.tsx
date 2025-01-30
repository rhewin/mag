import { ReactNode } from 'react';
import { merge } from '../../utils/merge-classnames';

type NavigationGroupProps = {
  left?: ReactNode;
  right?: ReactNode;
  header?: string;
  children: ReactNode;
  className?: string;
  divider?: 'top' | 'bottom';
};

export const NavigationGroup = ({
  header,
  children,
  right,
  left,
  divider,
  className,
  ...props
}: NavigationGroupProps) => {
  return (
    <div
      className={merge(
        'flex flex-col gap-1 flex-shrink-0',
        divider === 'top'
          ? 'pt-2 border-t border-blinkGray100 dark:border-blinkGray700'
          : undefined,
        divider === 'bottom'
          ? 'pb-2 border-b border-blinkGray100 dark:border-blinkGray700'
          : undefined,
        className
      )}
      {...props}
    >
      {header || left || right ? (
        <div className='min-h-[2.125rem] flex items-center group-data-[sidebar-open=false]:hidden'>
          {left}
          <span className='text-xs blink-text-subdued px-2 flex-grow uppercase'>
            {header}
          </span>
        </div>
      ) : null}
      {children}
    </div>
  );
};
