import Link from "next/link";

import { ImageIcon } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Tables } from "@/types/supabase";

function daysAgo(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diff === 0
    ? "Listed today"
    : `Listed ${diff} day${diff > 1 ? "s" : ""} ago`;
}

export function StartupCard({ startup }: { startup: Tables<"startups"> }) {
  return (
    <Link href={`/startup/${startup.id}`} className="block group">
      <Card className="relative flex flex-col gap-3 p-6 bg-card text-card-foreground rounded-xl shadow-md border-l-4 border-secondary min-h-[320px] transition-transform group-hover:scale-[1.025] group-hover:shadow-lg cursor-pointer">
        {/* Logo and Name Row */}
        <div className="flex gap-3 items-center mb-1">
          <div className="flex overflow-hidden justify-center items-center w-12 h-12 text-xl font-bold rounded text-muted bg-muted">
            {startup.logo_url ? (
              <img
                src={startup.logo_url}
                alt={startup.name}
                className="object-cover w-12 h-12 rounded"
              />
            ) : (
              <ImageIcon className="w-8 h-8 mx-auto" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-lg font-bold truncate text-primary">
                {startup.name}
              </span>
              <span title={startup.country} className="text-xl">
                <ReactCountryFlag
                  countryCode={startup.country}
                  svg
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                    verticalAlign: "middle",
                    borderRadius: "0.2em",
                  }}
                  title={startup.country}
                  aria-label={startup.country}
                />
              </span>
              <span className="ml-2 text-xs whitespace-nowrap text-muted-foreground">
                {daysAgo(startup.listed_at || "")}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="text-base mb-2 min-h-[48px] line-clamp-2 text-muted-foreground">
          {startup.description}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          <Badge
            variant={startup.incorporated ? "default" : "secondary"}
            className={
              startup.incorporated
                ? "bg-primary text-primary-foreground px-3"
                : "bg-muted text-muted-foreground px-3"
            }
          >
            Incorporated: {startup.incorporated ? "Yes" : "No"}
          </Badge>
          <Badge
            variant={startup.funded ? "default" : "secondary"}
            className={
              startup.funded
                ? "bg-primary text-primary-foreground px-3"
                : "bg-muted text-muted-foreground px-3"
            }
          >
            Funded: {startup.funded ? "Yes" : "No"}
          </Badge>
          {startup.open_to_investment && (
            <Badge
              variant="outline"
              className="px-3 text-green-700 bg-green-100 border-green-200"
            >
              Open to Investment
            </Badge>
          )}
        </div>
      </Card>
    </Link>
  );
}
