(function () {
    const vscode = acquireVsCodeApi();
    const iconGrid = document.getElementById('iconGrid');
    const searchInput = document.getElementById('searchInput');
    const stats = document.getElementById('stats');

    const allIcons = window.__ICONS__ || [];
    const style = window.__STYLE__ || 'outlined';
    
    let filteredIcons = [...allIcons];
    let displayCount = 200;
    const PAGE_SIZE = 150;

    function renderIcons() {
        iconGrid.innerHTML = '';
        
        const toShow = filteredIcons.slice(0, displayCount);
        
        toShow.forEach(icon => {
            const card = document.createElement('div');
            card.className = 'icon-card';
            card.innerHTML = `
                <div class="icon-preview material-symbols-${style}">${icon.name}</div>
                <div class="icon-name">${icon.name}</div>
                <div class="card-actions">
                    <button class="action-btn" data-action="insert">Insertar</button>
                    <button class="action-btn" data-action="copyHtml">Copiar HTML</button>
                    <button class="action-btn" data-action="copyReact">Copiar React</button>
                    <button class="action-btn" data-action="copyName">Copiar nombre</button>
                </div>
            `;

            card.addEventListener('click', (e) => {
                const actionBtn = e.target.closest('.action-btn');
                const action = actionBtn ? actionBtn.getAttribute('data-action') : 'insert';
                
                vscode.postMessage({
                    command: action,
                    iconName: icon.name
                });
            });

            iconGrid.appendChild(card);
        });

        if (displayCount < filteredIcons.length) {
            const loadMoreContainer = document.createElement('div');
            loadMoreContainer.className = 'load-more';
            const loadMoreBtn = document.createElement('button');
            loadMoreBtn.className = 'primary';
            loadMoreBtn.innerText = `Cargar más iconos (${filteredIcons.length - displayCount} restantes)`;
            loadMoreBtn.addEventListener('click', () => {
                displayCount += PAGE_SIZE;
                renderIcons();
            });
            loadMoreContainer.appendChild(loadMoreBtn);
            iconGrid.appendChild(loadMoreContainer);
        }

        updateStats();
    }

    function updateStats() {
        stats.innerText = `Mostrando ${Math.min(displayCount, filteredIcons.length)} de ${filteredIcons.length} iconos encontrados`;
    }

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        filteredIcons = allIcons.filter(icon => 
            icon.name.toLowerCase().includes(query) || 
            icon.tags.some(tag => tag.toLowerCase().includes(query))
        );
        displayCount = 200;
        renderIcons();
    });

    // Initial render
    renderIcons();
}());
