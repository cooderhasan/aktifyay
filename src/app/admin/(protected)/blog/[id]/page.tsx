import { getBlogPost } from "@/actions/blog";
import { getBlogCategories } from "@/actions/blog-category";
import BlogPostForm from "./BlogPostForm";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function AdminBlogEditPage({ params }: PageProps) {
    const { id } = await params;

    // Fetch categories for dropdown
    const categoriesResult = await getBlogCategories();
    const categories = categoriesResult.success ? categoriesResult.data : [];

    if (id === "new") {
        return <BlogPostForm post={null} isNew={true} categories={categories} />; // @ts-ignore
    }

    const { success, data } = await getBlogPost(id);

    if (!success || !data) {
        notFound();
    }

    return <BlogPostForm post={data} isNew={false} categories={categories} />; // @ts-ignore
}
