"use client";

import { Printer } from "lucide-react";

interface PrintButtonProps {
    label: string;
    className?: string;
}

export default function PrintButton({ label, className }: PrintButtonProps) {
    return (
        <button
            onClick={() => window.print()}
            className={className}
        >
            <Printer size={20} />
            <span>{label}</span>
        </button>
    );
}
