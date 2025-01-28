import { EditIcon } from '../icons/edit-icon';
import { NormalToLargeButton } from '../components/button';

export const PrimarySidebarCreateButton = () => {
  return (
    <NormalToLargeButton
      appearance='secondary'
      before={<EditIcon className='w-6 h-6 sm:w-4 sm:h-4' />}
    >
      <span className='group-data-[sidebar-open=false]:hidden'>Create</span>
    </NormalToLargeButton>
  );
};
