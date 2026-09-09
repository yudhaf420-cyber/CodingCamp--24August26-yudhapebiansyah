/* ========================================
   To-Do List Life Dashboard - Main Script
   ======================================== */

// ========================================
// 1. REAL-TIME CLOCK & GREETING
// ========================================

function updateTimeAndDate() {
    const now = new Date();
    
    // Update time display (HH:MM:SS)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('time-display').textContent = `${hours}:${minutes}:${seconds}`;
    
    // Update date display
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date-display').textContent = now.toLocaleDateString('en-US', options);
    
    // Update greeting based on time with emoji
    const hour = now.getHours();
    let greeting = '';
    let emoji = '';
    
    if (hour >= 5 && hour < 12) {
        greeting = 'Good Morning';
        emoji = '🌅';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Good Afternoon';
        emoji = '☀️';
    } else {
        greeting = hour >= 18 && hour < 21 ? 'Good Evening' : 'Good Night';
        emoji = '🌙';
    }
    
    // Get user name from localStorage or use default
    const userName = localStorage.getItem('userName') || 'Yudha';
    
    // Update greeting text and emoji separately
    document.getElementById('greeting-text').textContent = `${greeting}, ${userName}`;
    document.getElementById('greeting-emoji').textContent = emoji;
}

// Update clock every second
setInterval(updateTimeAndDate, 1000);
updateTimeAndDate(); // Initial call


// ========================================
// 1B. DARK/LIGHT MODE TOGGLE
// ========================================

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    document.documentElement.classList.remove('dark');
} else {
    document.documentElement.classList.add('dark');
}

// Update theme icon based on current theme
function updateThemeIcon() {
    const isDark = document.documentElement.classList.contains('dark');
    const themeIcon = document.getElementById('theme-icon');
    themeIcon.textContent = isDark ? '🌙' : '☀️';
}

// Toggle theme function
function toggleTheme() {
    const htmlElement = document.documentElement;
    const isDark = htmlElement.classList.contains('dark');
    
    if (isDark) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
    
    updateThemeIcon();
}

// Event listener for theme toggle button
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// Initialize theme icon
updateThemeIcon();


// ========================================
// 2. FOCUS TIMER (POMODORO STYLE)
// ========================================

let timerInterval = null;
let remainingSeconds = 30 * 60; // Default 30 minutes
let isTimerRunning = false;

// Load timer state from localStorage
function loadTimerState() {
    const savedTime = localStorage.getItem('timerRemainingSeconds');
    if (savedTime) {
        remainingSeconds = parseInt(savedTime, 10);
    }
    updateTimerDisplay();
}

// Save timer state to localStorage
function saveTimerState() {
    localStorage.setItem('timerRemainingSeconds', remainingSeconds);
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    document.getElementById('timer-display').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Start timer
function startTimer() {
    if (isTimerRunning) return;
    
    isTimerRunning = true;
    timerInterval = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds--;
            updateTimerDisplay();
            saveTimerState();
        } else {
            stopTimer();
            alert('⏰ Timer finished! Time to take a break!');
        }
    }, 1000);
}

// Stop timer
function stopTimer() {
    isTimerRunning = false;
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    saveTimerState();
}

// Reset timer
function resetTimer() {
    stopTimer();
    remainingSeconds = 30 * 60; // Reset to 30 minutes
    updateTimerDisplay();
    saveTimerState();
}

// Event listeners for timer buttons
document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('stop-btn').addEventListener('click', stopTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);

// Load timer state on page load
loadTimerState();


// ========================================
// 3. TO-DO LIST
// ========================================

let todos = [];

// Load todos from localStorage
function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    }
    renderTodos();
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Render todos to the DOM
function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    
    if (todos.length === 0) {
        todoList.innerHTML = '<li class="text-center py-8 text-slate-400 dark:text-slate-400 italic">No tasks yet. Add one above!</li>';
        return;
    }
    
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `flex items-center justify-between gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl border border-purple-100 dark:border-slate-700/50 hover:border-purple-300 dark:hover:border-purple-500/50 transition-all ${todo.completed ? 'opacity-50' : ''}`;
        
        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'w-5 h-5 accent-pink-500 cursor-pointer flex-shrink-0';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodo(index));
        
        // Text
        const span = document.createElement('span');
        span.className = `flex-1 text-slate-800 dark:text-white font-medium ${todo.completed ? 'line-through text-slate-400 dark:text-slate-400' : ''}`;
        span.textContent = todo.text;
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTodo(index));
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

// Add new todo
function addTodo(text) {
    if (text.trim() === '') return;
    
    todos.push({
        text: text.trim(),
        completed: false,
        id: Date.now()
    });
    
    saveTodos();
    renderTodos();
}

// Toggle todo completion
function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

// Delete todo
function deleteTodo(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }
}

// Event listener for todo form
document.getElementById('todo-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('todo-input');
    addTodo(input.value);
    input.value = '';
});

// Load todos on page load
loadTodos();


// ========================================
// 4. QUICK LINKS
// ========================================

let links = [];

// Load links from localStorage
function loadLinks() {
    const savedLinks = localStorage.getItem('quickLinks');
    if (savedLinks) {
        links = JSON.parse(savedLinks);
    }
    renderLinks();
}

// Save links to localStorage
function saveLinks() {
    localStorage.setItem('quickLinks', JSON.stringify(links));
}

// Render links to the DOM
function renderLinks() {
    const linksContainer = document.getElementById('links-container');
    linksContainer.innerHTML = '';
    
    if (links.length === 0) {
        linksContainer.innerHTML = '<div class="text-center py-8 text-slate-400 dark:text-slate-400 italic w-full">No quick links yet. Add one above!</div>';
        return;
    }
    
    links.forEach((link, index) => {
        const linkItem = document.createElement('div');
        linkItem.className = 'flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-purple-100 dark:border-slate-700/50 hover:border-cyan-400 dark:hover:border-cyan-500/50 transition-all group';
        
        // Favicon (ikon website dari URL)
        const favicon = document.createElement('img');
        favicon.src = `https://www.google.com/s2/favicons?domain=${link.url}&sz=32`;
        favicon.alt = `${link.name} icon`;
        favicon.className = 'w-6 h-6 rounded flex-shrink-0';
        favicon.onerror = function() {
            // Jika favicon gagal load, gunakan emoji default
            this.style.display = 'none';
            const fallbackIcon = document.createElement('span');
            fallbackIcon.textContent = '🔗';
            fallbackIcon.className = 'text-xl';
            this.parentNode.insertBefore(fallbackIcon, this);
        };
        
        // Link button
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 font-semibold transition-colors flex-1';
        a.textContent = link.name;
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xs font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex-shrink-0';
        deleteBtn.textContent = 'Delete';
        deleteBtn.setAttribute('aria-label', 'Delete link');
        deleteBtn.addEventListener('click', () => deleteLink(index));
        
        // Add elements in order: favicon → link → delete button
        linkItem.appendChild(favicon);
        linkItem.appendChild(a);
        linkItem.appendChild(deleteBtn);
        linksContainer.appendChild(linkItem);
    });
}

// Add new link
function addLink(name, url) {
    if (name.trim() === '' || url.trim() === '') return;
    
    // Basic URL validation
    let validUrl = url.trim();
    if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://')) {
        validUrl = 'https://' + validUrl;
    }
    
    links.push({
        name: name.trim(),
        url: validUrl,
        id: Date.now()
    });
    
    saveLinks();
    renderLinks();
}

// Delete link
function deleteLink(index) {
    if (confirm('Are you sure you want to delete this link?')) {
        links.splice(index, 1);
        saveLinks();
        renderLinks();
    }
}

// Event listener for link form
document.getElementById('link-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('link-name');
    const urlInput = document.getElementById('link-url');
    addLink(nameInput.value, urlInput.value);
    nameInput.value = '';
    urlInput.value = '';
});

// Load links on page load
loadLinks();


// ========================================
// 5. KEYBOARD SHORTCUTS (BONUS)
// ========================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter in todo input to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.id === 'todo-input') {
            document.getElementById('todo-form').dispatchEvent(new Event('submit'));
        }
    }
});


// ========================================
// 6. INITIALIZATION MESSAGE
// ========================================

console.log('✨ To-Do List Life Dashboard initialized successfully!');
console.log('💾 All data is stored locally in your browser.');
