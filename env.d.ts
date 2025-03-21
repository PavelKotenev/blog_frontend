interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_DEBUG: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}