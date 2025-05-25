'use client';

import { PlusIcon } from '@heroicons/react/16/solid';
import { HeroButton } from '@/components/hero-components';
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@heroui/react';
import AddPostForm from './add-post-form';

interface AddPostModalProps {
  slug: string;
}

export default function AddPostModal({ slug }: AddPostModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <HeroButton
        className='border-[1px] border-blue-600 bg-blue-600/15 shrink-0 w-full'
        onPress={onOpen}
      >
        <PlusIcon width={24} height={24} className='text-blue-600' />
        <div className='text-blue-600'>New Post</div>
      </HeroButton>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop='blur'
        className='bg-background py-4 border-[1px] border-overlay'
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className='flex flex-col gap-1 w-full justify-center items-center'>
                Add New Post
              </ModalHeader>
              <ModalBody>
                <AddPostForm slug={slug} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
