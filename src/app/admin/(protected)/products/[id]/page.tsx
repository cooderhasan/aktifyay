import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductEditForm from "./ProductEditForm";

interface ProductEditPageProps {
    params: Promise<{ id: string }>;
}

export const metadata = {
    title: "Ürün Düzenle | Admin",
};

export default async function ProductEditPage({ params }: ProductEditPageProps) {
    const { id } = await params;

    // Handle "new" case
    const isNew = id === "new";

    let product = null;
    if (!isNew) {
        product = await prisma.productCategory.findUnique({
            where: { id },
            include: { faqs: true },
        });

        if (!product) {
            notFound();
        }
    }

    // Get all industries for internal linking
    const industries = await prisma.industry.findMany({
        select: { slug: true, nameTr: true },
        orderBy: { order: "asc" },
    });

    return (
        <ProductEditForm
            product={product}
            industries={industries.map((i) => ({ slug: i.slug, name: i.nameTr }))}
            isNew={isNew}
        />
    );
}
