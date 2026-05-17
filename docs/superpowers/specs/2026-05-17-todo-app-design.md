# Daily Todo App — Design Spec

## Overview

A lightweight Windows desktop application for recording daily todos. Built with Electron + React, using SQLite for local data storage. The UI follows a minimalist design with a warm light-yellow color theme.

## Core Features

1. **Add todo** — type text and click "添加" or press Enter to create a todo for today
2. **Complete todo** — click the todo text to toggle strikethrough (done/undone)
3. **Delete todo** — click the ✕ button on the right side of each todo; requires confirmation dialog
4. **Date query** — click "📅 查询历史" in the top-right corner to switch to a date picker view; select a date and click "查询" to see that day's todos; click "← 返回今天" to go back

## UI Design

### Main View (Today's Todos)

```
┌─────────────────────────────────────┐
│ 📋 我的待办              📅 查询历史 │
│                                     │
│ ┌─────────────────────┐ ┌────┐      │
│ │ 添加今天的待办...     │ │添加│      │
│ └─────────────────────┘ └────┘      │
│                                     │
│ ┌───────────────────────────────┐   │
│ │ ☐ 买菜                       ✕│   │
│ ├───────────────────────────────┤   │
│ │ ✓ 完成报告 (strikethrough)   ✕│   │
│ ├───────────────────────────────┤   │
│ │ ☐ 健身30分钟                 ✕│   │
│ └───────────────────────────────┘   │
└─────────────────────────────────────┘
```

- Default view shows today's todos
- Uncompleted items shown first, completed items below
- Completed items have strikethrough text and slightly dimmed background
- Each item has a ✕ delete button on the right (appears on hover or always visible)
- Clicking todo text toggles completion state

### Date Query View

```
┌─────────────────────────────────────┐
│ 📅 查询历史待办          ← 返回今天  │
│                                     │
│ 选择日期：[____-__-__] [查询]        │
│                                     │
│ ┌───────────────────────────────┐   │
│ │ ✓ 完成报告 (strikethrough)   ✕│   │
│ ├───────────────────────────────┤   │
│ │ ☐ 团队会议                   ✕│   │
│ └───────────────────────────────┘   │
│                                     │
│        共 2 项，已完成 1 项           │
└─────────────────────────────────────┘
```

- Date picker input + "查询" button
- Results displayed in same format as main view
- Summary line at bottom showing total and completed count

### Color Theme

| Element | Color |
|---------|-------|
| Page background | `#FFF9E6` (warm light yellow) |
| Card/input background | `#FFFDE7` |
| Primary accent (buttons) | `#FFD54F` |
| Border | `#E0C97F` |
| Hover/secondary bg | `#FFF3C4` |
| Completed item bg | `#F8F2DC` |
| Primary text | `#5D4E37` |
| Secondary text | `#B8860B` |
| Completed text | `#AAAAAA` |
| Delete button | `#CCCCCC` |

## Data Model

SQLite database stored in the app's user data directory.

### Table: `todos`

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PRIMARY KEY AUTOINCREMENT | Unique identifier |
| content | TEXT NOT NULL | Todo text |
| is_done | INTEGER DEFAULT 0 | 0 = uncompleted, 1 = completed |
| date | TEXT NOT NULL | Date string, format `YYYY-MM-DD` |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP | Creation time |
| updated_at | DATETIME DEFAULT CURRENT_TIMESTAMP | Last update time |

### Queries

- Get today's todos: `SELECT * FROM todos WHERE date = ? ORDER BY is_done ASC, created_at ASC`
- Get todos by date: `SELECT * FROM todos WHERE date = ? ORDER BY is_done ASC, created_at ASC`
- Insert todo: `INSERT INTO todos (content, date) VALUES (?, ?)`
- Toggle done: `UPDATE todos SET is_done = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
- Delete todo: `DELETE FROM todos WHERE id = ?`

## Technical Architecture

### Project Structure

```
ToDoList/
├── electron/                 # Electron main process
│   ├── main.js               # App entry, window management
│   └── database.js           # SQLite CRUD operations
├── src/                      # React frontend
│   ├── main.jsx              # React entry point
│   ├── App.jsx               # Root component, view switching
│   ├── components/
│   │   ├── TodoInput.jsx     # Input field + add button
│   │   ├── TodoItem.jsx      # Single todo item (click to toggle, ✕ to delete)
│   │   ├── TodoList.jsx      # Todo list container
│   │   ├── DateQuery.jsx     # Date picker + query results
│   │   └── ConfirmDialog.jsx # Delete confirmation modal
│   └── styles/
│       └── theme.css         # CSS custom properties for color theme
├── package.json
└── electron-builder.yml      # Packaging config for .exe
```

### IPC Communication

React frontend communicates with the main process via Electron IPC:

| Channel | Direction | Payload | Response |
|---------|-----------|---------|----------|
| `get-todos` | renderer → main | `{ date: "YYYY-MM-DD" }` | `Todo[]` |
| `add-todo` | renderer → main | `{ content: string, date: "YYYY-MM-DD" }` | `Todo` |
| `toggle-todo` | renderer → main | `{ id: number, is_done: 0\|1 }` | `void` |
| `delete-todo` | renderer → main | `{ id: number }` | `void` |

### Tech Stack

- **Electron** — desktop shell, IPC, window management
- **React 18** — UI framework
- **better-sqlite3** — synchronous SQLite driver for Electron main process
- **Vite** — frontend build tool
- **electron-builder** — package as .exe installer

### Window Config

- Default size: 480 x 600 px
- Resizable, with min size 360 x 480
- Frameless custom title bar (optional) or standard frame with app icon
- Background color: `#FFF9E6`

## Interaction Details

- **Add todo**: click "添加" button or press Enter in the input field. Empty input is ignored.
- **Toggle done**: click anywhere on the todo text. Toggles `is_done` between 0 and 1.
- **Delete todo**: click the ✕ icon. A confirmation dialog appears ("确定删除这条待办？"). Confirm → delete; cancel → no-op.
- **Date query**: clicking "📅 查询历史" replaces the main list with the date query view. Selecting a date and clicking "查询" loads that date's todos. "← 返回今天" switches back to the main view showing today's data.
- **Empty state**: when no todos exist, show a centered hint: "还没有待办事项，添加一条吧！"

## Out of Scope

- Categories/tags
- Priority levels
- Due dates / time-based reminders
- Cloud sync
- Multi-device support
- Export/import
