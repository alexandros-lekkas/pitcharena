import { Badge } from "@/components/ui/badge";

interface TagBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
  className?: string;
}

export default function TagBadge({ children, variant = "default", className }: TagBadgeProps) {
  return (
    <Badge variant={variant} className={className}>
      {children}
    </Badge>
  );
} 