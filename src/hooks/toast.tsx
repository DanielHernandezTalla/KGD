import { ToastIcon, ToastProps } from "@/components/atoms/Toast/Toast";
import ToastContainer from "@/components/molecules/ToastContainer";
import { ReactNode, createContext, useContext, useState } from "react";

type ToastContextType = {
    toast: (messageOrOptions: string | ToastProps, title?: string, icon?: ToastIcon, permanent?: boolean) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {   

    const [toastList, setToastList] = useState(new Array<ToastProps>);

    function toast(param1: string | ToastProps, param2?: string, param3?: ToastIcon, param4?: boolean) {
        if (typeof param1 === 'string') {
            const newToast: ToastProps = {
                title: param2,
                message: param1,
                icon: param3,
                permanent: param4,
            };
            
            const nuevaToastList = [...toastList, newToast];
            setToastList(nuevaToastList);

        } else {
            const newToast = param1;
            const nuevaToastList = [...toastList, newToast];
            setToastList(nuevaToastList);
        }      
    }

    const contextValue: ToastContextType = {
        toast
    }

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <ToastContainer toastList={toastList}/>
        </ToastContext.Provider>
    );
};

/**
 * Hook personalizado para acceder a la función toast.
 * @returns Retorna el contexto del ToastProvider.
 */
export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast debe ser utilizado dentro de un ToastProvider");
    }
    return context;
}