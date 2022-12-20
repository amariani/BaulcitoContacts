"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../Input";

export type ContactsForm = {
  [key: string]: string;
};

export default function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactsForm>();

  const submitContact = async (data: ContactsForm) => {
    // make a post request to the server
    const request = await fetch("/api/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await request.json();
    console.log("Submit response:", response);

    console.log(
      "From FROM --> process.env.GOOGLE_CLIENT_EMAIL",
      process.env.GOOGLE_CLIENT_EMAIL
    );
    console.log(
      "From FROM --> process.env.GOOGLE_PRIVATE_KEY",
      process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")
    );
    console.log("From FROM --> process.env.GOOLE_SHEET_ID", process.env.GOOLE_SHEET_ID);
    reset();
  };

  const onSubmit: SubmitHandler<ContactsForm> = (data) => {
    submitContact(data);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 ">
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col py-2 space-y-6 justify-center items-center"
      >
        <Input
          fieldName="first_name"
          label="Nombre"
          placeholder="Nombre del cliente"
          register={register}
        />

        <Input
          fieldName="last_name"
          label="Apellido"
          placeholder="Apellido del cliente"
          register={register}
          isRequired
        />

        <Input
          fieldName="dob"
          label="Nacimiento"
          placeholder="DD/MM/AAAA"
          register={register}
        />

        <Input
          fieldName="email"
          label="email"
          placeholder="cliente@email.com"
          register={register}
          isRequired
        />

        <Input
          fieldName="phone_number"
          label="Teléfono"
          placeholder="351 123 4567"
          register={register}
        />

        {errors.last_name && (
          <p className="text-sm text-red-500">This field is required</p>
        )}
        {errors.email && (
          <p className="text-sm text-red-500">This field is required</p>
        )}

        <input
          className="text-white py-2 px-4 rounded-md shadow-md bg-blue-400 hover:bg-slate-400 cursor-pointer"
          type="submit"
          value="Subir contacto"
        />
      </form>
    </div>
  );
}
