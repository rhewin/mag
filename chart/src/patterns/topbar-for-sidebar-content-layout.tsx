import React from 'react';

import { DotsVerticalIcon } from '../icons/dots-vertical-icon';
import { DownloadIcon } from '../icons/download-icon';
import { PlusIcon } from '../icons/plus-icon';
import { SearchIcon } from '../icons/search-icon';
import { Button, NormalToLargeButton } from '../components/button';
import { Drawer } from '../components/drawer';
import { InputWithIconsNormalToLarge } from '../components/input/input-with-icons';

export const TopbarForSidebarContentLayout = () => {
  return (
    <div className='lg:bg-blinkNeutral50 lg:dark:bg-blinkNeutral800'>
      <nav
        aria-label='Main Navigation'
        className='h-auto lg:h-16 px-6 flex items-center justify-between absolute top-3 lg:top-0 right-0 lg:right-0 left-12 lg:left-0 lg:relative'
      >
        <div className='text-2xl blink-text-primary italic font-blink-title'>
          <a href='#'>Page Name</a>
        </div>
        <div className='gap-3 hidden lg:flex'>
          <InputWithIconsNormalToLarge
            placeholder='Search...'
            before={<SearchIcon className='w-6 h-6 lg:w-4 lg:h-4' />}
          />

          <Button
            appearance='secondary'
            after={<DownloadIcon className='w-6 h-6 lg:w-4 lg:h-4' />}
          >
            Download
          </Button>
          <Button
            appearance='primary'
            after={<PlusIcon className='w-6 h-6 lg:w-4 lg:h-4' />}
          >
            Create
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
              <InputWithIconsNormalToLarge
                placeholder='Search...'
                before={<SearchIcon className='w-6 h-6 lg:w-4 lg:h-4' />}
              />

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
