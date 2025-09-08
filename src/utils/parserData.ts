import type { Employee } from "../types/employee";

export function parseNumber(value: string, headerValue: keyof Employee) {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new Error(
      `Invalid value for ${headerValue}: ${value}, must be a number`,
    );
  }
  return parsedValue;
}

export function parseDate(value: string, headerValue: keyof Employee) {
  const isStillWorking =
    typeof value === "string" &&
    value.toLowerCase() === "null" &&
    headerValue === "dateTo";

  if (isStillWorking) {
    return new Date();
  }

  const date =
    isNaN(Number(value)) || value.trim() === ""
      ? new Date(value)
      : new Date(Number(value));

  if (isNaN(date.getTime())) {
    throw new Error(
      `Invalid value for ${headerValue}: ${value}, must be a correct date format`,
    );
  }

  return date;
}
