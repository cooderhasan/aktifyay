"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import SEOFields from "@/components/admin/SEOFields";
import InternalLinking from "@/components/admin/InternalLinking";
import ImageUpload from "@/components/admin/ImageUpload";
import styles from "./ProductEditForm.module.css";

interface ProductData {
    id?: string;
    slug: string;
    nameTr: string;
    nameEn: string;
    h1Tr?: string | null;
    h1En?: string | null;
    descriptionTr?: string | null;
    descriptionEn?: string | null;
    longDescTr?: string | null;
    longDescEn?: string | null;
    usageAreasTr?: string | null;
    usageAreasEn?: string | null;
    technicalSpecs?: string | null;
    metaTitleTr?: string | null;
    metaTitleEn?: string | null;
    metaDescriptionTr?: string | null;
    metaDescriptionEn?: string | null;
    ogTitleTr?: string | null;
    ogTitleEn?: string | null;
    ogDescriptionTr?: string | null;
    ogDescriptionEn?: string | null;
    ogImage?: string | null;
    canonical?: string | null;
    isIndexed?: boolean;
    isFollowed?: boolean;
    schemaEnabled?: boolean;
    image?: string | null;
    imageAltTr?: string | null;
    imageAltEn?: string | null;
    gallery?: string[];
    relatedIndustries?: string | null;
    isActive?: boolean;
    order?: number;
    faqs?: {
        questionTr: string;
        questionEn: string;
        answerTr: string;
        answerEn: string;
    }[];
}

interface ProductEditFormProps {
    product: ProductData | null;
    industries: { slug: string; name: string }[];
    isNew: boolean;
}

export default function ProductEditForm({ product, industries, isNew }: ProductEditFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"content" | "gallery" | "seo" | "linking" | "faqs">("content");

    const [formData, setFormData] = useState<ProductData>({
        slug: product?.slug || "",
        nameTr: product?.nameTr || "",
        nameEn: product?.nameEn || "",
        h1Tr: product?.h1Tr || "",
        h1En: product?.h1En || "",
        descriptionTr: product?.descriptionTr || "",
        descriptionEn: product?.descriptionEn || "",
        longDescTr: product?.longDescTr || "",
        longDescEn: product?.longDescEn || "",
        usageAreasTr: product?.usageAreasTr || "",
        usageAreasEn: product?.usageAreasEn || "",
        technicalSpecs: product?.technicalSpecs || "",
        metaTitleTr: product?.metaTitleTr || "",
        metaTitleEn: product?.metaTitleEn || "",
        metaDescriptionTr: product?.metaDescriptionTr || "",
        metaDescriptionEn: product?.metaDescriptionEn || "",
        ogTitleTr: product?.ogTitleTr || "",
        ogTitleEn: product?.ogTitleEn || "",
        ogDescriptionTr: product?.ogDescriptionTr || "",
        ogDescriptionEn: product?.ogDescriptionEn || "",
        ogImage: product?.ogImage || "",
        canonical: product?.canonical || "",
        isIndexed: product?.isIndexed ?? true,
        isFollowed: product?.isFollowed ?? true,
        schemaEnabled: product?.schemaEnabled ?? true,
        image: product?.image || "/defaults/product-default.png",
        imageAltTr: product?.imageAltTr || "Yay Ürün Görseli",
        imageAltEn: product?.imageAltEn || "Spring Product Image",
        relatedIndustries: product?.relatedIndustries || "[]",
        gallery: product?.gallery ? JSON.parse(product.gallery as unknown as string) : [],
        isActive: product?.isActive ?? true,
        order: product?.order ?? 0,
        faqs: product?.faqs?.map(f => ({
            questionTr: f.questionTr,
            questionEn: f.questionEn,
            answerTr: f.answerTr,
            answerEn: f.answerEn
        })) || []
    });

    const handleChange = (field: string, value: string | boolean | number | string[]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSEOChange = (field: string, value: string | boolean | number | null) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleRelatedChange = (selectedIds: string[]) => {
        setFormData((prev) => ({ ...prev, relatedIndustries: JSON.stringify(selectedIds) }));
    };

    // Derived state for internal linking
    const relatedItems = formData.relatedIndustries ? JSON.parse(formData.relatedIndustries) : [];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = {
                ...formData,
                gallery: JSON.stringify(formData.gallery || [])
            };

            const response = await fetch(`/api/admin/products${isNew ? "" : `/${product?.id}`}`, {
                method: isNew ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                router.push("/admin/products");
                router.refresh();
            } else {
                alert("Kaydetme başarısız!");
            }
        } catch {
            alert("Bir hata oluştu!");
        } finally {
            setSaving(false);
        }
    };

    // ... (rest of variables)

    return (
        <div className={styles.page}>
            {/* ... (Header) */}

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === "content" ? styles.active : ""}`}
                    onClick={() => setActiveTab("content")}
                >
                    İçerik
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "gallery" ? styles.active : ""}`}
                    onClick={() => setActiveTab("gallery")}
                >
                    Galeri
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "seo" ? styles.active : ""}`}
                    onClick={() => setActiveTab("seo")}
                >
                    SEO Ayarları
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "linking" ? styles.active : ""}`}
                    onClick={() => setActiveTab("linking")}
                >
                    İç Linkleme
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "faqs" ? styles.active : ""}`}
                    onClick={() => setActiveTab("faqs")}
                >
                    Sıkça Sorulan Sorular
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Content Tab */}
                {activeTab === "content" && (
                    <div className={styles.section}>
                        <div className={styles.grid}>
                            <div className={styles.field}>
                                <label>Slug (URL)</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => handleChange("slug", e.target.value)}
                                    placeholder="basma-yaylar"
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Sıra</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => handleChange("order", parseInt(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className={styles.langSection}>
                            <h3>🇹🇷 Türkçe İçerik</h3>
                            <div className={styles.field}>
                                <label>Ad *</label>
                                <input
                                    type="text"
                                    value={formData.nameTr}
                                    onChange={(e) => handleChange("nameTr", e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Kısa Açıklama</label>
                                <textarea
                                    value={formData.descriptionTr || ""}
                                    onChange={(e) => handleChange("descriptionTr", e.target.value)}
                                    rows={3}
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Detaylı Açıklama</label>
                                <textarea
                                    value={formData.longDescTr || ""}
                                    onChange={(e) => handleChange("longDescTr", e.target.value)}
                                    rows={5}
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Kullanım Alanları</label>
                                <textarea
                                    value={formData.usageAreasTr || ""}
                                    onChange={(e) => handleChange("usageAreasTr", e.target.value)}
                                    rows={3}
                                    placeholder="Her satıra bir kullanım alanı"
                                />
                            </div>
                        </div>

                        <div className={styles.langSection}>
                            <h3>🇬🇧 English Content</h3>
                            <div className={styles.field}>
                                <label>Name *</label>
                                <input
                                    type="text"
                                    value={formData.nameEn}
                                    onChange={(e) => handleChange("nameEn", e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Short Description</label>
                                <textarea
                                    value={formData.descriptionEn || ""}
                                    onChange={(e) => handleChange("descriptionEn", e.target.value)}
                                    rows={3}
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Long Description</label>
                                <textarea
                                    value={formData.longDescEn || ""}
                                    onChange={(e) => handleChange("longDescEn", e.target.value)}
                                    rows={5}
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Usage Areas</label>
                                <textarea
                                    value={formData.usageAreasEn || ""}
                                    onChange={(e) => handleChange("usageAreasEn", e.target.value)}
                                    rows={3}
                                    placeholder="One usage area per line"
                                />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label>Ürün Görseli</label>
                            <ImageUpload
                                value={formData.image || ""}
                                onChange={(url) => handleChange("image", url)}
                                label="Ürün Görseli Yükle"
                                description="Önerilen boyut: 800x600px, Maks: 2MB"
                            />
                            <p style={{ fontSize: '0.85rem', color: '#718096', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                💡 Birden fazla görsel eklemek için
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("gallery")}
                                    style={{ color: '#3182ce', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', fontWeight: 500 }}
                                >
                                    Galeri sekmesini
                                </button>
                                kullanabilirsiniz.
                            </p>
                        </div>

                        <div className={styles.grid}>
                            <div className={styles.field}>
                                <label>Görsel Alt Metni (TR)</label>
                                <input
                                    type="text"
                                    value={formData.imageAltTr || ""}
                                    onChange={(e) => handleChange("imageAltTr", e.target.value)}
                                    placeholder="Görseli anlatan kısa açıklama (SEO)"
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Image Alt Text (EN)</label>
                                <input
                                    type="text"
                                    value={formData.imageAltEn || ""}
                                    onChange={(e) => handleChange("imageAltEn", e.target.value)}
                                    placeholder="Brief description of image (SEO)"
                                />
                            </div>
                        </div>

                        <div className={styles.techSpecsSection}>
                            <div className={styles.sectionHeader}>
                                <h3>Teknik Özellikler</h3>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newSpecs = [
                                            ...(JSON.parse(formData.technicalSpecs || "[]")),
                                            { label: "", valueTr: "", valueEn: "" }
                                        ];
                                        handleChange("technicalSpecs", JSON.stringify(newSpecs));
                                    }}
                                    className={styles.addSpecBtn}
                                >
                                    <Plus size={16} /> Özellik Ekle
                                </button>
                            </div>

                            <div className={styles.specsList}>
                                {(() => {
                                    let specs = [];
                                    try {
                                        specs = JSON.parse(formData.technicalSpecs || "[]");
                                    } catch {
                                        specs = [];
                                    }

                                    if (specs.length === 0) {
                                        return (
                                            <div className={styles.emptySpecs}>
                                                <p>Henüz teknik özellik eklenmemiş.</p>
                                            </div>
                                        );
                                    }

                                    return specs.map((spec: any, index: number) => (
                                        <div key={index} className={styles.specItem}>
                                            <div className={styles.specHeader}>
                                                <h4>Özellik #{index + 1}</h4>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newSpecs = specs.filter((_: any, i: number) => i !== index);
                                                        handleChange("technicalSpecs", JSON.stringify(newSpecs));
                                                    }}
                                                    className={styles.removeSpecBtn}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className={styles.specGrid}>
                                                <div className={styles.field}>
                                                    <label>Başlık / Etiket</label>
                                                    <input
                                                        type="text"
                                                        value={spec.label}
                                                        onChange={(e) => {
                                                            const newSpecs = [...specs];
                                                            newSpecs[index].label = e.target.value;
                                                            handleChange("technicalSpecs", JSON.stringify(newSpecs));
                                                        }}
                                                        placeholder="Örn: Tel Çapı"
                                                    />
                                                </div>
                                                <div className={styles.field}>
                                                    <label>Değer (TR)</label>
                                                    <input
                                                        type="text"
                                                        value={spec.valueTr}
                                                        onChange={(e) => {
                                                            const newSpecs = [...specs];
                                                            newSpecs[index].valueTr = e.target.value;
                                                            handleChange("technicalSpecs", JSON.stringify(newSpecs));
                                                        }}
                                                        placeholder="Örn: 1mm - 5mm"
                                                    />
                                                </div>
                                                <div className={styles.field}>
                                                    <label>Değer (EN)</label>
                                                    <input
                                                        type="text"
                                                        value={spec.valueEn}
                                                        onChange={(e) => {
                                                            const newSpecs = [...specs];
                                                            newSpecs[index].valueEn = e.target.value;
                                                            handleChange("technicalSpecs", JSON.stringify(newSpecs));
                                                        }}
                                                        placeholder="Ex: 1mm - 5mm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ));
                                })()}
                            </div>
                        </div>
                    </div>
                )}

                {/* Gallery Tab */}
                {activeTab === "gallery" && (
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h3>Galeri Görselleri</h3>
                            <button
                                type="button"
                                onClick={() => {
                                    const newGallery = [...(formData.gallery || []), ""];
                                    handleChange("gallery", newGallery);
                                }}
                                className={styles.addSpecBtn}
                            >
                                <Plus size={16} /> Görsel Ekle
                            </button>
                        </div>

                        <div className={styles.galleryGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                            {(formData.gallery || []).map((img, index) => (
                                <div key={index} className={styles.galleryItem} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', position: 'relative' }}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newGallery = formData.gallery!.filter((_, i) => i !== index);
                                            handleChange("gallery", newGallery);
                                        }}
                                        style={{ position: 'absolute', top: '5px', right: '5px', zIndex: 10, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                    <ImageUpload
                                        value={img}
                                        onChange={(url) => {
                                            const newGallery = [...formData.gallery!];
                                            newGallery[index] = url;
                                            handleChange("gallery", newGallery);
                                        }}
                                        label={`Görsel ${index + 1}`}
                                    />
                                </div>
                            ))}
                            {(formData.gallery || []).length === 0 && (
                                <p style={{ color: '#666', gridColumn: '1/-1' }}>Henüz galeri görseli eklenmemiş.</p>
                            )}
                        </div>
                    </div>
                )}

                {/* SEO Tab */}
                {activeTab === "seo" && (
                    <div className={styles.section}>
                        <SEOFields
                            data={{
                                metaTitleTr: formData.metaTitleTr || undefined,
                                metaTitleEn: formData.metaTitleEn || undefined,
                                metaDescriptionTr: formData.metaDescriptionTr || undefined,
                                metaDescriptionEn: formData.metaDescriptionEn || undefined,
                                h1Tr: formData.h1Tr || undefined,
                                h1En: formData.h1En || undefined,
                                ogTitleTr: formData.ogTitleTr || undefined,
                                ogTitleEn: formData.ogTitleEn || undefined,
                                ogDescriptionTr: formData.ogDescriptionTr || undefined,
                                ogDescriptionEn: formData.ogDescriptionEn || undefined,
                                ogImage: formData.ogImage || undefined,
                                canonical: formData.canonical || undefined,
                                isIndexed: formData.isIndexed,
                                isFollowed: formData.isFollowed,
                                schemaEnabled: formData.schemaEnabled,
                                imageAltTr: formData.imageAltTr || undefined,
                                imageAltEn: formData.imageAltEn || undefined,
                            }}
                            onChange={handleSEOChange}
                            showImageAlt={false}
                        />
                    </div>
                )}

                {/* Internal Linking Tab */}
                {activeTab === "linking" && (
                    <div className={styles.section}>
                        <InternalLinking
                            type="industries"
                            selectedItems={relatedItems}
                            availableItems={industries}
                            onChange={handleRelatedChange}
                        />
                    </div>
                )}

                {/* FAQs Tab */}
                {activeTab === "faqs" && (
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h3>Sıkça Sorulan Sorular</h3>
                            <button
                                type="button"
                                onClick={() => {
                                    const newFaqs = [
                                        ...(formData.faqs || []),
                                        { questionTr: "", questionEn: "", answerTr: "", answerEn: "" }
                                    ];
                                    setFormData(prev => ({ ...prev, faqs: newFaqs }));
                                }}
                                className={styles.addSpecBtn}
                            >
                                <Plus size={16} /> Soru Ekle
                            </button>
                        </div>

                        <div className={styles.specsList}>
                            {(!formData.faqs || formData.faqs.length === 0) ? (
                                <div className={styles.emptySpecs}>
                                    <p>Henüz soru eklenmemiş.</p>
                                </div>
                            ) : (
                                formData.faqs.map((faq, index) => (
                                    <div key={index} className={styles.specItem}>
                                        <div className={styles.specHeader}>
                                            <h4>Soru #{index + 1}</h4>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newFaqs = formData.faqs!.filter((_, i) => i !== index);
                                                    setFormData(prev => ({ ...prev, faqs: newFaqs }));
                                                }}
                                                className={styles.removeSpecBtn}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div className={styles.specGrid}>
                                            <div className={styles.field}>
                                                <label>Soru (TR)</label>
                                                <input
                                                    type="text"
                                                    value={faq.questionTr}
                                                    onChange={(e) => {
                                                        const newFaqs = [...formData.faqs!];
                                                        newFaqs[index].questionTr = e.target.value;
                                                        setFormData(prev => ({ ...prev, faqs: newFaqs }));
                                                    }}
                                                    placeholder="Soru metni"
                                                />
                                            </div>
                                            <div className={styles.field}>
                                                <label>Cevap (TR)</label>
                                                <textarea
                                                    value={faq.answerTr}
                                                    onChange={(e) => {
                                                        const newFaqs = [...formData.faqs!];
                                                        newFaqs[index].answerTr = e.target.value;
                                                        setFormData(prev => ({ ...prev, faqs: newFaqs }));
                                                    }}
                                                    placeholder="Cevap metni"
                                                    rows={3}
                                                />
                                            </div>
                                            <div className={styles.field}>
                                                <label>Question (EN)</label>
                                                <input
                                                    type="text"
                                                    value={faq.questionEn}
                                                    onChange={(e) => {
                                                        const newFaqs = [...formData.faqs!];
                                                        newFaqs[index].questionEn = e.target.value;
                                                        setFormData(prev => ({ ...prev, faqs: newFaqs }));
                                                    }}
                                                    placeholder="Question text"
                                                />
                                            </div>
                                            <div className={styles.field}>
                                                <label>Answer (EN)</label>
                                                <textarea
                                                    value={faq.answerEn}
                                                    onChange={(e) => {
                                                        const newFaqs = [...formData.faqs!];
                                                        newFaqs[index].answerEn = e.target.value;
                                                        setFormData(prev => ({ ...prev, faqs: newFaqs }));
                                                    }}
                                                    placeholder="Answer text"
                                                    rows={3}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                <div className={styles.footer}>
                    <Link href="/admin/products" className={styles.cancelBtn}>
                        İptal
                    </Link>
                    <button type="submit" disabled={saving} className={styles.saveBtn}>
                        <Save size={18} />
                        {saving ? "Kaydediliyor..." : "Kaydet"}
                    </button>
                </div>
            </form>
        </div>
    );
}
