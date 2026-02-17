'use client';

import { Controller, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogClose,
  DialogFooter
} from '../ui/dialog';
import { BookmarkSchema, TBookMarkSchema } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Bookmark } from '@/app/(pages)/page';
import { useEffect } from 'react';

type BookmakrFormProps = {
  isEdit: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  initialData: Bookmark | null;
};

const BookmarkForm = ({
  isEdit,
  open,
  setOpen,
  initialData
}: BookmakrFormProps) => {
  const form = useForm<TBookMarkSchema>({
    resolver: zodResolver(BookmarkSchema),
    defaultValues: {
      title: '',
      url: ''
    }
  });

  useEffect(() => {
    if (isEdit && initialData) {
      form.reset({
        title: initialData.title,
        url: initialData.url
      });
    } else {
      form.reset();
    }
  }, [isEdit, initialData, form]);

  const onSubmit = (data: TBookMarkSchema) => {
    console.log({ data });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader className='flex flex-row! items-center justify-between border-b border-gray-400 pb-2'>
          <DialogTitle>
            {isEdit ? 'Edit Boookmark' : 'Add Bookmark'}
          </DialogTitle>
          <DialogClose asChild>
            <Button
              variant='ghost'
              size='icon'
              className='hover:cursor-pointer'
            >
              <X />
            </Button>
          </DialogClose>
        </DialogHeader>
        <form
          id='bookmark-form'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name='title'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Title <span className='text-red-500'>*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder='Enter the title'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name='url'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    URL <span className='text-red-500'>*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder='Enter url'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant='destructive'
              className='hover:cursor-pointer'
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            form='bookmark-form'
            className='hover:cursor-pointer'
            variant='outline'
          >
            {isEdit ? 'Update Bookmark' : 'Add Bookmark'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookmarkForm;
