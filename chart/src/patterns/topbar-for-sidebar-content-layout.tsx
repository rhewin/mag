import { DotsVerticalIcon } from '../icons/dots-vertical-icon';
import { DownloadIcon } from '../icons/download-icon';
import { PlusIcon } from '../icons/plus-icon';
import { LogOutIcon } from '../icons/log-out-icon';
import { Button, NormalToLargeButton } from '../components/button';
import { Drawer } from '../components/drawer';

export const TopbarForSidebarContentLayout = () => {
  return (
    <div className='bg-blinkNeutral50'>
      <nav
        aria-label='Main Navigation'
        className='h-auto lg:h-16 px-6 flex items-center justify-between absolute top-3 lg:top-0 right-0 lg:right-0 left-12 lg:left-0 lg:relative'
      >
        <div className='text-2xl blink-text-primary italic font-blink-title'>
          <h2>Dashboard Analytics Library</h2>
        </div>
        <div className='block'>
          <Button appearance='text' className='w-12 h-12 lg:w-10 lg:h-10'>
            <LogOutIcon className='w-8 h-8 lg:w-6 lg:h-6 shrink-0' />
          </Button>
        </div>
        <div className='block lg:hidden'>
          <Drawer
            position='right'
            trigger={
              <Button appearance='text' className='w-12 h-12 lg:w-10 lg:h-10'>
                <DotsVerticalIcon className='w-8 h-8 lg:w-6 lg:h-6 shrink-0' />
              </Button>
            }
          >
            <div className='p-8 flex flex-col gap-3'>
              <NormalToLargeButton
                appearance='secondary'
                after={<DownloadIcon className='w-6 h-6 lg:w-4 lg:h-4' />}
              >
                Download
              </NormalToLargeButton>
              <NormalToLargeButton
                appearance='primary'
                after={<PlusIcon className='w-6 h-6 lg:w-4 lg:h-4' />}
              >
                Create
              </NormalToLargeButton>
            </div>
          </Drawer>
        </div>
      </nav>
    </div>
  );
};
