import { defineConfig } from 'vite';
import { resolve } from 'path';
import imgOpt from 'vite-plugin-imgopt';

export default defineConfig({
  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
  },
  
  // 构建配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 启用资源内联阈值，小于此大小的资源会被内联
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  
  plugins: [
    imgOpt({
      // 包含的路径模式 - 只处理这些格式的图片
      include: ['**/*.{jpg,jpeg,png,webp,avif,gif}'],
      
      // 排除的路径模式 - icons 目录下的文件不会被压缩
      exclude: ['**/node_modules/**', '**/icons/**'],
      
      // 不同格式的压缩设置
      formats: {
        // JPEG 压缩设置
        jpeg: {
          quality: 85,        // 压缩质量 85%
          progressive: true,   // 启用渐进式 JPEG
        },
        jpg: {
          quality: 85,
          progressive: true,
        },
        
        // PNG 压缩设置
        png: {
          quality: 80,           // 压缩质量 80%
          compressionLevel: 8,   // 压缩级别 8 (0-9，9最高)
          progressive: false,    // PNG 不建议使用渐进式
        },
        
        // WebP 压缩设置
        webp: {
          quality: 80,    // 压缩质量 80%
          effort: 6,      // 压缩努力程度 6 (0-6，6最高)
        },
        
        // AVIF 压缩设置 (下一代图片格式)
        avif: {
          quality: 50,    // 压缩质量 50% (AVIF 在较低质量下仍有很好效果)
          effort: 6,      // 压缩努力程度 6 (0-9，9最高)
        },
      },
      
      // 输出目录（可选）
      // 如果不指定，将覆盖原文件
      // outputDir: 'compressed',
      
      // 显示详细的压缩日志
      verbose: true,
    }),
  ],
  
  // 静态资源处理
  assetsInclude: ['**/*.avif'],
});