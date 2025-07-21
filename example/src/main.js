// 导入图片资源
// import iconPng from './assets/icons/app-icon.png';
import WheatEars from './assets/images/wheat-ears.jpg'
import Dog from './assets/images/dog.png'
import WebP from './assets/images/T2xYGvYZ.webp'
import Fox from './assets/images/fox.avif';

// 图片数据
const images = [
  {
    src: WheatEars,
    title: 'JPEG格式',
    format: 'JPEG',
    description: '高质量风景照片，使用 JPEG 格式压缩'
  },

  {
    src: Dog,
    title: '人物肖像',
    format: 'PNG',
    description: '带透明背景的人物图片，PNG 格式压缩'
  },
  {
    src: WebP,
    title: 'WebP格式',
    format: 'WebP',
    description: '现代 WebP 格式，更好的压缩比'
  },
  {
    src: Fox,
    title: '未来格式',
    format: 'AVIF',
    description: '下一代 AVIF 格式，最佳压缩效率'
  },
  // {
  //   src: iconPng,
  //   title: '应用图标',
  //   format: 'PNG Icon',
  //   description: '应用图标，位于 icons 目录（可能被排除）'
  // }
];

// 渲染图片画廊
function renderGallery() {
  const gallery = document.getElementById('gallery');

  images.forEach(image => {
    const card = document.createElement('div');
    card.className = 'image-card';

    card.innerHTML = `
      <img src="${image.src}" alt="${image.title}" />
      <div class="image-info">
        <div class="image-title">${image.title}</div>
        <div class="image-format">${image.format}</div>
        <p style="margin: 10px 0 0 0; font-size: 0.9em; color: #666;">
          ${image.description}
        </p>
      </div>
    `;

    gallery.appendChild(card);
  });

  // 更新统计信息
  document.getElementById('total-images').textContent = images.length;
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
  renderGallery();

  // 输出构建信息到控制台
  console.log('🔧 Vite Plugin ImgOpt Example');
  console.log('📦 Build configuration:');
  console.log('- JPEG quality: 85%, progressive: true');
  console.log('- PNG quality: 80%, compression level: 8');
  console.log('- WebP quality: 80%, effort: 6');
  console.log('- AVIF quality: 50%, effort: 6');
  console.log('- Icons directory excluded from compression');
});

// 添加图片加载错误处理
document.addEventListener('error', (e) => {
  if (e.target.tagName === 'IMG') {
    console.warn('Image failed to load:', e.target.src);
    e.target.style.background = '#f0f0f0';
    e.target.alt = '图片加载失败';
  }
}, true);