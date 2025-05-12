"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import AuthForm from "./auth-form";

export default function AuthModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        className="w-full max-w-80 flex bg-transparent"
      >
        <div className="text-blue-500 buttonText">
          Sign in
        </div>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="opaque"
        className="bg-background py-4 border-[1px] border-white/20"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 w-full justify-center items-center">
                Sign in
              </ModalHeader>
              <ModalBody>
                <AuthForm />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
