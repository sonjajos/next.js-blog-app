'use client';

import { Button } from "@heroui/react";

export default function GitHubSignInBttn() {
  return (
    <Button
      type="submit"
      className="w-full max-w-80 flex bg-overlay"
    >
      <div className="buttonText">
        Sign in with GitHub
      </div>
    </Button>
  )
}
