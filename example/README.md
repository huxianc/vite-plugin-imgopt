# Vite Plugin ImgOpt 示例项目

这是一个完整的示例项目，展示了如何在实际的 Vite 项目中使用 `vite-plugin-imgopt` 进行图片压缩。

## 🚀 快速开始

### 1. 安装依赖
```bash
cd example
npm install
```

### 2. 添加示例图片
在开始之前，你需要在以下目录添加一些测试图片：

```
src/assets/images/
├── landscape.jpg      # JPEG 格式风景图片
├── portrait.png       # PNG 格式人物图片  
├── modern.webp        # WebP 格式图片
└── future.avif        # AVIF 格式图片

src/assets/icons/
└── app-icon.png       # 应用图标 (将被排除)
```

**获取测试图片的方法：**
- 从网上下载一些示例图片并重命名
- 使用在线图片格式转换工具转换格式
- 从你的图片库中复制一些照片

### 3. 开发模式运行
```bash
npm run dev
```
这将启动开发服务器，你可以在浏览器中查看示例页面。

### 4. 构建项目
```bash
npm run build
```

构建时，插件会自动压缩图片并显示压缩统计信息：
```
📸 Compressed landscape.jpg: 2.1MB → 890KB (57% reduction)
📸 Compressed portrait.png: 1.8MB → 1.2MB (33% reduction)  
📸 Compressed modern.webp: 800KB → 650KB (19% reduction)
📸 Compressed future.avif: 600KB → 480KB (20% reduction)
🎉 Image compression complete: 4 images processed, 5.3MB → 3.22MB (39% total reduction)
```

### 5. 预览构建结果
```bash
npm run preview
```

## 📋 功能特性

### ✅ 支持的功能
- [x] 多种图片格式支持 (JPEG, PNG, WebP, AVIF)
- [x] 自定义压缩参数配置
- [x] 路径包含/排除规则
- [x] 详细的压缩统计信息
- [x] 与 Vite 构建流程无缝集成

### 🎛️ 压缩配置
项目使用了以下压缩设置：

**JPEG/JPG:**
- 质量: 85%
- 渐进式: 启用

**PNG:**
- 质量: 80%  
- 压缩级别: 8
- 渐进式: 禁用

**WebP:**
- 质量: 80%
- 压缩努力: 6

**AVIF:**
- 质量: 50%
- 压缩努力: 6

**排除规则:**
- `**/node_modules/**` - 排除依赖包
- `**/icons/**` - 排除图标目录

## 📊 测试结果

构建完成后，你可以：

1. **查看压缩日志** - 在终端中查看详细的压缩统计
2. **对比文件大小** - 比较 `src/assets` 和 `dist/assets` 中的文件大小
3. **验证排除功能** - 检查 icons 目录的文件是否被跳过
4. **测试图片质量** - 在浏览器中查看压缩后的图片效果

## 🔧 自定义配置

你可以修改 `vite.config.js` 中的插件配置来测试不同的压缩设置：

```javascript
imgOpt({
  // 修改质量设置
  formats: {
    jpeg: { quality: 90, progressive: false },
    png: { quality: 85, compressionLevel: 6 },
    webp: { quality: 85, effort: 4 },
    avif: { quality: 60, effort: 4 },
  },
  
  // 修改路径规则
  include: ['**/*.{jpg,png}'],  // 只处理 JPG 和 PNG
  exclude: ['**/large-images/**'],  // 排除大图片目录
  
  // 启用输出到单独目录
  outputDir: 'compressed',
})
```

## 🐛 故障排除

**图片未被压缩？**
- 检查图片路径是否匹配 `include` 规则
- 确认图片没有被 `exclude` 规则排除
- 检查图片格式是否支持

**构建失败？**
- 确保已安装所有依赖：`npm install`
- 检查是否缺少示例图片文件
- 查看终端错误信息

**压缩效果不明显？**
- 尝试调整质量参数
- 对于已经高度压缩的图片，效果可能有限
- 使用更大的原始图片测试