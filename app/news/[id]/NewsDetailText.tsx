"use client";
import { useLanguage } from "@/components/LanguageProvider";
export default function NewsDetailText({ tr, en }: { tr: string; en: string }) { const { language } = useLanguage(); return <>{language === "tr" ? tr : en}</>; }
