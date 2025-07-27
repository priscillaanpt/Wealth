"use client";

import { signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";

export default function Dashboard() {
  return (
    <div className="grid h-screen">
      <p>Dashboard Page </p>
      <Button
        onClick={async () => {
          await signOut();
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}
