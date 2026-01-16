/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_RSS_FEEDS: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
} 