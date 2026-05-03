/**
 * Vercel 构建时生成 config.js
 * 从环境变量 DEEEPSEEK_API_KEY 读取 Key
 * 本地开发时若环境变量不存在，保留原有 config.js 不动
 */
const fs = require('fs');
const path = require('path');

const apiKey = process.env.DEEPSEEK_API_KEY;
const configPath = path.join(__dirname, 'config.js');

if (!apiKey) {
  console.log('[build] DEEEPSEEK_API_KEY 未设置，跳过 config.js 生成');
  process.exit(0);
}

const content = `/**
 * 景心如意 · 手卡系统 · 配置文件
 * 此文件由构建时自动生成，请勿手动修改
 */
window.JXRY_CONFIG = {
  DEEPSEEK_API_KEY: '${apiKey}',
  DEEPSEEK_API_URL: 'https://api.deepseek.com/chat/completions',
  DEEPSEEK_MODEL:   'deepseek-chat'
};
`;

fs.writeFileSync(configPath, content, 'utf8');
console.log('[build] config.js 已生成（Key 已注入）');
