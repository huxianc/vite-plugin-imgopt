import type { Plugin } from 'vite';
import path from 'path';
import { ImageCompressOptions, CompressResult, ImageFormatOptions } from './types';
import { shouldIncludeFile, isImageFile, formatBytes } from './utils';

const DEFAULT_OPTIONS: Required<Omit<ImageCompressOptions, 'include' | 'exclude'>> = {
  formats: {
    jpeg: { quality: 80, progressive: false },
    jpg: { quality: 80, progressive: false },
    png: { quality: 80, compressionLevel: 6, progressive: false },
    webp: { quality: 80, effort: 4 },
    avif: { quality: 50, effort: 4 },
  },
  outputDir: '',
  verbose: false,
};

async function loadSharp() {
  try {
    const sharp = await import('sharp');
    return sharp.default;
  } catch (error) {
    console.warn('⚠️  Sharp not available. Image compression will be skipped.');
    console.warn('   To enable image compression, install sharp: npm install sharp');
    return null;
  }
}

export function imgOpt(options: ImageCompressOptions = {}): Plugin {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  return {
    name: 'vite-plugin-imgopt',
    apply: 'build',

    configResolved() {
      if (opts.verbose) {
        console.log('🖼️ Vite Plugin ImgOpt initialized');
        console.log('📋 Configuration:', {
          include: opts.include || 'all images',
          exclude: opts.exclude || 'none',
          formats: Object.keys(opts.formats || {})
        });
      }
    },

    async generateBundle(_outputOptions, bundle) {
      const results: CompressResult[] = [];
      const sharp = await loadSharp();
      
      if (!sharp) {
        if (opts.verbose) {
          console.log('⏭️  Image compression skipped (sharp not available)');
        }
        return;
      }

      if (opts.verbose) {
        console.log('\n🔍 Scanning for images in bundle...');
        const imageAssets = Object.entries(bundle).filter(([fileName, chunk]) =>
          chunk.type === 'asset' && isImageFile(fileName)
        );
        console.log(`📊 Found ${imageAssets.length} image assets`);
      }

      // 处理bundle中的图片资源
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'asset' && isImageFile(fileName)) {
          if (opts.verbose) {
            console.log(`\n🔎 Processing: ${fileName}`);
          }

          // 检查是否应该包含此文件
          if (!shouldIncludeFile(fileName, opts.include, opts.exclude)) {
            if (opts.verbose) {
              console.log(`⏭️  Skipped ${fileName} (excluded by rules)`);
            }
            continue;
          }

          try {
            // 直接从 chunk.source 创建 Buffer，避免临时文件
            const originalBuffer = Buffer.isBuffer(chunk.source)
              ? chunk.source
              : Buffer.from(chunk.source);

            const originalSize = originalBuffer.length;

            // 获取文件扩展名
            const ext = path.extname(fileName).toLowerCase().replace('.', '');
            const formatOptions = opts.formats[ext as keyof ImageFormatOptions];

            if (!formatOptions) {
              if (opts.verbose) {
                console.log(`⏭️  Skipped ${fileName} (format ${ext} not configured)`);
              }
              continue;
            }

            if (opts.verbose) {
              console.log(`🔧 Compressing with format: ${ext.toString().toUpperCase()}`);
            }

            // 使用 Sharp 压缩图片
            let sharpInstance = sharp(originalBuffer);

            switch (ext) {
              case 'jpeg':
              case 'jpg':
                const jpegOptions = formatOptions as ImageFormatOptions['jpeg'];
                sharpInstance = sharpInstance.jpeg({
                  quality: jpegOptions?.quality || 80,
                  progressive: jpegOptions?.progressive || false,
                });
                break;
              case 'png':
                const pngOptions = formatOptions as ImageFormatOptions['png'];
                sharpInstance = sharpInstance.png({
                  quality: pngOptions?.quality || 80,
                  compressionLevel: pngOptions?.compressionLevel || 6,
                  progressive: pngOptions?.progressive || false,
                });
                break;
              case 'webp':
                const webpOptions = formatOptions as ImageFormatOptions['webp'];
                sharpInstance = sharpInstance.webp({
                  quality: webpOptions?.quality || 80,
                  effort: webpOptions?.effort || 4,
                });
                break;
              case 'avif':
                const avifOptions = formatOptions as ImageFormatOptions['avif'];
                sharpInstance = sharpInstance.avif({
                  quality: avifOptions?.quality || 50,
                  effort: avifOptions?.effort || 4,
                });
                break;
            }

            const compressedBuffer = await sharpInstance.toBuffer();
            const compressedSize = compressedBuffer.length;
            const compressionRatio = Math.round(((originalSize - compressedSize) / originalSize) * 100);

            // 仅使用更小的那个：如果压缩后变大，则保持原图
            if (compressedSize < originalSize) {
              chunk.source = compressedBuffer;
            } else {
              chunk.source = originalBuffer;
            }

            const result: CompressResult = {
              originalPath: fileName,
              outputPath: fileName,
              originalSize,
              compressedSize,
              compressionRatio,
            };

            results.push(result);

            if (opts.verbose) {
              console.log(
                `✅ ${fileName}: ${formatBytes(originalSize)} → ${formatBytes(compressedSize)} (${compressionRatio}% reduction)`
              );
            }
          } catch (error) {
            console.warn(`❌ Failed to compress ${fileName}:`, error instanceof Error ? error.message : error);
          }
        }
      }

      if (opts.verbose) {
        if (results.length > 0) {
          const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
          const totalCompressed = results.reduce((sum, r) => sum + r.compressedSize, 0);
          const overallRatio = Math.round(((totalOriginal - totalCompressed) / totalOriginal) * 100);

          console.log(`\n🎉 Image compression complete!`);
          console.log(`📊 Total: ${results.length} images processed`);
          console.log(`💾 Size: ${formatBytes(totalOriginal)} → ${formatBytes(totalCompressed)} (${overallRatio}% reduction)`);
        } else {
          console.log('\n📭 No images were processed');
        }
      }
    },
  };
}

export default imgOpt;
export * from './types';