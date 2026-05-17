# ToDoList

一款简洁的 Windows 桌面待办应用。无边框窗口设计，淡黄色便签风格主题，数据本地存储。

![Electron](https://img.shields.io/badge/Electron-33-47848F) ![React](https://img.shields.io/badge/React-18-61DAFB) ![SQLite](https://img.shields.io/badge/SQLite(sql.js)-003B57) ![License](https://img.shields.io/badge/License-MIT-yellow)

## 功能特性

- **添加待办** — 输入文字，点击"添加"或按 Enter 键快速添加
- **完成待办** — 点击待办文字切换完成状态，已完成项自动划掉
- **删除待办** — 点击 ✕ 按钮删除，带确认弹窗防止误删
- **日期查询** — 右上角"查询历史"入口，选择日期查看当日所有待办
- **本地存储** — SQLite 数据库，数据保存在用户目录，重启不丢失
- **无边框窗口** — 自定义标题栏，支持最小化、最大化、关闭

## 快速开始

### 环境要求

- Node.js 18+
- Windows 10/11

### 安装与运行

```bash
git clone https://github.com/heke0516/TodoList.git
cd TodoList
npm install
npm run electron:dev
```

### 打包为安装包

```bash
npm run electron:build
```

打包完成后，安装包位于 `release/ToDoList Setup 1.0.0.exe`。

> **国内镜像加速：** 如果下载 Electron 或 NSIS 二进制文件超时：
> ```bash
> set ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
> set ELECTRON_BUILDER_BINARIES_MIRROR=https://npmmirror.com/mirrors/electron-builder-binaries/
> npm run electron:build
> ```

## 项目结构

```
ToDoList/
├── electron/                 # Electron 主进程
│   ├── main.js               # 窗口管理、IPC 处理
│   ├── database.js           # SQLite 数据库操作
│   ├── preload.js            # IPC 安全桥接
│   └── icon.ico              # 应用图标
├── src/                      # React 前端
│   ├── main.jsx              # 入口文件
│   ├── App.jsx               # 主组件（视图切换、自定义标题栏）
│   ├── App.css               # 布局样式
│   ├── components/
│   │   ├── TodoInput.jsx     # 输入框 + 添加按钮
│   │   ├── TodoItem.jsx      # 单条待办（划掉/删除）
│   │   ├── TodoList.jsx      # 待办列表 + 空状态
│   │   ├── DateQuery.jsx     # 日期查询视图
│   │   └── ConfirmDialog.jsx # 删除确认弹窗
│   └── styles/
│       └── theme.css         # 淡黄色主题变量
├── index.html                # HTML 入口
├── package.json
├── vite.config.js
└── electron-builder.yml      # 打包配置
```

## 技术栈

| 技术 | 用途 |
|------|------|
| Electron 33 | 桌面应用框架，窗口管理，IPC 通信 |
| React 18 | UI 组件化开发 |
| sql.js | 纯 JS 的 SQLite 实现，无需编译原生模块 |
| Vite 6 | 前端构建工具，HMR 热更新 |
| electron-builder | 打包为 Windows .exe 安装包 |

## 更新日志

### 2026-05-17

**v1.0.0 发布** — 完成全部核心功能开发与打包优化。

| 提交 | 说明 |
|------|------|
| `fb383d3` | 优化打包体积：过滤多余 locale 文件，启用 asar 压缩 |
| `e3bd543` | 清理开发产物，更新 README 和 .gitignore |
| `64f5625` | 修复安装包图标格式（png → ico），清理多余依赖 |
| `23b87f0` | 实现无边框窗口、自定义标题栏、应用命名与图标 |
| `5af8ddc` | 添加项目说明文档 |
| `d02a15b` | 更新 package-lock.json（含 Electron 二进制） |
| `f450306` | 添加 electron-builder 打包配置 |
| `8d29950` | 实现日期查询组件：日期选择器、查询结果、统计摘要 |
| `fbe0081` | 实现待办列表组件：空状态提示 |
| `ff7a3ea` | 实现待办项组件：点击划掉、删除按钮 |
| `857a19a` | 实现删除确认弹窗组件 |
| `ee46270` | 实现待办输入组件：输入框 + 添加按钮 |
| `9becf7a` | 实现主组件：今日/查询视图切换 |
| `dc542f0` | 实现 Electron 主进程：窗口管理、IPC 通信 |
| `9ab6acd` | 实现 SQLite 数据库模块（sql.js） |
| `163ec94` | 添加淡黄色主题 CSS 变量 |
| `bf7a226` | 替换 better-sqlite3 为 sql.js（免编译原生模块） |
| `c7bf167` | 初始化项目：Electron + React + Vite 脚手架 |

## 许可

MIT
