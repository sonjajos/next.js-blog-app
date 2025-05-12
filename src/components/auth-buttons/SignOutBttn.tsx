'use client';

import { Button } from "@heroui/react";

export default function SignOutBttn() {
  return (
    <Button
      type="submit"
      className="w-full max-w-80 flex bg-transparent"
    >
      <div className="text-blue-500 buttonText">
        Sign out
      </div>
    </Button>
  );
}
