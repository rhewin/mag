import { BellIcon } from '../icons/bell-icon';
import { ProductLogo } from '../icons/logos/product-logo';
import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { SidebarHeading } from '../components/sidebar/navigation-items';
import { Tooltip } from '../components/tooltip';

export const PrimarySidebarHeading = () => {
  return (
    <SidebarHeading
      before={<ProductLogo className='w-8 h-8' />}
      after={
        <Tooltip text='Notifications' position='right'>
          <Button
            appearance='text'
            className='px-0 w-16 sm:w-8 h-16 sm:h-8 relative'
          >
            <Badge
              size='xsmall'
              className='absolute top-4 right-4 sm:top-1 sm:right-1.5'
            />

            <BellIcon className='w-8 h-8 sm:w-6 sm:h-6' />
          </Button>
        </Tooltip>
      }
    >
      <span className='font-medium text-xl'>Settings</span>
    </SidebarHeading>
  );
};

export const PrimarySidebarHeading2 = () => {
  return (
    <SidebarHeading
      className='lg:pr-8'
      before={<ProductLogo className='w-8 h-8' />}
      after={
        <Tooltip text='Notifications' position='right'>
          <Button
            appearance='text'
            className='px-0 w-16 sm:w-8 h-16 sm:h-8 relative'
          >
            <Badge
              size='xsmall'
              className='absolute top-4 right-4 sm:top-1 sm:right-1.5'
            />

            <BellIcon className='w-8 h-8 sm:w-6 sm:h-6' />
          </Button>
        </Tooltip>
      }
    >
      <span className='font-medium text-xl'>Settings</span>
    </SidebarHeading>
  );
};
