# ToDoList

一款简洁的 Windows 桌面待办应用。无边框窗口设计，淡黄色便签风格主题，数据本地存储。

![Electron](https://img.shields.io/badge/Electron-33-47848F) ![React](https://img.shields.io/badge/React-18-61DAFB) ![SQLite](https://img.shields.io/badge/SQLite(sql.js)-003B57)

## 功能特性

- **添加待办** — 输入文字，点击"添加"或按 Enter 键快速添加
- **完成待办** — 点击待办文字切换完成状态，已完成项自动划掉
- **删除待办** — 点击 ✕ 按钮删除，带确认弹窗防止误删
- **日期查询** — 右上角"查询历史"入口，选择日期查看当日所有待办
- **本地存储** — 使用 SQLite 数据库，数据保存在用户目录，重启不丢失
- **无边框窗口** — 自定义标题栏，支持最小化、最大化、关闭

## 快速开始

### 环境要求

- Node.js 18+
- Windows 10/11

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/heke0516/TodoList.git
cd TodoList

# 安装依赖
npm install

# 启动开发模式（Vite + Electron 同时启动）
npm run electron:dev
```

### 打包为安装包

```bash
# 构建 Windows 安装包
npm run electron:build
```

打包完成后，安装包位于 `release/ToDoList Setup 1.0.0.exe`。

> **注意：** 如果下载 Electron 或 NSIS 二进制文件超时，可设置国内镜像：
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

## 许可

MIT
