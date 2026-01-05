"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import SEOFields from "@/components/admin/SEOFields";
import styles from "./BlogPostForm.module.css";
import { createBlogPost, updateBlogPost, deleteBlogPost } from "@/actions/blog";
import RichEditor from "@/components/admin/RichEditor";
import ImageUpload from "@/components/admin/ImageUpload";

// Fallback types
type BlogPost = any;
type BlogCategory = any;

interface BlogPostFormProps {
    post: BlogPost | null;
    isNew: boolean;
    categories: BlogCategory[];
}

export default function BlogPostForm({ post, isNew, categories }: BlogPostFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"content" | "seo" | "settings">("content");

    const [formData, setFormData] = useState<any>({
        slug: post?.slug || "",
        categoryId: post?.categoryId || "",

        // Content
        titleTr: post?.titleTr || "",
        titleEn: post?.titleEn || "",
        contentTr: post?.contentTr || "",
        contentEn: post?.contentEn || "",
        descriptionTr: post?.descriptionTr || "",
        descriptionEn: post?.descriptionEn || "",

        // Media
        image: post?.image || "",
        imageAltTr: post?.imageAltTr || "",
        imageAltEn: post?.imageAltEn || "",

        // Advanced SEO
        keywordsTr: post?.keywordsTr || "",
        keywordsEn: post?.keywordsEn || "",
        canonicalUrl: post?.canonicalUrl || "",
        robots: post?.robots || "index, follow",

        // Meta Tags
        metaTitleTr: post?.metaTitleTr || "",
        metaTitleEn: post?.metaTitleEn || "",
        metaDescriptionTr: post?.metaDescriptionTr || "",
        metaDescriptionEn: post?.metaDescriptionEn || "",

        // OG Tags
        ogTitleTr: post?.ogTitleTr || "",
        ogTitleEn: post?.ogTitleEn || "",
        ogDescriptionTr: post?.ogDescriptionTr || "",
        ogDescriptionEn: post?.ogDescriptionEn || "",
        ogImage: post?.ogImage || "",

        // Other
        authorName: post?.authorName || "",
        isPublished: post?.isPublished || false,
    });

    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleSEOChange = (field: string, value: string | boolean) => {
        handleChange(field, value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            let result;
            if (isNew) {
                result = await createBlogPost(formData);
            } else {
                if (!post?.id) return;
                result = await updateBlogPost(post.id, formData);
            }

            if (result.success) {
                router.push("/admin/blog");
                router.refresh();
            } else {
                alert(result.error || "Kaydetme başarısız!");
            }
        } catch {
            alert("Bir hata oluştu!");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!post?.id) return;
        if (!confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return;

        const result = await deleteBlogPost(post.id);
        if (result.success) {
            router.push("/admin/blog");
            router.refresh();
        } else {
            alert(result.error || "Silme başarısız!");
        }
    };

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <Link href="/admin/blog" className={styles.backBtn}>
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1>{isNew ? "Yeni Blog Yazısı" : "Yazıyı Düzenle"}</h1>
                        <p>{isNew ? "Yeni yazı oluştur" : formData.titleTr}</p>
                    </div>
                </div>
                <div className={styles.headerActions}>
                    {!isNew && (
                        <>
                            <Link
                                href={`/tr/blog/${post.slug}`}
                                target="_blank"
                                className={styles.viewBtn}
                                title="Sitede Görüntüle"
                            >
                                <Eye size={18} />
                            </Link>
                            <button type="button" className={styles.deleteBtn} onClick={handleDelete}>
                                <Trash2 size={18} />
                            </button>
                        </>
                    )}
                </div>
            </header>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === "content" ? styles.active : ""}`}
                    onClick={() => setActiveTab("content")}
                >
                    İçerik & Medya
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "seo" ? styles.active : ""}`}
                    onClick={() => setActiveTab("seo")}
                >
                    SEO Ayarları
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "settings" ? styles.active : ""}`}
                    onClick={() => setActiveTab("settings")}
                >
                    Ayarlar
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Content Tab */}
                {activeTab === "content" && (
                    <div className={styles.section}>
                        <div className={styles.field} style={{ marginBottom: "1.5rem" }}>
                            <label>Slug (URL) *</label>
                            <input
                                type="text"
                                value={formData.slug || ""}
                                onChange={(e) => handleChange("slug", e.target.value)}
                                placeholder="yeni-blog-yazisi"
                                required
                            />
                        </div>

                        <div className={styles.langSection}>
                            <h3>🇹🇷 Türkçe İçerik</h3>
                            <div className={styles.field}>
                                <label>Başlık *</label>
                                <input
                                    type="text"
                                    value={formData.titleTr || ""}
                                    onChange={(e) => handleChange("titleTr", e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Kısa Açıklama (Özet)</label>
                                <textarea
                                    value={formData.descriptionTr || ""}
                                    onChange={(e) => handleChange("descriptionTr", e.target.value)}
                                    rows={3}
                                />
                            </div>
                            <div className={styles.field}>
                                <label>İçerik</label>
                                <RichEditor
                                    value={formData.contentTr || ""}
                                    onChange={(val) => handleChange("contentTr", val)}
                                />
                            </div>
                        </div>

                        <div className={styles.langSection}>
                            <h3>🇬🇧 English Content</h3>
                            <div className={styles.field}>
                                <label>Title *</label>
                                <input
                                    type="text"
                                    value={formData.titleEn || ""}
                                    onChange={(e) => handleChange("titleEn", e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Short Description (Excerpt)</label>
                                <textarea
                                    value={formData.descriptionEn || ""}
                                    onChange={(e) => handleChange("descriptionEn", e.target.value)}
                                    rows={3}
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Content</label>
                                <RichEditor
                                    value={formData.contentEn || ""}
                                    onChange={(val) => handleChange("contentEn", val)}
                                />
                            </div>
                        </div>

                        <div className={styles.section} style={{ marginTop: '1.5rem' }}>
                            <h3>Medya</h3>
                            <div className={styles.field}>
                                <ImageUpload
                                    label="Kapak Görseli"
                                    value={formData.image || ""}
                                    onChange={(val) => handleChange("image", val)}
                                />
                            </div>
                            <div className={styles.grid}>
                                <div className={styles.field}>
                                    <label>Görsel Alt Metni (TR)</label>
                                    <input
                                        type="text"
                                        value={formData.imageAltTr || ""}
                                        onChange={(e) => handleChange("imageAltTr", e.target.value)}
                                    />
                                </div>
                                <div className={styles.field}>
                                    <label>Image Alt Text (EN)</label>
                                    <input
                                        type="text"
                                        value={formData.imageAltEn || ""}
                                        onChange={(e) => handleChange("imageAltEn", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* SEO Tab */}
                {activeTab === "seo" && (
                    <div className={styles.section}>
                        <div className={styles.field} style={{ marginBottom: "1.5rem" }}>
                            <label>Canonical URL</label>
                            <input
                                type="url"
                                value={formData.canonicalUrl || ""}
                                onChange={(e) => handleChange("canonicalUrl", e.target.value)}
                                placeholder="Varsayılan için boş bırakın"
                            />
                        </div>
                        <div className={styles.field} style={{ marginBottom: "1.5rem" }}>
                            <label>Robots Meta Tag</label>
                            <select
                                value={formData.robots || "index, follow"}
                                onChange={(e) => handleChange("robots", e.target.value)}
                            >
                                <option value="index, follow">index, follow (Varsayılan)</option>
                                <option value="noindex, follow">noindex, follow</option>
                                <option value="index, nofollow">index, nofollow</option>
                                <option value="noindex, nofollow">noindex, nofollow</option>
                            </select>
                        </div>

                        <div className={styles.grid}>
                            <div className={styles.field}>
                                <label>Keywords (TR) - Virgülle ayırın</label>
                                <input
                                    type="text"
                                    value={formData.keywordsTr || ""}
                                    onChange={(e) => handleChange("keywordsTr", e.target.value)}
                                    placeholder="yay, üretim, sanayi"
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Keywords (EN)</label>
                                <input
                                    type="text"
                                    value={formData.keywordsEn || ""}
                                    onChange={(e) => handleChange("keywordsEn", e.target.value)}
                                    placeholder="springs, manufacturing, industry"
                                />
                            </div>
                        </div>

                        <hr style={{ margin: "2rem 0", border: 0, borderTop: "1px solid #eee" }} />

                        <SEOFields
                            data={{
                                metaTitleTr: formData.metaTitleTr || undefined,
                                metaTitleEn: formData.metaTitleEn || undefined,
                                metaDescriptionTr: formData.metaDescriptionTr || undefined,
                                metaDescriptionEn: formData.metaDescriptionEn || undefined,
                            }}
                            onChange={handleSEOChange}
                        />

                        <div className={styles.langSection} style={{ marginTop: "1.5rem" }}>
                            <h3>Open Graph (Sosyal Medya)</h3>
                            <div className={styles.field}>
                                <ImageUpload
                                    label="OG Sosyal Medya Görseli"
                                    description="Boş bırakılırsa kapak görseli kullanılır."
                                    value={formData.ogImage || ""}
                                    onChange={(val) => handleChange("ogImage", val)}
                                />
                            </div>
                            <div className={styles.grid}>
                                <div className={styles.field}>
                                    <label>OG Başlık (TR)</label>
                                    <input
                                        type="text"
                                        value={formData.ogTitleTr || ""}
                                        onChange={(e) => handleChange("ogTitleTr", e.target.value)}
                                    />
                                </div>
                                <div className={styles.field}>
                                    <label>OG Açıklama (TR)</label>
                                    <textarea
                                        value={formData.ogDescriptionTr || ""}
                                        onChange={(e) => handleChange("ogDescriptionTr", e.target.value)}
                                        rows={2}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                    <div className={styles.section}>
                        <div className={styles.field}>
                            <label>Yayın Durumu</label>
                            <label className={styles.checkboxLabel} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={formData.isPublished}
                                    onChange={(e) => handleChange("isPublished", e.target.checked)}
                                    style={{ width: 'auto' }}
                                />
                                <span>Yayında</span>
                            </label>
                        </div>

                        <div className={styles.field}>
                            <label>Kategori</label>
                            <select
                                value={formData.categoryId || ""}
                                onChange={(e) => handleChange("categoryId", e.target.value)}
                            >
                                <option value="">Kategori Seçin</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.nameTr}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label>Yazar Adı (Opsiyonel)</label>
                            <input
                                type="text"
                                value={formData.authorName || ""}
                                onChange={(e) => handleChange("authorName", e.target.value)}
                                placeholder="Örn: Aktif Yay Ekibi (Boş bırakılırsa varsayılan kullanılır)"
                            />
                        </div>
                    </div>
                )}

                <div className={styles.footer}>
                    <Link href="/admin/blog" className={styles.cancelBtn}>
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
