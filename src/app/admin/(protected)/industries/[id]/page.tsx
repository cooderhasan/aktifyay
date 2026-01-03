import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import IndustryEditForm from "./IndustryEditForm";

interface IndustryEditPageProps {
    params: Promise<{ id: string }>;
}

export const metadata = {
    title: "Sektör Düzenle | Admin",
};

export default async function IndustryEditPage({ params }: IndustryEditPageProps) {
    const { id } = await params;

    const isNew = id === "new";

    let industry = null;
    if (!isNew) {
        industry = await prisma.industry.findUnique({
            where: { id },
            include: { faqs: true },
        });

        if (!industry) {
            notFound();
        }
    }

    // Get all products for internal linking
    const products = await prisma.productCategory.findMany({
        select: { slug: true, nameTr: true },
        orderBy: { order: "asc" },
    });

    return (
        <IndustryEditForm
            industry={industry}
            products={products.map((p) => ({ slug: p.slug, name: p.nameTr }))}
            isNew={isNew}
        />
    );
}
