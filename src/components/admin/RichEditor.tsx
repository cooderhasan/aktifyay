"use client";

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'react-quill-new/dist/quill.snow.css';

interface RichEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function RichEditor({ value, onChange, placeholder }: RichEditorProps) {
    // Dynamically import ReactQuill to avoid SSR issues
    const ReactQuill = useMemo(
        () => dynamic(() => import('react-quill-new'), {
            ssr: false,
            loading: () => <p>Editör yükleniyor...</p>
        }),
        []
    );

    const modules = {
        toolbar: [
            [{ 'header': [2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet',
        'link', 'image'
    ];

    return (
        <div className="rich-editor-wrapper" style={{ minHeight: '350px' }}>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                style={{ height: '300px', background: 'white', display: 'flex', flexDirection: 'column' }}
            />
        </div>
    );
}
