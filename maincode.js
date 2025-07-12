<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Directory</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 30px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .header h1 {
            text-align: center;
            color: #2c3e50;
            font-size: 2.5rem;
            margin-bottom: 10px;
        }

        .controls {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px;
        }

        .search-bar {
            flex: 1;
            min-width: 250px;
            padding: 12px 20px;
            border: 2px solid #e1e8ed;
            border-radius: 25px;
            font-size: 16px;
            outline: none;
            transition: all 0.3s ease;
        }

        .search-bar:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .btn-primary {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
            background: #6c757d;
            color: white;
        }

        .btn-secondary:hover {
            background: #5a6268;
            transform: translateY(-2px);
        }

        .btn-danger {
            background: #dc3545;
            color: white;
        }

        .btn-danger:hover {
            background: #c82333;
            transform: translateY(-2px);
        }

        .sort-controls {
            display: flex;
            gap: 10px;
            align-items: center;
        }

        .sort-select {
            padding: 8px 15px;
            border: 2px solid #e1e8ed;
            border-radius: 20px;
            background: white;
            font-size: 14px;
            outline: none;
            cursor: pointer;
        }

        .filter-panel {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 25px;
            border-radius: 15px;
            margin-bottom: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            display: none;
        }

        .filter-panel.active {
            display: block;
            animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .filter-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }

        .filter-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .filter-group label {
            font-weight: 600;
            color: #2c3e50;
            font-size: 14px;
        }

        .filter-group input,
        .filter-group select {
            padding: 10px;
            border: 2px solid #e1e8ed;
            border-radius: 8px;
            font-size: 14px;
            outline: none;
            transition: border-color 0.3s ease;
        }

        .filter-group input:focus,
        .filter-group select:focus {
            border-color: #667eea;
        }

        .employee-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .employee-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .employee-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }

        .employee-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(45deg, #667eea, #764ba2);
        }

        .employee-card h3 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 1.3rem;
        }

        .employee-info {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-bottom: 20px;
        }

        .employee-info span {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: #5a6c7d;
        }

        .employee-info strong {
            color: #2c3e50;
            min-width: 80px;
        }

        .employee-actions {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
        }

        .employee-actions .btn {
            padding: 8px 16px;
            font-size: 12px;
        }

        .form-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        }

        .form-modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .form-container {
            background: white;
            padding: 30px;
            border-radius: 15px;
            width: 90%;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .form-container h2 {
            color: #2c3e50;
            margin-bottom: 25px;
            text-align: center;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #2c3e50;
        }

        .form-group input,
        .form-group select {
            width: 100%;
            padding: 12px;
            border: 2px solid #e1e8ed;
            border-radius: 8px;
            font-size: 16px;
            outline: none;
            transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus {
            border-color: #667eea;
        }

        .form-group.error input,
        .form-group.error select {
            border-color: #dc3545;
        }

        .error-message {
            color: #dc3545;
            font-size: 14px;
            margin-top: 5px;
            display: none;
        }

        .form-group.error .error-message {
            display: block;
        }

        .form-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 30px;
        }

        .pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .pagination-info {
            color: #5a6c7d;
            font-size: 14px;
        }

        .pagination-controls {
            display: flex;
            gap: 10px;
            align-items: center;
        }

        .page-btn {
            padding: 8px 12px;
            border: 2px solid #e1e8ed;
            background: white;
            color: #5a6c7d;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 14px;
        }

        .page-btn:hover,
        .page-btn.active {
            background: #667eea;
            color: white;
            border-color: #667eea;
        }

        .page-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .items-per-page {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .items-per-page select {
            padding: 8px 12px;
            border: 2px solid #e1e8ed;
            border-radius: 8px;
            background: white;
            font-size: 14px;
            outline: none;
            cursor: pointer;
        }

        .loading {
            text-align: center;
            padding: 40px;
            color: #5a6c7d;
            font-size: 18px;
        }

        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #5a6c7d;
        }

        .empty-state h3 {
            margin-bottom: 10px;
            font-size: 1.5rem;
        }

        @media (max-width: 768px) {
            .controls {
                flex-direction: column;
                align-items: stretch;
            }

            .search-bar {
                min-width: 100%;
            }

            .sort-controls {
                justify-content: center;
            }

            .employee-grid {
                grid-template-columns: 1fr;
            }

            .filter-grid {
                grid-template-columns: 1fr;
            }

            .form-container {
                width: 95%;
                margin: 20px;
            }

            .pagination-controls {
                flex-wrap: wrap;
                justify-content: center;
            }

            .header h1 {
                font-size: 2rem;
            }
        }

        @media (max-width: 480px) {
            .container {
                padding: 10px;
            }

            .header {
                padding: 15px;
            }

            .employee-card {
                padding: 20px;
            }

            .form-container {
                padding: 20px;
            }

            .btn {
                padding: 10px 20px;
                font-size: 13px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Employee Directory</h1>
            <div class="controls">
                <input type="text" class="search-bar" id="searchInput" placeholder="Search employees by name or email...">
                <div class="sort-controls">
                    <label for="sortBy">Sort by:</label>
                    <select id="sortBy" class="sort-select">
                        <option value="firstName">First Name</option>
                        <option value="lastName">Last Name</option>
                        <option value="department">Department</option>
                        <option value="role">Role</option>
                    </select>
                </div>
                <button class="btn btn-primary" id="addEmployeeBtn">Add Employee</button>
                <button class="btn btn-secondary" id="filterToggleBtn">Filter</button>
            </div>
        </div>

        <div class="filter-panel" id="filterPanel">
            <div class="filter-grid">
                <div class="filter-group">
                    <label for="filterFirstName">First Name</label>
                    <input type="text" id="filterFirstName" placeholder="Enter first name">
                </div>
                <div class="filter-group">
                    <label for="filterDepartment">Department</label>
                    <select id="filterDepartment">
                        <option value="">All Departments</option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="Finance">Finance</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="filterRole">Role</label>
                    <select id="filterRole">
                        <option value="">All Roles</option>
                        <option value="Manager">Manager</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Analyst">Analyst</option>
                        <option value="Coordinator">Coordinator</option>
                    </select>
                </div>
            </div>
            <div class="form-actions">
                <button class="btn btn-primary" id="applyFiltersBtn">Apply Filters</button>
                <button class="btn btn-secondary" id="clearFiltersBtn">Clear Filters</button>
            </div>
        </div>

        <div id="employeeGrid" class="employee-grid">
            <!-- Employee cards will be rendered here -->
        </div>

        <div class="pagination" id="pagination">
            <div class="pagination-info" id="paginationInfo"></div>
            <div class="pagination-controls">
                <button class="page-btn" id="prevPageBtn">Previous</button>
                <div id="pageNumbers"></div>
                <button class="page-btn" id="nextPageBtn">Next</button>
            </div>
            <div class="items-per-page">
                <label for="itemsPerPage">Items per page:</label>
                <select id="itemsPerPage">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        </div>
    </div>

    <!-- Add/Edit Employee Modal -->
    <div class="form-modal" id="formModal">
        <div class="form-container">
            <h2 id="formTitle">Add Employee</h2>
            <form id="employeeForm">
                <div class="form-group">
                    <label for="firstName">First Name *</label>
                    <input type="text" id="firstName" name="firstName" required>
                    <div class="error-message">First name is required</div>
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" required>
                    <div class="error-message">Last name is required</div>
                </div>
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" required>
                    <div class="error-message">Valid email is required</div>
                </div>
                <div class="form-group">
                    <label for="department">Department *</label>
                    <select id="department" name="department" required>
                        <option value="">Select Department</option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="Finance">Finance</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                    </select>
                    <div class="error-message">Department is required</div>
                </div>
                <div class="form-group">
                    <label for="role">Role *</label>
                    <select id="role" name="role" required>
                        <option value="">Select Role</option>
                        <option value="Manager">Manager</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Analyst">Analyst</option>
                        <option value="Coordinator">Coordinator</option>
                    </select>
                    <div class="error-message">Role is required</div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Save Employee</button>
                    <button type="button" class="btn btn-secondary" id="cancelBtn">Cancel</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        // Mock employee data (simulating Freemarker data injection)
        let mockEmployees = [
            { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@company.com', department: 'HR', role: 'Manager' },
            { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@company.com', department: 'IT', role: 'Developer' },
            { id: 3, firstName: 'Michael', lastName: 'Johnson', email: 'michael.johnson@company.com', department: 'Finance', role: 'Analyst' },
            { id: 4, firstName: 'Emily', lastName: 'Brown', email: 'emily.brown@company.com', department: 'Marketing', role: 'Designer' },
            { id: 5, firstName: 'David', lastName: 'Wilson', email: 'david.wilson@company.com', department: 'Sales', role: 'Manager' },
            { id: 6, firstName: 'Sarah', lastName: 'Davis', email: 'sarah.davis@company.com', department: 'IT', role: 'Developer' },
            { id: 7, firstName: 'Chris', lastName: 'Miller', email: 'chris.miller@company.com', department: 'HR', role: 'Coordinator' },
            { id: 8, firstName: 'Lisa', lastName: 'Garcia', email: 'lisa.garcia@company.com', department: 'Finance', role: 'Manager' },
            { id: 9, firstName: 'Robert', lastName: 'Martinez', email: 'robert.martinez@company.com', department: 'Marketing', role: 'Analyst' },
            { id: 10, firstName: 'Amanda', lastName: 'Anderson', email: 'amanda.anderson@company.com', department: 'Sales', role: 'Coordinator' },
            { id: 11, firstName: 'Kevin', lastName: 'Taylor', email: 'kevin.taylor@company.com', department: 'IT', role: 'Developer' },
            { id: 12, firstName: 'Michelle', lastName: 'Thomas', email: 'michelle.thomas@company.com', department: 'HR', role: 'Manager' }
        ];

        // Application state
        let currentPage = 1;
        let itemsPerPage = 10;
        let filteredEmployees = [...mockEmployees];
        let currentSort = 'firstName';
        let editingEmployeeId = null;

        // DOM elements
        const employeeGrid = document.getElementById('employeeGrid');
        const searchInput = document.getElementById('searchInput');
        const sortBy = document.getElementById('sortBy');
        const filterPanel = document.getElementById('filterPanel');
        const filterToggleBtn = document.getElementById('filterToggleBtn');
        const formModal = document.getElementById('formModal');
        const employeeForm = document.getElementById('employeeForm');
        const addEmployeeBtn = document.getElementById('addEmployeeBtn');
        const pagination = document.getElementById('pagination');
        const itemsPerPageSelect = document.getElementById('itemsPerPage');

        // Initialize application
        document.addEventListener('DOMContentLoaded', function() {
            renderEmployees();
            setupEventListeners();
        });

        // Event listeners
        function setupEventListeners() {
            // Search functionality
            searchInput.addEventListener('input', debounce(handleSearch, 300));
            
            // Sort functionality
            sortBy.addEventListener('change', handleSort);
            
            // Filter functionality
            filterToggleBtn.addEventListener('click', toggleFilterPanel);
            document.getElementById('applyFiltersBtn').addEventListener('click', applyFilters);
            document.getElementById('clearFiltersBtn').addEventListener('click', clearFilters);
            
            // Form functionality
            addEmployeeBtn.addEventListener('click', () => openForm());
            document.getElementById('cancelBtn').addEventListener('click', closeForm);
            employeeForm.addEventListener('submit', handleFormSubmit);
            
            // Pagination
            document.getElementById('prevPageBtn').addEventListener('click', () => changePage(currentPage - 1));
            document.getElementById('nextPageBtn').addEventListener('click', () => changePage(currentPage + 1));
            itemsPerPageSelect.addEventListener('change', handleItemsPerPageChange);
            
            // Close modal on background click
            formModal.addEventListener('click', (e) => {
                if (e.target === formModal) closeForm();
            });
        }

        // Debounce function for search
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // Search functionality
        function handleSearch() {
            const searchTerm = searchInput.value.toLowerCase();
            if (searchTerm === '') {
                filteredEmployees = [...mockEmployees];
            } else {
                filteredEmployees = mockEmployees.filter(employee =>
                    employee.firstName.toLowerCase().includes(searchTerm) ||
                    employee.lastName.toLowerCase().includes(searchTerm) ||
                    employee.email.toLowerCase().includes(searchTerm)
                );
            }
            currentPage = 1;
            sortEmployees();
            renderEmployees();
        }

        // Sort functionality
        function handleSort() {
            currentSort = sortBy.value;
            sortEmployees();
            renderEmployees();
        }

        function sortEmployees() {
            filteredEmployees.sort((a, b) => {
                const aValue = a[currentSort].toLowerCase();
                const bValue = b[currentSort].toLowerCase();
                return aValue.localeCompare(bValue);
            });
        }

        // Filter functionality
        function toggleFilterPanel() {
            filterPanel.classList.toggle('active');
        }

        function applyFilters() {
            const firstNameFilter = document.getElementById('filterFirstName').value.toLowerCase();
            const departmentFilter = document.getElementById('filterDepartment').value;
            const roleFilter = document.getElementById('filterRole').value;

            filteredEmployees = mockEmployees.filter(employee => {
                const matchesFirstName = !firstNameFilter || employee.firstName.toLowerCase().includes(firstNameFilter);
                const matchesDepartment = !departmentFilter || employee.department === departmentFilter;
                const matchesRole = !roleFilter || employee.role === roleFilter;
                return matchesFirstName && matchesDepartment && matchesRole;
            });

            currentPage = 1;
            sortEmployees();
            renderEmployees();
            filterPanel.classList.remove('active');
        }

        function clearFilters() {
            document.getElementById('filterFirstName').value = '';
            document.getElementById('filterDepartment').value = '';
            document.getElementById('filterRole').value = '';
            searchInput.value = '';
            filteredEmployees = [...mockEmployees];
            currentPage = 1;
            sortEmployees();
            renderEmployees();
            filterPanel.classList.remove('active');
        }

        // Employee rendering
        function renderEmployees() {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const employeesToShow = filteredEmployees.slice(startIndex, endIndex);

            if (employeesToShow.length === 0) {
                employeeGrid.innerHTML = `
                    <div class="empty-state">
                        <h3>No employees found</h3>
                        <p>Try adjusting your search or filter criteria.</p>
                    </div>
                `;
            } else {
                employeeGrid.innerHTML = employeesToShow.map(employee => `
                    <div class="employee-card" data-employee-id="${employee.id}">
                        <h3>${employee.firstName} ${employee.lastName}</h3>
                        <div class="employee-info">
                            <span><strong>ID:</strong> ${employee.id}</span>
                            <span><strong>Email:</strong> ${employee.email}</span>
                            <span><strong>Department:</strong> ${employee.department}</span>
                            <span><strong>Role:</strong> ${employee.role}</span>
                        </div>
                        <div class="employee-actions">
                            <button class="btn btn-primary edit-btn" data-id="${employee.id}">Edit</button>
                            <button class="btn btn-danger delete-btn" data-id="${employee.id}">Delete</button>
                        </div>
                    </div>
                `).join('');

                // Add event listeners to edit and delete buttons
                document.querySelectorAll('.edit-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const employeeId = parseInt(e.target.dataset.id);
                        openForm(employeeId);
                    });
                });

                document.querySelectorAll('.delete-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const employeeId = parseInt(e.target.dataset.id);
                        deleteEmployee(employeeId);
                    });
                });
            }

            renderPagination();
        }

        // Pagination
        function renderPagination() {
            const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
            const startItem = (currentPage - 1) * itemsPerPage + 1;
            const endItem = Math.min(currentPage * itemsPerPage, filteredEmployees.length);

            // Update pagination info
            document.getElementById('paginationInfo').textContent = 
                `Showing ${startItem}-${endItem} of ${filteredEmployees.length} employees`;

            // Update page numbers
            const pageNumbers = document.getElementById('pageNumbers');
            pageNumbers.innerHTML = '';

            for (let i = 1; i <= totalPages; i++) {
                if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                    const pageBtn = document.createElement('button');
                    pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
                    pageBtn.textContent = i;
                    pageBtn.addEventListener('click', () => changePage(i));
                    pageNumbers.appendChild(pageBtn);
                } else if (i === currentPage - 3 || i === currentPage + 3) {
                    const ellipsis = document.createElement('span');
                    ellipsis.textContent = '...';
                    ellipsis.className = 'page-ellipsis';
                    pageNumbers.appendChild(ellipsis);
                }
            }

            // Update prev/next buttons
            document.getElementById('prevPageBtn').disabled = currentPage === 1;
            document.getElementById('nextPageBtn').disabled = currentPage === totalPages;
        }

        function changePage(page) {
            const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
            if (page >= 1 && page <= totalPages) {
                currentPage = page;
                renderEmployees();
            }
        }

        function handleItemsPerPageChange() {
            itemsPerPage = parseInt(itemsPerPageSelect.value);
            currentPage = 1;
            renderEmployees();
        }

        // Form functionality
        function openForm(employeeId = null) {
            editingEmployeeId = employeeId;
            const formTitle = document.getElementById('formTitle');
            
            if (employeeId) {
                const employee = mockEmployees.find(emp => emp.id === employeeId);
                if (employee) {
                    formTitle.textContent = 'Edit Employee';
                    document.getElementById('firstName').value = employee.firstName;
                    document.getElementById('lastName').value = employee.lastName;
                    document.getElementById('email').value = employee.email;
                    document.getElementById('department').value = employee.department;
                    document.getElementById('role').value = employee