import type { ReactNode } from "react";

type MensajeProps = {
  children: ReactNode;
  type?: "error" | "success" ; 
};

export default function Mensajes({children, type} : MensajeProps) {
  return (
     <p className={`text-center my-4 border rounded-lg ${type === 'error' ? `bg-red-800 border-red-600`: `bg-green-600 border-green-300`} text-white font-bold p-2 uppercase text-sm`}>
      {children}
    </p>
  )
}
