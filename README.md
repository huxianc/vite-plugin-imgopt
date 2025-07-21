# vite-plugin-imgopt

一个功能强大的 Vite 插件，用于在构建时压缩图片，支持多种图片格式和自定义压缩设置。

## 特性

- 🚀 支持多种图片格式：JPEG、PNG、WebP、AVIF
- 🎛️ 灵活的压缩配置，针对不同格式设置不同参数
- 📁 路径过滤功能，支持包含和排除规则
- 📊 详细的压缩统计信息
- ⚡ 与 Vite 构建流程无缝集成

## 安装

```bash
npm install vite-plugin-imgopt --save-dev
```

或

```bash
yarn add vite-plugin-imgopt --dev
```

## 使用方法

在你的 `vite.config.js` 中配置插件：

```javascript
import { defineConfig } from 'vite';
import imgOpt from 'vite-plugin-imgopt';

export default defineConfig({
  plugins: [
    imgOpt({
      // 包含的路径模式
      include: ['**/*.{jpg,jpeg,png,webp,avif}'],

      // 排除的路径模式
      exclude: ['**/node_modules/**', '**/icons/**'],

      // 不同格式的压缩设置
      formats: {
        jpeg: {
          quality: 85,
          progressive: true,
        },
        jpg: {
          quality: 85,
          progressive: true,
        },
        png: {
          quality: 80,
          compressionLevel: 8,
          progressive: false,
        },
        webp: {
          quality: 80,
          effort: 6,
        },
        avif: {
          quality: 50,
          effort: 6,
        },
      },

      // 显示压缩日志
      verbose: true,
    }),
  ],
});
```

## 配置选项

### `include`
- 类型: `string | string[]`
- 默认值: `undefined`
- 描述: 包含的文件路径模式，支持 glob 语法

### `exclude`
- 类型: `string | string[]`
- 默认值: `undefined`
- 描述: 排除的文件路径模式，支持 glob 语法

### `formats`
- 类型: `ImageFormatOptions`
- 描述: 不同图片格式的压缩配置

#### JPEG/JPG 选项
- `quality`: 压缩质量 (0-100)，默认 80
- `progressive`: 是否使用渐进式 JPEG，默认 false

#### PNG 选项
- `quality`: 压缩质量 (0-100)，默认 80
- `compressionLevel`: 压缩级别 (0-9)，默认 6
- `progressive`: 是否使用渐进式 PNG，默认 false

#### WebP 选项
- `quality`: 压缩质量 (0-100)，默认 80
- `effort`: 压缩努力程度 (0-6)，默认 4

#### AVIF 选项
- `quality`: 压缩质量 (0-100)，默认 50
- `effort`: 压缩努力程度 (0-9)，默认 4

### `outputDir`
- 类型: `string`
- 默认值: `''`
- 描述: 输出目录，如果不指定则覆盖原文件

### `verbose`
- 类型: `boolean`
- 默认值: `false`
- 描述: 是否显示详细的压缩日志

## 示例

### 基础使用

```javascript
import imgOpt from 'vite-plugin-imgopt';

export default {
  plugins: [
    imgOpt({
      verbose: true,
    }),
  ],
};
```

### 高级配置

```javascript
import imgOpt from 'vite-plugin-imgopt';

export default {
  plugins: [
    imgOpt({
      include: ['src/assets/**/*.{jpg,png}'],
      exclude: ['**/backup/**'],
      formats: {
        jpeg: { quality: 90, progressive: true },
        png: { quality: 85, compressionLevel: 9 },
        webp: { quality: 85, effort: 6 },
      },
      verbose: true,
    }),
  ],
};
```

## 依赖

本插件基于以下优秀的开源项目：

- [Sharp](https:// .pixelplumbing.com/) - 高性能图片处理库
- [minimatch](https://github.com/isaacs/minimatch) - 文件路径匹配

## 许可证

MIT