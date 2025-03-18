import React, { Children, useState } from "react";
import FormContext from "@/context/FormContext";
import performCrudOperation from "@/lib/utils/api";

interface FormProviderProps {
  children:React.ReactNode;
  method?: "POST" | "GET" | "PUT" | "DELETE";
  url: string;
  urlKey?: string;
  onSuccess?: (data: any) => void;
  isSubmit?: boolean;
  SubmitClassName?: string;
  SubmitText?: string;
  isHideMsg?: boolean;
  isFormData?: boolean;
  disableAction?: boolean;
  colorSubmit?: "primary" | "secondary" | "danger";
  className?: string;
}

interface FormField {
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
}

const FormProvider: React.FC<FormProviderProps> = ({
  children,
  method = "POST",
  url,
  onSuccess,
  isFormData = false,
  className,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});

    let hasError = false;
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        setErrors((prev) => ({ ...prev, [key]: "این فیلد الزامی است" }));
        hasError = true;
      }
    });

    if (hasError) {
      setLoading(false);
      return;
    }
    try {
      const response = await performCrudOperation(
        url,
        { method },
        isFormData ? formData : JSON.stringify(formData),
        isFormData
      );
      onSuccess?.(response);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        global: "مشکلی در ارتباط با سرور وجود دارد",
      }));
    }

    setLoading(false);
  };

  return (
    <FormContext.Provider value={{ formData, handleChange, errors }}>
      <form onSubmit={handleSubmit} className={className}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default FormProvider;
