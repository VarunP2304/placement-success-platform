
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const usernamePatterns = {
  student: {
    regex: /^4SF22(CI|IS|ME|RA|CS|CD)[0-9]{3}$/,
    hint: "Format: 4SF22CI123 (where CI can be IS, ME, RA, CS, or CD)",
    example: "4SF22CI001"
  },
  placement: {
    regex: /^FA[0-9]{3}$/,
    hint: "Format: FA123 (where 123 is a 3-digit number)",
    example: "FA001"
  },
  employer: {
    regex: /^CA[0-9]{3}$/,
    hint: "Format: CA123 (where 123 is a 3-digit number)",
    example: "CA001"
  },
  admin: {
    regex: /^SA[0-9]{3}$/,
    hint: "Format: SA123 (where 123 is a 3-digit number)",
    example: "SA001"
  }
};

export const validateUsername = (username: string, role: string): boolean => {
  const pattern = usernamePatterns[role as keyof typeof usernamePatterns];
  if (!pattern) return false;
  return pattern.regex.test(username);
};
