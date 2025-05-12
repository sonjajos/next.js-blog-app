import React from "react";
import AuthForm from "@/components/auth-form"

export default async function Home() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <AuthForm />
    </div>
  );
}
