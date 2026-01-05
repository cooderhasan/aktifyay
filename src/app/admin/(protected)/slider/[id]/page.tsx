import { notFound } from "next/navigation";
import { getSlider } from "@/actions/slider";
import SliderForm from "./SliderForm";

interface PageProps {
    params: Promise<{ id: string }>;
}

export const metadata = {
    title: "Slider Düzenle | Admin",
};

export default async function AdminSliderEditPage({ params }: PageProps) {
    const { id } = await params;
    const isNew = id === "new";

    let slider = null;

    if (!isNew) {
        slider = await getSlider(id);
        if (!slider) {
            notFound();
        }
    }

    return <SliderForm slider={slider} isNew={isNew} />;
}
