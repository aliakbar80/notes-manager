import { createContext, useContext } from "react";

const FormContext = createContext<any>(null);

export const useForm = () => {
  return useContext(FormContext);
};

export default FormContext;
