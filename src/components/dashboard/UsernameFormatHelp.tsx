
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { InfoIcon } from "lucide-react";

interface UsernameFormatHelpProps {
  userType: "student" | "placement" | "employer" | "admin";
}

export default function UsernameFormatHelp({ userType }: UsernameFormatHelpProps) {
  const formatInfo = {
    student: {
      format: "4SF22XX999",
      examples: ["4SF22CI001", "4SF22IS042", "4SF22CS101"],
      description: "XX can be CI, IS, ME, RA, CS, or CD, followed by a 3-digit number",
    },
    placement: {
      format: "FA999",
      examples: ["FA001", "FA042", "FA123"],
      description: "Faculty admin code followed by a 3-digit number",
    },
    employer: {
      format: "CA999",
      examples: ["CA001", "CA042", "CA123"],
      description: "Company admin code followed by a 3-digit number",
    },
    admin: {
      format: "SA999",
      examples: ["SA001", "SA042", "SA123"],
      description: "System admin code followed by a 3-digit number",
    },
  };

  const info = formatInfo[userType];

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button type="button" className="inline-flex items-center text-muted-foreground hover:text-primary">
          <InfoIcon className="h-4 w-4 mr-1" />
          <span>Username format help</span>
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium">Username Format</h4>
          <p className="text-sm">{info.format}</p>
          <div>
            <p className="text-sm font-medium">Examples:</p>
            <ul className="list-disc list-inside text-sm">
              {info.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">{info.description}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
