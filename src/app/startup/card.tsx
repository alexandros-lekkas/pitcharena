import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Image as ImageIcon, User } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import * as React from "react";
import Link from "next/link";

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

export interface StartupCardProps {
  id: string;
  name: string;
  logo?: string;
  founders: string[];
  incorporated: boolean;
  funded: boolean;
  openToInvestment: boolean;
  country: string;
  listedAt: string;
  description: string;
}

export function StartupCard(props: StartupCardProps) {
  return (
    <Link href={`/startup/${props.id}`} className="block group">
      <Card className="relative flex flex-col gap-3 p-6 bg-card text-card-foreground rounded-xl shadow-md border-l-4 border-secondary min-h-[320px] transition-transform group-hover:scale-[1.025] group-hover:shadow-lg cursor-pointer">
        {/* Logo and Name Row */}
        <div className="flex gap-3 items-center mb-1">
          <div className="flex overflow-hidden justify-center items-center w-12 h-12 text-xl font-bold rounded text-muted bg-muted">
            {props.logo ? (
              <img
                src={props.logo}
                alt={props.name}
                className="object-cover w-12 h-12 rounded"
              />
            ) : (
              <ImageIcon className="w-8 h-8" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-lg font-bold truncate text-primary">
                {props.name}
              </span>
              <span title={props.country} className="text-xl">
                <ReactCountryFlag
                  countryCode={props.country}
                  svg
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                    verticalAlign: "middle",
                    borderRadius: "0.2em",
                  }}
                  title={props.country}
                  aria-label={props.country}
                />
              </span>
              <span className="ml-2 text-xs whitespace-nowrap text-muted-foreground">
                {daysAgo(props.listedAt)}
              </span>
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="text-base mb-2 min-h-[48px] line-clamp-2 text-muted-foreground">
          {props.description}
        </div>
        {/* Founders */}
        <div className="mb-2">
          <span className="text-sm text-muted-foreground">Founders:</span>
          <span className="flex gap-1 items-center ml-2">
            {props.founders.length === 0 ? (
              <Avatar className="w-7 h-7 text-muted-foreground bg-muted">
                <User className="w-4 h-4" />
              </Avatar>
            ) : (
              props.founders.map((f, i) => (
                <Avatar
                  key={i}
                  className="flex justify-center items-center -ml-2 w-7 h-7 text-xs font-bold border-2 text-primary bg-muted border-card first:ml-0"
                >
                  {f.length <= 2
                    ? f
                    : f
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                </Avatar>
              ))
            )}
          </span>
        </div>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          <Badge
            variant={props.incorporated ? "default" : "secondary"}
            className={
              props.incorporated
                ? "bg-primary text-primary-foreground px-3"
                : "bg-muted text-muted-foreground px-3"
            }
          >
            Incorporated: {props.incorporated ? "Yes" : "No"}
          </Badge>
          <Badge
            variant={props.funded ? "default" : "secondary"}
            className={
              props.funded
                ? "bg-primary text-primary-foreground px-3"
                : "bg-muted text-muted-foreground px-3"
            }
          >
            Funded: {props.funded ? "Yes" : "No"}
          </Badge>
          {props.openToInvestment && (
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
