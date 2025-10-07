// TMS - Task Management System JavaScript
// Modern, interactive functionality with animations

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupAnimations();
    setupFormHandlers();
    setupModalHandlers();
    setupNavigationEffects();
    setupFloatingElements();
    setupColorOptions();
    setupPasswordToggle();
    setupDemoCredentials();
    setupMobileNavigation();
}

// Setup scroll animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-up');
            }
        });
    }, observerOptions);

    // Observe all elements that should animate on scroll
    document.querySelectorAll('.feature-card, .stat-card, .tech-card').forEach(el => {
        observer.observe(el);
    });
}

// Setup form handlers
function setupFormHandlers() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Add workspace form
    const addWorkspaceForm = document.getElementById('addWorkspaceForm');
    if (addWorkspaceForm) {
        addWorkspaceForm.addEventListener('submit', handleAddWorkspace);
    }

    // Add task form
    const addTaskForm = document.getElementById('addTaskForm');
    if (addTaskForm) {
        addTaskForm.addEventListener('submit', handleAddTask);
    }

    // Edit profile form
    const editProfileForm = document.getElementById('editProfileForm');
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', handleEditProfile);
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContact);
    }
}

// Setup modal handlers
function setupModalHandlers() {
    // Add workspace modal
    const addWorkspaceModal = document.getElementById('addWorkspaceModal');
    if (addWorkspaceModal) {
        addWorkspaceModal.addEventListener('hidden.bs.modal', () => {
            const form = document.getElementById('addWorkspaceForm');
            if (form) form.reset();
        });
        
        // Handle mobile modal positioning
        addWorkspaceModal.addEventListener('show.bs.modal', () => {
            handleMobileModalShow(addWorkspaceModal);
        });
        
        addWorkspaceModal.addEventListener('hidden.bs.modal', () => {
            handleMobileModalHide();
        });
    }
    
    // Setup all modals for mobile handling
    const allModals = document.querySelectorAll('.modal');
    allModals.forEach(modal => {
        modal.addEventListener('show.bs.modal', () => {
            handleMobileModalShow(modal);
        });
        
        modal.addEventListener('hidden.bs.modal', () => {
            handleMobileModalHide();
        });
    });

    // Add task modal
    const addTaskModal = document.getElementById('addTaskModal');
    if (addTaskModal) {
        addTaskModal.addEventListener('hidden.bs.modal', () => {
            document.getElementById('addTaskForm').reset();
        });
    }
}

// Setup navigation effects
function setupNavigationEffects() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(31, 41, 55, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'linear-gradient(135deg, var(--dark-color) 0%, var(--gray-800) 100%)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });
    }

    // Active navigation highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        // Remove active class from all nav links
        link.classList.remove('active');
        // Add active class to current page
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Setup floating elements for 404 page
function setupFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        element.style.animation = `float 6s ease-in-out infinite`;
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Setup color options for workspace creation
function setupColorOptions() {
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Setup password toggle
function setupPasswordToggle() {
    const toggleButtons = document.querySelectorAll('#togglePassword, #toggleConfirmPassword');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.parentElement.querySelector('input[type="password"], input[type="text"]');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('bi-eye');
                icon.classList.add('bi-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('bi-eye-slash');
                icon.classList.add('bi-eye');
            }
        });
    });
}

// Setup demo credentials
function setupDemoCredentials() {
    window.fillDemo = function(type) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        if (type === 'admin') {
            emailInput.value = 'admin@tms.com';
            passwordInput.value = 'admin123';
        } else if (type === 'user') {
            emailInput.value = 'user@tms.com';
            passwordInput.value = 'user123';
        }
        
        // Add visual feedback
        [emailInput, passwordInput].forEach(input => {
            input.style.borderColor = '#10b981';
            setTimeout(() => {
                input.style.borderColor = '';
            }, 2000);
        });
    };
}

// Form handlers
function handleLogin(e) {
    e.preventDefault();
    const submitButton = e.target.querySelector('button[type="submit"]');
    const loginText = submitButton.querySelector('.login-text');
    const loading = submitButton.querySelector('.loading');
    
    // Show loading state
    loginText.classList.add('d-none');
    loading.classList.remove('d-none');
    
    // Simulate API call
    setTimeout(() => {
        showToast('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }, 2000);
}

function handleRegister(e) {
    e.preventDefault();
    
    // Validate passwords match
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match!', 'error');
        return;
    }
    
    if (password.length < 8) {
        showToast('Password must be at least 8 characters long!', 'error');
        return;
    }
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const registerText = submitButton.querySelector('.register-text');
    const loading = submitButton.querySelector('.loading');
    
    // Show loading state
    registerText.classList.add('d-none');
    loading.classList.remove('d-none');
    
    // Simulate API call
    setTimeout(() => {
        showToast('Account created successfully! Redirecting to login...', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    }, 2000);
}

function handleAddWorkspace(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const workspaceName = formData.get('workspaceName') || document.getElementById('workspaceName').value;
    
    if (!workspaceName) {
        showToast('Please enter a workspace name', 'error');
        return;
    }
    
    showToast(`Workspace "${workspaceName}" created successfully!`, 'success');
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addWorkspaceModal'));
    modal.hide();
    
    // Add new workspace card (simulation)
    setTimeout(() => {
        addWorkspaceCard(workspaceName);
    }, 500);
}

function handleAddTask(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const taskTitle = formData.get('taskTitle') || document.getElementById('taskTitle').value;
    
    if (!taskTitle) {
        showToast('Please enter a task title', 'error');
        return;
    }
    
    showToast(`Task "${taskTitle}" created successfully!`, 'success');
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
    modal.hide();
}

function handleEditProfile(e) {
    e.preventDefault();
    showToast('Profile updated successfully!', 'success');
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
    modal.hide();
}

// Workspace management functions
function openWorkspace(workspaceId) {
    showToast('Opening workspace...', 'info');
    setTimeout(() => {
        window.location.href = 'workspace.html';
    }, 500);
}

function editWorkspace(workspaceId) {
    const modal = new bootstrap.Modal(document.getElementById('editWorkspaceModal'));
    modal.show();
}

function deleteWorkspace(workspaceId) {
    if (confirm('Are you sure you want to delete this workspace? This action cannot be undone.')) {
        showToast('Workspace deleted successfully!', 'success');
        // Remove workspace card (simulation)
        setTimeout(() => {
            const workspaceCard = document.querySelector(`[onclick="openWorkspace('${workspaceId}')"]`);
            if (workspaceCard) {
                workspaceCard.style.animation = 'fadeOut 0.3s ease-out forwards';
                setTimeout(() => {
                    workspaceCard.remove();
                }, 300);
            }
        }, 500);
    }
}

function createWorkspace() {
    const name = document.getElementById('workspaceName').value;
    const description = document.getElementById('workspaceDescription').value;
    
    if (!name) {
        showToast('Please enter a workspace name', 'error');
        return;
    }
    
    handleAddWorkspace({ preventDefault: () => {}, target: document.getElementById('addWorkspaceForm') });
}

function updateWorkspace() {
    const name = document.getElementById('editWorkspaceName').value;
    if (!name) {
        showToast('Please enter a workspace name', 'error');
        return;
    }
    
    showToast('Workspace updated successfully!', 'success');
    const modal = bootstrap.Modal.getInstance(document.getElementById('editWorkspaceModal'));
    modal.hide();
}

// Task management functions
function openTaskModal(taskId) {
    const modal = new bootstrap.Modal(document.getElementById('editTaskModal'));
    
    // Fill form with task data (simulation)
    const taskData = getTaskData(taskId);
    if (taskData) {
        document.getElementById('editTaskTitle').value = taskData.title;
        document.getElementById('editTaskDescription').value = taskData.description;
        document.getElementById('editTaskPriority').value = taskData.priority;
        document.getElementById('editTaskStatus').value = taskData.status;
        document.getElementById('editTaskDueDate').value = taskData.dueDate;
        document.getElementById('editTaskAssignee').value = taskData.assignee;
    }
    
    modal.show();
}

function createTask() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const priority = document.getElementById('taskPriority').value;
    const status = document.getElementById('taskStatus').value;
    const dueDate = document.getElementById('taskDueDate').value;
    const assignee = document.getElementById('taskAssignee').value;
    
    if (!title) {
        showToast('Please enter a task title', 'error');
        return;
    }
    
    handleAddTask({ preventDefault: () => {}, target: document.getElementById('addTaskForm') });
}

function updateTask() {
    const title = document.getElementById('editTaskTitle').value;
    if (!title) {
        showToast('Please enter a task title', 'error');
        return;
    }
    
    showToast('Task updated successfully!', 'success');
    const modal = bootstrap.Modal.getInstance(document.getElementById('editTaskModal'));
    modal.hide();
}

function deleteTask() {
    if (confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
        showToast('Task deleted successfully!', 'success');
        const modal = bootstrap.Modal.getInstance(document.getElementById('editTaskModal'));
        modal.hide();
    }
}

function updateProfile() {
    const firstName = document.getElementById('editFirstName').value;
    const lastName = document.getElementById('editLastName').value;
    
    if (!firstName || !lastName) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    handleEditProfile({ preventDefault: () => {}, target: document.getElementById('editProfileForm') });
}

function handleContact(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (!firstName || !lastName || !email || !subject || !message) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
    
    // Reset form
    e.target.reset();
}

// Utility functions
function addWorkspaceCard(name) {
    const workspaceGrid = document.getElementById('workspaceGrid');
    const addCard = workspaceGrid.querySelector('.add-workspace-card');
    
    const newCard = document.createElement('div');
    newCard.className = 'workspace-card-dash animate-fade-up';
    newCard.innerHTML = `
        <div class="workspace-header">
            <div>
                <div class="workspace-title">${name}</div>
                <div class="workspace-description">New workspace</div>
            </div>
            <div class="workspace-actions">
                <button class="btn-icon btn-edit" onclick="editWorkspace('${name.toLowerCase().replace(/\s+/g, '-')}')">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn-icon btn-delete" onclick="deleteWorkspace('${name.toLowerCase().replace(/\s+/g, '-')}')">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
        <div class="workspace-stats">
            <div class="stat-item">
                <div class="stat-number">0</div>
                <div class="stat-label">Tasks</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">0</div>
                <div class="stat-label">Pending</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">0</div>
                <div class="stat-label">Progress</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">0</div>
                <div class="stat-label">Done</div>
            </div>
        </div>
        <div class="progress-bar-custom">
            <div class="progress-fill" style="width: 0%"></div>
        </div>
    `;
    
    workspaceGrid.insertBefore(newCard, addCard);
}

function getTaskData(taskId) {
    // Simulated task data
    const tasks = {
        'task1': {
            title: 'Setup React Project',
            description: 'Initialize new React project with Vite and configure basic setup',
            priority: 'high',
            status: 'pending',
            dueDate: '2024-12-15',
            assignee: 'john'
        },
        'task2': {
            title: 'Design UI Components',
            description: 'Create reusable UI components for the application',
            priority: 'medium',
            status: 'pending',
            dueDate: '2024-12-18',
            assignee: 'jane'
        }
        // Add more task data as needed
    };
    
    return tasks[taskId] || null;
}

// Toast notification system
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast-container .toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast show`;
    toast.innerHTML = `
        <div class="toast-header">
            <i class="bi bi-${getToastIcon(type)} me-2 text-${getToastColor(type)}"></i>
            <strong class="me-auto">${getToastTitle(type)}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000);
}

function getToastIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getToastColor(type) {
    const colors = {
        'success': 'success',
        'error': 'danger',
        'warning': 'warning',
        'info': 'info'
    };
    return colors[type] || 'info';
}

function getToastTitle(type) {
    const titles = {
        'success': 'Success',
        'error': 'Error',
        'warning': 'Warning',
        'info': 'Info'
    };
    return titles[type] || 'Info';
}

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.8); }
    }
    
    .floating-elements {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    }
    
    .floating-element {
        position: absolute;
        font-size: 2rem;
        color: rgba(99, 102, 241, 0.1);
        animation: float 6s ease-in-out infinite;
    }
    
    .color-option {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        border: 3px solid transparent;
        transition: all 0.3s ease;
    }
    
    .color-option.active {
        border-color: var(--gray-800);
        transform: scale(1.1);
    }
    
    .activity-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--gray-100);
    }
    
    .activity-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }
    
    .activity-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        color: white;
        font-size: 1.2rem;
    }
    
    .activity-content h6 {
        margin-bottom: 5px;
        color: var(--gray-800);
    }
    
    .skill-item {
        margin-bottom: 15px;
    }
    
    .preference-item {
        margin-bottom: 15px;
    }
    
    .social-links a {
        font-size: 1.5rem;
        transition: all 0.3s ease;
    }
    
    .social-links a:hover {
        color: var(--primary-color) !important;
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);

// Mobile Navigation Setup
function setupMobileNavigation() {
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    if (!mobileNavToggle || !sidebar || !sidebarOverlay) {
        return; // Exit if elements don't exist (pages without sidebar)
    }
    
    // Toggle sidebar
    function toggleSidebar() {
        const isOpen = sidebar.classList.contains('show');
        
        if (isOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }
    
    function openSidebar() {
        sidebar.classList.add('show');
        sidebarOverlay.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        mobileNavToggle.innerHTML = '<i class="bi bi-x"></i>'; // Change icon to X
        mobileNavToggle.setAttribute('aria-expanded', 'true');
    }
    
    function closeSidebar() {
        sidebar.classList.remove('show');
        sidebarOverlay.classList.remove('show');
        document.body.style.overflow = ''; // Restore background scroll
        mobileNavToggle.innerHTML = '<i class="bi bi-list"></i>'; // Change icon back to hamburger
        mobileNavToggle.setAttribute('aria-expanded', 'false');
    }
    
    // Event listeners
    mobileNavToggle.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);
    
    // Close sidebar when clicking on navigation links
    const navLinks = sidebar.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Small delay to allow navigation to start
            setTimeout(closeSidebar, 100);
        });
    });
    
    // Handle dropdown toggle - don't close sidebar when opening dropdown
    const dropdownToggles = sidebar.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            // Don't close sidebar when opening dropdown
            e.stopPropagation();
        });
    });
    
    // Handle dropdown links separately
    const dropdownLinks = sidebar.querySelectorAll('.dropdown-item');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Check if it's a modal trigger or actual navigation
            const href = link.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('#')) {
                // It's a navigation link, close sidebar after a delay
                setTimeout(closeSidebar, 100);
            }
            // If it's a modal trigger (href="#"), don't close sidebar
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 767.98) {
            // Desktop view - ensure sidebar is visible
            sidebar.classList.remove('show');
            sidebarOverlay.classList.remove('show');
            document.body.style.overflow = '';
            mobileNavToggle.innerHTML = '<i class="bi bi-list"></i>';
            mobileNavToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('show')) {
            closeSidebar();
        }
    });
}

// Mobile Modal Handling Functions
function handleMobileModalShow(modal) {
    // Close sidebar if open when modal opens
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    
    if (sidebar && sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
        if (sidebarOverlay) sidebarOverlay.classList.remove('show');
        if (mobileNavToggle) {
            mobileNavToggle.innerHTML = '<i class="bi bi-list"></i>';
            mobileNavToggle.setAttribute('aria-expanded', 'false');
        }
    }
    
    // Prevent body scroll on mobile
    if (window.innerWidth <= 767.98) {
        document.body.style.overflow = 'hidden';
    }
    
    // Ensure modal is properly positioned
    setTimeout(() => {
        const modalDialog = modal.querySelector('.modal-dialog');
        if (modalDialog) {
            modalDialog.style.transform = 'none';
        }
    }, 10);
}

function handleMobileModalHide() {
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Reset any modal transforms
    const modals = document.querySelectorAll('.modal-dialog');
    modals.forEach(dialog => {
        dialog.style.transform = '';
    });
}
