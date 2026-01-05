import { prisma } from "@/lib/prisma";
import ReferenceForm from "../ReferenceForm";
import { notFound } from "next/navigation";

interface EditReferencePageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EditReferencePageProps) {
    const { id } = await params;
    // @ts-ignore
    const reference = await prisma.reference.findUnique({ where: { id } });
    return {
        title: reference ? `${reference.name} Düzenle | Admin` : "Referans Bulunamadı",
    };
}

export default async function EditReferencePage({ params }: EditReferencePageProps) {
    const { id } = await params;
    // @ts-ignore
    const reference = await prisma.reference.findUnique({ where: { id } });

    if (!reference) {
        notFound();
    }

    return <ReferenceForm reference={reference} />;
}
