import { getBlogCategory } from "@/actions/blog-category";
import CategoryForm from "./CategoryForm";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function AdminBlogCategoryEditPage({ params }: PageProps) {
    const { id } = await params;

    if (id === "new") {
        return <CategoryForm category={null} isNew={true} />;
    }

    const { success, data } = await getBlogCategory(id);

    if (!success || !data) {
        notFound();
    }

    return <CategoryForm category={data} isNew={false} />;
}
