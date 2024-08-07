import { LoadingSpinner } from "@/components/atoms";
import Layout from "@/components/layouts/MainLayout";
import { TitlePage } from "../TitlePage";

interface FormLayoutProps {
    title: string;
    children: React.ReactNode;
    isLoading?: boolean;
    isError?: boolean;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
    title,
    children,
    isLoading,
    isError,
}) => (
    <Layout>
        <TitlePage title={title} />
        {isLoading ? (
            <LoadingSpinner />
        ) : isError ? (
            <div>Error</div>
        ) : (
            <div className="mt-12">{children}</div>
        )}
    </Layout>
);
