import { CircleAlert, Trash } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog';
import { Dispatch, SetStateAction } from 'react';
import { Button } from './ui/button';

type Props = {
  execute: () => void;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

const ConfirmationDialog = ({ execute, show, setShow }: Props) => {
  return (
    <Dialog
      open={show}
      onOpenChange={setShow}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col items-center justify-center py-5'>
          <CircleAlert className='size-10 text-red-500' />
          <p className='mt-2'>
            This action cannot be undone. This will permanently delete your data
            from the servers.
          </p>
        </div>
        <DialogFooter className='justify-end'>
          <DialogClose asChild>
            <Button
              type='button'
              variant='outline'
              className='hover:cursor-pointer'
            >
              Close
            </Button>
          </DialogClose>
          <Button
            type='button'
            variant='destructive'
            className='hover:cursor-pointer'
            onClick={() => execute()}
          >
            <Trash className='' />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
