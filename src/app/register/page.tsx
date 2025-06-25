"use client";
import { useState } from "react";
import RoleSelectorDialog from "../login/components/role-selector-dialog";

export default function RegisterPage() {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <form
        className="bg-card p-8 rounded-lg shadow flex flex-col gap-4"
        onSubmit={e => {
          e.preventDefault();
          setShowDialog(true);
        }}
      >
        <h1 className="text-2xl font-bold mb-2">Register</h1>
        <input className="input input-bordered" type="text" placeholder="Name" required />
        <input className="input input-bordered" type="email" placeholder="Email" required />
        <input className="input input-bordered" type="password" placeholder="Password" required />
        <button className="btn btn-primary mt-4" type="submit">Register</button>
      </form>
      <RoleSelectorDialog open={showDialog} onOpenChange={setShowDialog} />
    </div>
  );
} 