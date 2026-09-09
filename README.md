# To-Do List Life Dashboard

A beautiful, modern productivity dashboard built with **Tailwind CSS**, **HTML**, and **Vanilla JavaScript**. Features a 2-column responsive layout with glassmorphism effects and smooth animations. All data is stored locally in your browser using the Local Storage API.

## ✨ Features

### 1. **Real-Time Clock & Greeting**
- Live clock that updates every second with animated glow effect
- Dynamic greeting based on time of day (Morning, Afternoon, Evening, Night)
- Current date display
- Gradient text effects

### 2. **Focus Timer (Pomodoro Style)**
- 30-minute default timer with Start, Stop, and Reset controls
- Large, easy-to-read display with gradient animation
- Timer state persists across page refreshes
- Notification alert when timer completes
- Beautiful gradient buttons with hover effects

### 3. **To-Do List**
- Add, complete, and delete tasks
- Visual checkbox indicators
- Completed tasks shown with line-through styling
- Data persists in browser Local Storage
- Scrollable task list with custom scrollbar
- Clean glassmorphism card design

### 4. **Quick Links Manager**
- Save your frequently visited websites
- One-click access to bookmarked links (opens in new tab)
- Add and remove links easily with confirmation
- Automatic HTTPS protocol handling
- Responsive flex layout

## 🎨 Design Features

### **Modern UI/UX**
- ✅ **Tailwind CSS** - Utility-first CSS framework
- ✅ **2-Column Responsive Layout** (Focus Timer | Tasks side-by-side)
- ✅ **Glassmorphism Effects** - Frosted glass backdrop blur
- ✅ **Gradient Backgrounds** - Purple, pink, and cyan color scheme
- ✅ **Smooth Animations** - Hover effects, transitions, and glow animations
- ✅ **Custom Scrollbar** - Gradient styled scrollbar
- ✅ **Google Fonts** - Inter (body) & Poppins (headings)

### **Color Palette**
- Primary: Purple (`#8b5cf6`)
- Secondary: Cyan (`#06b6d4`)  
- Accent: Pink (`#ec4899`)
- Background: Dark gradient (slate-900 → purple-900)

## 🚀 Getting Started

### Requirements
- A modern web browser (Chrome, Firefox, Edge, or Safari)
- No server or installation required
- Internet connection for Tailwind CDN (first load)

### How to Use
1. Open `index.html` in your web browser
2. Start adding tasks and links
3. Use the focus timer to stay productive
4. All your data is automatically saved locally

## 🛠️ Technical Details

### Technology Stack
- **HTML5** - Semantic markup structure
- **Tailwind CSS** - Modern utility-first CSS framework (via CDN)
- **Custom CSS** - Additional animations and effects
- **Vanilla JavaScript** - No frameworks or libraries
- **Local Storage API** - Client-side data persistence
- **Google Fonts** - Inter & Poppins font families

### File Structure
```
├── index.html          # Main HTML file (with Tailwind CSS)
├── css/
│   └── styles.css      # Custom CSS for animations
├── js/
│   └── script.js       # All functionality & Tailwind classes
└── README.md           # Documentation
```

### Browser Compatibility
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Edge (latest)
- ✅ Safari (latest)

## 📦 Data Storage

All data is stored in your browser's Local Storage:
- **Timer state**: Remaining seconds
- **To-Do items**: Task text and completion status
- **Quick links**: Name and URL pairs
- **User name**: For personalized greeting (default: "Yudha")

Your data stays on your device and is never sent to any server.

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + Enter` in task input: Submit task quickly

## 🎨 Layout Overview

### Desktop (Large Screens)
```
┌─────────────────────────────────────────────┐
│           Header (Clock & Greeting)         │
└─────────────────────────────────────────────┘
┌──────────────────────┬──────────────────────┐
│   Focus Timer        │   To-Do List         │
│   (Column 1)         │   (Column 2)         │
└──────────────────────┴──────────────────────┘
┌─────────────────────────────────────────────┐
│        Quick Links (Full Width)             │
└─────────────────────────────────────────────┘
```

### Mobile (Small Screens)
- Stacks into single column
- Fully responsive design
- Touch-friendly buttons

## 🎯 Features Overview

### Responsive Design
- 2-column grid on desktop (lg screens)
- Single column on mobile/tablet
- Smooth hover animations
- Touch-friendly interface

### Accessibility
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Reduced motion support for sensitive users
- High contrast gradient text
- Focus indicators on all interactive elements

### Performance
- Lightweight with Tailwind CDN
- Fast load times
- Efficient DOM updates
- Optimized animations
- Smooth 60fps transitions

## 🔒 Privacy

This application:
- Stores data only in your browser
- Does not send any data to external servers
- Does not track or collect user information
- Works completely offline after initial Tailwind CDN load

## 📝 Customization

### Change Default Timer Duration
Edit `js/script.js` line 49:
```javascript
let remainingSeconds = 30 * 60; // Change 30 to your preferred minutes
```

### Change User Name
Your name is stored in localStorage. To change it, open browser console and run:
```javascript
localStorage.setItem('userName', 'Your Name');
```

### Customize Colors
Tailwind config in `index.html` head section:
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#8b5cf6',    // Change colors here
                secondary: '#06b6d4',
                accent: '#ec4899',
            }
        }
    }
}
```

## 👨‍💻 Author

Built for CodingCamp Mini Project

## 📄 License

This project is open source and available for educational purposes.

---

**Enjoy your modern productivity dashboard! 🎉✨**
