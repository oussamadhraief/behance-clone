import { RegisterForm } from "@/components/register-form";
import React from "react";

export default function Register() {
  return (
    <div className="flex min-h-fit w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
}