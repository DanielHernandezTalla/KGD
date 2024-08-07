import { Toast } from "@/components/atoms";
import { ToastProps } from "@/components/atoms/Toast/Toast";

export default function ToastContainer({ toastList }: { toastList: Array<ToastProps> }) {

    return (
        <div className="fixed top-5 right-5 z-50 flex flex-col gap-y-3 max-w-sm w-full">
            {
                toastList.map((item, index) => {
                    return (
                        <Toast 
                            key={index}
                            title={item.title}
                            message={item.message}
                            icon={item.icon}
                            permanent={item.permanent}/>
                    )
                })
            }
        </div>
    );
}