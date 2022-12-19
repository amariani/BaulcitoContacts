"use client";

import React, { ChangeEvent, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { ContactsForm } from "../Form";

interface InputProps {
  fieldName: string;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  register: UseFormRegister<ContactsForm>;
}

function Input({
  label,
  fieldName,
  isRequired = false,
  placeholder,
  register,
}: InputProps) {
  const [input, setInput] = useState("");

  return (
    <div className="flex items-center justify-center">
      <label htmlFor={fieldName} className="sr-only">
        {label}
      </label>
      <input
        type="text"
        id={fieldName}
        placeholder={placeholder || ""}
        className="pl-3 shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-64 h-10 sm:text-md border-gray-300 rounded-md"
        {...register(fieldName, { required: isRequired })}
      />
    </div>
  );
}

export default Input;
