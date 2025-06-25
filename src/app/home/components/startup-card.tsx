"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import CountryFlagIcon from "./country-flag-icon";

interface StartupCardProps {
  startup: {
    id: string;
    name: string;
    logo: string;
    founders: string[];
    incorporated: boolean;
    funded: boolean;
    openToInvestment: boolean;
    country: string;
    listedAt: string;
  };
}

export default function StartupCard({ startup }: StartupCardProps) {
  const router = useRouter();
  return (
    <Card
      className="flex items-center gap-4 p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => router.push(`/startup/${startup.id}`)}
    >
      <img
        src={startup.logo}
        alt={startup.name}
        className="w-16 h-16 rounded-lg object-cover bg-muted"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">{startup.name}</span>
          <CountryFlagIcon country={startup.country} />
        </div>
        <div className="flex gap-2 mt-1">
          <Badge variant={startup.incorporated ? "default" : "secondary"}>
            {startup.incorporated ? "Incorporated" : "Not Incorporated"}
          </Badge>
          <Badge variant={startup.funded ? "default" : "secondary"}>
            {startup.funded ? "Funded" : "Not Funded"}
          </Badge>
          {startup.openToInvestment && (
            <Badge variant="outline">Open to Investment</Badge>
          )}
        </div>
        <div className="flex gap-1 mt-2">
          {startup.founders.map((f, i) => (
            <span
              key={i}
              className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold border-2 border-background -ml-2 first:ml-0"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
} 