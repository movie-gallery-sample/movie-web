import { MyAlert } from '@/components/utils/alerts/MyAlert';
import { Button } from '@/components/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from '@/components/utils/modals/dialog';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface MyModalProps {
  collectionName?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (val: boolean) => void;
  confirm?: () => void;
  confirmBtnText?: string;
  cancelBtnText?: string;
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
  isSuccess?: boolean;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  body?: React.ReactNode;
}

export default function MyModal({
  title,
  description,
  children,
  open,
  onOpenChange,
  confirm,
  isLoading,
  confirmBtnText = 'Yes',
  cancelBtnText = 'No',
  isError,
  error,
  isSuccess,
  collectionName,
  contentClassName = '',
  titleClassName = '',
  descriptionClassName = '',
  body,
}: MyModalProps) {
  const [displayError, setDisplayError] = useState<boolean | undefined>(false);

  useEffect(() => {
    setDisplayError(isError);
  }, [isError]);

  useEffect(() => {
    if (!open) {
      setDisplayError(false);
    }
  }, [open]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Successfully deleted ${collectionName || title}`);
    }
  }, [isSuccess]);

  return (
    <Dialog onOpenChange={onOpenChange || (() => {})} open={open}>
      {children}
      <DialogContent
        className={cn(
          'block max-w-[300px] space-y-6 rounded-xl p-[42px] max-md:block max-md:gap-0 md:max-w-md',
          contentClassName,
        )}
        closeIcon={false}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        {(isError || error) && displayError ? (
          <MyAlert
            message={error ? error?.data?.message : 'Something Went Wrong!!'}
          />
        ) : (
          <div className="max-w-full space-y-3 px-6 text-center max-md:text-xs">
            <h3
              className={cn(
                'text-center text-sm font-medium md:text-base',
                titleClassName,
              )}
            >
              {title}
            </h3>
            <p className={cn('text-sm text-[#8A8F96]', descriptionClassName)}>
              {description}
            </p>
          </div>
        )}
        {body}
        <DialogFooter className="flex w-full items-center !justify-between gap-4 space-x-0 md:gap-7">
          <Button
            className="h-[30px] w-[50%] text-sm md:h-11"
            type="button"
            disabled={isLoading}
            onClick={() => {
              confirm && confirm();
            }}
            isLoading={isLoading}
          >
            {confirmBtnText}
          </Button>
          <DialogClose asChild>
            <Button
              className="h-[30px] w-[50%] bg-[#F8F8F8] text-sm md:h-11"
              type="button"
              variant="outlined"
              color="white"
            >
              {cancelBtnText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
