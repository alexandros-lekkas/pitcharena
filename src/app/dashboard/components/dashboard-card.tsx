interface DashboardCardProps {
  startup: { id: string; name: string; status: string };
  role: "founder" | "investor";
}

export default function DashboardCard({ startup, role }: DashboardCardProps) {
  return (
    <div className="flex items-center justify-between bg-card p-4 rounded-lg shadow-sm">
      <span className="font-semibold text-lg">{startup.name}</span>
      {role === "founder" ? (
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded bg-secondary text-secondary-foreground font-medium">Edit</button>
          <button className="px-3 py-1 rounded bg-destructive text-white font-medium">Delete</button>
        </div>
      ) : (
        <span className="px-3 py-1 rounded bg-muted text-foreground font-medium">{startup.status}</span>
      )}
    </div>
  );
} 