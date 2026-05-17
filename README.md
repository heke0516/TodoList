# 我的待办 - Daily Todo App

一款简洁的 Windows 桌面待办应用，基于 Electron + React 构建，采用淡黄色主题设计。

## 功能

- 添加每日待办事项
- 点击待办文字切换完成状态（划掉/取消划掉）
- 删除待办（带确认弹窗）
- 按日期查询历史待办记录
- 本地 SQLite 存储，数据保存在用户目录

## 技术栈

- Electron 33
- React 18
- sql.js (SQLite)
- Vite 6
- electron-builder

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run electron:dev

# 构建前端
npm run build

# 打包为 Windows 安装包
npm run electron:build
```

## 项目结构

```
├── electron/           # Electron 主进程
│   ├── main.js         # 窗口管理、IPC 处理
│   ├── database.js     # SQLite 数据库操作
│   └── preload.js      # IPC 安全桥接
├── src/                # React 前端
│   ├── App.jsx         # 主组件（视图切换）
│   ├── components/     # UI 组件
│   └── styles/         # 主题样式
└── electron-builder.yml
```
