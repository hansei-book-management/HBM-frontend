/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASEURL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
