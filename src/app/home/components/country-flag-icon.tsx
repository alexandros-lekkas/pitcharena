interface CountryFlagIconProps {
  country: string; // ISO 3166-1 alpha-2 code
  className?: string;
}

function countryCodeToEmoji(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

export default function CountryFlagIcon({ country, className }: CountryFlagIconProps) {
  return (
    <span className={className} title={country} style={{ fontSize: '1.2em' }}>
      {countryCodeToEmoji(country)}
    </span>
  );
} 