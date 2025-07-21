import { minimatch } from 'minimatch';
import path from 'path';

export function shouldIncludeFile(filePath: string, include?: string | string[], exclude?: string | string[]): boolean {
  const normalizedPath = path.normalize(filePath);
  
  // 检查排除规则
  if (exclude) {
    const excludePatterns = Array.isArray(exclude) ? exclude : [exclude];
    for (const pattern of excludePatterns) {
      if (minimatch(normalizedPath, pattern)) {
        return false;
      }
    }
  }
  
  // 检查包含规则
  if (include) {
    const includePatterns = Array.isArray(include) ? include : [include];
    for (const pattern of includePatterns) {
      if (minimatch(normalizedPath, pattern)) {
        return true;
      }
    }
    return false; // 如果定义了include但不匹配，则不包含
  }
  
  return true; // 默认包含所有文件
}

export function isImageFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.bmp', '.tiff'];
  return imageExtensions.includes(ext);
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}