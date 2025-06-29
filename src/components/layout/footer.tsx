export function Footer() {
  return (
    <div className="mt-12 w-full border-t-2 py-4">
      <div className="text-sm font-semibold text-center text-muted-foreground">
        © {new Date().getFullYear()} Pitch Arena. All rights reserved.
      </div>
    </div>
  );
}
