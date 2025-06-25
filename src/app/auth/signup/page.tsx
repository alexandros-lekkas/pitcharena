"use client";
import { useState } from "react";
import RoleSelectorDialog from "../login/components/role-selector-dialog";

export default function RegisterPage() {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <div className="px-4 py-16 mx-auto max-w-md">
      <form
        className="flex flex-col gap-4 p-8 rounded-lg shadow bg-card"
        onSubmit={e => {
          e.preventDefault();
          setShowDialog(true);
        }}
      >
        <h1 className="mb-2 text-2xl font-bold">Register</h1>
        <input className="input input-bordered" type="text" placeholder="Name" required />
        <input className="input input-bordered" type="email" placeholder="Email" required />
        <input className="input input-bordered" type="password" placeholder="Password" required />
        <button className="mt-4 btn btn-primary" type="submit">Register</button>
      </form>
      <RoleSelectorDialog open={showDialog} onOpenChange={setShowDialog} />
    </div>
  );
} 