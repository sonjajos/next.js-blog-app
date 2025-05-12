"use client";

import { PlusIcon } from "@heroicons/react/16/solid";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import TopicForm from "./topic-form";
import { JSX } from "react";

interface TopicModalProps {
  button?: JSX.Element;
  defaultValues?: {
    title: string;
    description: string;
  }
  slug?: string;
}

export default function TopicModal({
  slug,
  button,
  defaultValues,
}: TopicModalProps) {
  const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      {button ? <div onClick={onOpen}>{button}</div> : (
        <Button className="border-none bg-[transparent]" onPress={onOpen}>
          <div className="flex flex-row gap-2">
            <PlusIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 w-6 h-6" />
            <div className="buttonText">
              Add Topic
            </div>
          </div>
        </Button>
      )}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        className="bg-background py-4 border-[1px] border-white/20"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 w-full justify-center items-center">
                {defaultValues ? 'Edit Topic' : 'Add New Topic'}
              </ModalHeader>
              <ModalBody>
                <TopicForm
                  defaultValues={defaultValues}
                  slug={slug}
                  handleClose={onClose}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
