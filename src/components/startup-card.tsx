import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Image as ImageIcon, User } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import * as React from "react";

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
    <Card className="relative flex flex-col gap-3 p-6 bg-white rounded-xl shadow-md border-l-4 border-secondary min-h-[320px]">
      {/* Logo and Name Row */}
      <div className="flex gap-3 items-center mb-1">
        <div className="flex overflow-hidden justify-center items-center w-12 h-12 text-xl font-bold text-gray-300 bg-gray-100 rounded">
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
                title={props.country}
                aria-label={props.country}
              />
            </span>
            <span className="ml-2 text-xs text-gray-500 whitespace-nowrap">
              {daysAgo(props.listedAt)}
            </span>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="text-gray-700 text-base mb-2 min-h-[48px] line-clamp-2">
        {props.description}
      </div>
      {/* Founders */}
      <div className="mb-2">
        <span className="text-sm text-gray-500">Founders:</span>
        <span className="flex gap-1 items-center ml-2">
          {props.founders.length === 0 ? (
            <Avatar className="w-7 h-7 text-gray-500 bg-gray-200">
              <User className="w-4 h-4" />
            </Avatar>
          ) : (
            props.founders.map((f, i) => (
              <Avatar
                key={i}
                className="flex justify-center items-center -ml-2 w-7 h-7 text-xs font-bold text-gray-700 bg-gray-200 border-2 border-white first:ml-0"
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
              ? "bg-primary text-white px-3"
              : "bg-gray-200 text-gray-600 px-3"
          }
        >
          Incorporated: {props.incorporated ? "Yes" : "No"}
        </Badge>
        <Badge
          variant={props.funded ? "default" : "secondary"}
          className={
            props.funded
              ? "bg-primary text-white px-3"
              : "bg-gray-200 text-gray-600 px-3"
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
  );
}
