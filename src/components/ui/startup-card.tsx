import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Globe, Image as ImageIcon, User } from "lucide-react";
import * as React from "react";

function daysAgo(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  return diff === 0 ? "Listed today" : `Listed ${diff} day${diff > 1 ? "s" : ""} ago`;
}

function countryCodeToEmoji(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
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
    <Card className="relative flex flex-col gap-3 p-6 bg-white rounded-xl shadow-md border-l-4 border-secondary min-h-[320px]">
      {/* Logo and Name Row */}
      <div className="flex items-center gap-3 mb-1">
        <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-gray-300 font-bold text-xl overflow-hidden">
          {props.logo ? (
            <img src={props.logo} alt={props.name} className="w-12 h-12 object-cover rounded" />
          ) : (
            <ImageIcon className="w-8 h-8" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-lg text-primary truncate">{props.name}</span>
            <span title={props.country} className="text-xl">
              {countryCodeToEmoji(props.country)}
            </span>
            <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{daysAgo(props.listedAt)}</span>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="text-gray-700 text-base mb-2 min-h-[48px] line-clamp-2">{props.description}</div>
      {/* Founders */}
      <div className="mb-2">
        <span className="text-gray-500 text-sm">Founders:</span>
        <span className="ml-2 flex gap-1 items-center">
          {props.founders.length === 0 ? (
            <Avatar className="w-7 h-7 bg-gray-200 text-gray-500">
              <User className="w-4 h-4" />
            </Avatar>
          ) : (
            props.founders.map((f, i) => (
              <Avatar key={i} className="w-7 h-7 bg-gray-200 text-gray-700 font-bold text-xs border-2 border-white -ml-2 first:ml-0 flex items-center justify-center">
                {f.length <= 2 ? f : f.split(" ").map((n) => n[0]).join("")}
              </Avatar>
            ))
          )}
        </span>
      </div>
      {/* Tags */}
      <div className="flex gap-2 flex-wrap mt-auto">
        <Badge variant={props.incorporated ? "default" : "secondary"} className={props.incorporated ? "bg-primary text-white px-3" : "bg-gray-200 text-gray-600 px-3"}>
          Incorporated: {props.incorporated ? "Yes" : "No"}
        </Badge>
        <Badge variant={props.funded ? "default" : "secondary"} className={props.funded ? "bg-primary text-white px-3" : "bg-gray-200 text-gray-600 px-3"}>
          Funded: {props.funded ? "Yes" : "No"}
        </Badge>
        {props.openToInvestment && (
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 px-3">
            Open to Investment
          </Badge>
        )}
      </div>
    </Card>
  );
} 