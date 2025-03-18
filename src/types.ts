export interface FormField {
  type:
    | "text"
    | "password"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio"
    | "switch"
    | "file";
  name: string;
  label?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  className?: string;
  required: boolean;
}

export interface Location {
  origin: string;
}

export interface ErrorResponse {
  message: string;
  status: number;
  errorData?: any;
}

export interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: BodyInit | null | undefined;
}

export interface CrudOptions extends RequestOptions {
  action?: "create" | "read" | "update" | "delete";
}

export type ActonType = "create" | "read" | "update" | "delete";

export enum methods {
  create = "POST",
  read = "GET",
  update = "PUT",
  delete = "DELETE",
}
