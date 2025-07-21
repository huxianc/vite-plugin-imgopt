export interface ImageFormatOptions {
  jpeg?: {
    quality?: number;
    progressive?: boolean;
  };
  jpg?: {
    quality?: number;
    progressive?: boolean;
  };
  png?: {
    quality?: number;
    compressionLevel?: number;
    progressive?: boolean;
  };
  webp?: {
    quality?: number;
    effort?: number;
  };
  avif?: {
    quality?: number;
    effort?: number;
  };
}

export interface ImageCompressOptions {
  include?: string | string[];
  exclude?: string | string[];
  formats?: ImageFormatOptions;
  outputDir?: string;
  verbose?: boolean;
}

export interface CompressResult {
  originalPath: string;
  outputPath: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
}