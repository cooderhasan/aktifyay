import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PageForm from "./PageForm";

interface PageEditPageProps {
    params: Promise<{ id: string }>;
}

export const metadata = {
    title: "Sayfa Düzenle | Admin",
};

export default async function PageEditPage({ params }: PageEditPageProps) {
    const { id } = await params;

    // Handle "new" case
    const isNew = id === "new";

    let page = null;
    if (!isNew) {
        page = await prisma.page.findUnique({
            where: { id },
        });

        if (!page) {
            notFound();
        }
    }

    return (
        <PageForm
            page={page}
            isNew={isNew}
        />
    );
}
