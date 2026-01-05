import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CatalogForm from "./CatalogForm";

interface CatalogEditPageProps {
    params: Promise<{ id: string }>;
}

export const metadata = {
    title: "Katalog Düzenle | Admin",
};

export default async function CatalogEditPage({ params }: CatalogEditPageProps) {
    const { id } = await params;
    const isNew = id === "new";

    let catalog = null;
    if (!isNew) {
        catalog = await prisma.catalog.findUnique({
            where: { id },
        });

        if (!catalog) {
            notFound();
        }
    }

    return (
        <CatalogForm
            catalog={catalog}
            isNew={isNew}
        />
    );
}
