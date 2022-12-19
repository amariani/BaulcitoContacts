import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import Input from "../src/components/Input";
import { FormEvent } from "react";
import Form from "../src/components/Form";

const inter = Inter({ subsets: ["latin"] });

interface FormData {
  name: string;
  last_name: string;
  dob: string;
  email: string;
  phone_number: string;
}

export default function Home() {

  return (
    <main className="bg-gray-100 min-h-screen py-2">
        <h1 className="text-3xl text-center font-bold text-indigo-500">Baulcito Contacts Form</h1>
        <Form />
    </main>
  );
}
