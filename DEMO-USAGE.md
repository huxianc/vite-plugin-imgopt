# 🚀 vite-plugin-imgopt 完整演示

## 项目结构

```
vite-plugin-image-compress/
├── src/                          # 插件源码
│   ├── index.ts                 # 主插件入口
│   ├── compressor.ts            # 图片压缩核心逻辑
│   ├── types.ts                 # TypeScript 类型定义
│   └── utils.ts                 # 工具函数
├── dist/                        # 构建输出
├── example/                     # 完整示例项目 ⭐
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/         # 测试图片 (会被压缩)
│   │   │   └── icons/          # 图标文件 (会被排除)
│   │   └── main.js             # 应用入口
│   ├── index.html              # 示例页面
│   ├── vite.config.js          # Vite 配置 + 插件使用
│   ├── package.json            # 示例项目依赖
│   ├── setup-demo.js           # 快速设置脚本
│   └── README.md               # 详细使用说明
├── package.json                 # 主项目配置
├── tsconfig.json               # TypeScript 配置
├── README.md                   # 插件文档
└── .gitignore                  # Git 忽略文件
```

## 🎯 快速体验

### 1. 测试示例项目
```bash
# 进入示例目录
cd example

# 设置演示文件
npm run setup

# 安装依赖
npm install

# 开发模式运行
npm run dev

# 构建并查看压缩效果
npm run build
```

### 2. 查看压缩效果
构建时会输出类似信息：
```
📸 Compressed landscape.jpg: 2.1MB → 890KB (57% reduction)
📸 Compressed portrait.png: 1.8MB → 1.2MB (33% reduction)
📸 Compressed modern.webp: 800KB → 650KB (19% reduction)
📸 Compressed future.avif: 600KB → 480KB (20% reduction)
🎉 Image compression complete: 4 images processed
```

### 3. 在你的项目中使用

#### 安装
```bash
npm install vite-plugin-imgopt --save-dev
```

#### 配置
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import imgOpt from 'vite-plugin-imgopt';

export default defineConfig({
  plugins: [
    imgOpt({
      // 基础配置
      include: ['**/*.{jpg,jpeg,png,webp,avif}'],
      exclude: ['**/node_modules/**', '**/icons/**'],
      verbose: true,
      
      // 压缩设置
      formats: {
        jpeg: { quality: 85, progressive: true },
        png: { quality: 80, compressionLevel: 8 },
        webp: { quality: 80, effort: 6 },
        avif: { quality: 50, effort: 6 },
      },
    }),
  ],
});
```

## 🔧 高级配置示例

### 场景1: 电商网站
```javascript
imgOpt({
  include: ['**/products/**/*.{jpg,jpeg,png,webp}'],
  exclude: ['**/thumbnails/**'],
  formats: {
    jpeg: { quality: 80, progressive: true },
    png: { quality: 75, compressionLevel: 9 },
    webp: { quality: 75, effort: 6 },
  },
  verbose: true,
})
```

### 场景2: 博客网站
```javascript
imgOpt({
  include: ['**/posts/**/*.{jpg,jpeg,png}'],
  formats: {
    jpeg: { quality: 85, progressive: true },
    png: { quality: 80, compressionLevel: 6 },
  },
  outputDir: 'optimized',
  verbose: true,
})
```

### 场景3: 移动端应用
```javascript
imgOpt({
  formats: {
    jpeg: { quality: 70, progressive: false },
    png: { quality: 70, compressionLevel: 9 },
    webp: { quality: 70, effort: 6 },
    avif: { quality: 45, effort: 6 },
  },
  verbose: true,
})
```

## 📊 压缩效果对比

| 格式 | 原始大小 | 压缩后 | 压缩率 | 质量 |
|------|----------|---------|---------|-------|
| JPEG | 2.1MB | 890KB | 57% | 85% |
| PNG  | 1.8MB | 1.2MB | 33% | 80% |
| WebP | 800KB | 650KB | 19% | 80% |
| AVIF | 600KB | 480KB | 20% | 50% |

## 🐛 常见问题

**Q: 为什么某些图片没有被压缩？**
A: 检查 `include/exclude` 规则，确保图片路径匹配且格式支持。

**Q: 压缩效果不明显怎么办？**
A: 降低质量参数，或使用更大的原始图片测试。

**Q: 支持哪些图片格式？**
A: 支持 JPEG、PNG、WebP、AVIF 格式。

**Q: 会影响开发模式吗？**
A: 不会，插件只在构建时运行 (`apply: 'build'`)。

## 🎉 完成

现在你已经有了一个完整可用的 Vite 图片压缩插件，包含：
- ✅ 完整的源码实现
- ✅ TypeScript 支持
- ✅ 详细的使用文档  
- ✅ 真实项目示例
- ✅ 多种配置场景
- ✅ 快速设置脚本

享受更快的网站加载速度吧！🚀