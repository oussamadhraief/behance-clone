import { LoginForm } from "@/components/login-form";
import React from "react";

export default function Login() {
  return (
    <div className="flex min-h-fit w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}