(function () {
    const vscode = acquireVsCodeApi();
    const iconGrid = document.getElementById('iconGrid');
    const searchInput = document.getElementById('searchInput');
    const styleSelect = document.getElementById('styleSelect');
    const fillSelect = document.getElementById('fillSelect');
    const weightSelect = document.getElementById('weightSelect');

    let allIcons = [];
    let filteredIcons = [];
    let displayCount = 120;
    const PAGE_SIZE = 80;

    window.addEventListener('message', event => {
        const message = event.data;
        switch (message.command) {
            case 'loadIcons':
                allIcons = message.icons;
                filteredIcons = [...allIcons];
                renderIcons();
                break;
        }
    });

    function renderIcons() {
        iconGrid.innerHTML = '';
        const style = styleSelect.value;
        const fill = fillSelect.value;
        const weight = weightSelect.value;
        
        const toShow = filteredIcons.slice(0, displayCount);
        
        toShow.forEach(icon => {
            const card = document.createElement('div');
            card.className = 'icon-card';
            card.title = icon.name;
            
            card.innerHTML = `
                <div class="icon-preview material-symbols-${style}" style="font-variation-settings: 'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24">${icon.name}</div>
                <div class="icon-name">${icon.name}</div>
                <div class="card-actions">
                    <button class="action-btn" data-action="insert">Insertar</button>
                    <button class="action-btn" data-action="copyHtml">HTML</button>
                    <button class="action-btn" data-action="copyReact">React</button>
                </div>
            `;

            card.addEventListener('click', (e) => {
                const actionBtn = e.target.closest('.action-btn');
                const action = actionBtn ? actionBtn.getAttribute('data-action') : 'insert';
                
                vscode.postMessage({
                    command: action,
                    iconName: icon.name,
                    style: styleSelect.value,
                    fill: fillSelect.value,
                    weight: weightSelect.value
                });
            });

            iconGrid.appendChild(card);
        });

        if (displayCount < filteredIcons.length) {
            const loadMoreContainer = document.createElement('div');
            loadMoreContainer.className = 'load-more';
            const loadMoreBtn = document.createElement('button');
            loadMoreBtn.className = 'secondary';
            loadMoreBtn.innerText = `Cargar más (${filteredIcons.length - displayCount} restantes)`;
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
        const stats = document.getElementById('stats');
        if (stats) {
            stats.innerText = `Mostrando ${Math.min(displayCount, filteredIcons.length)} de ${filteredIcons.length} iconos`;
        }
    }

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        filteredIcons = allIcons.filter(icon => 
            icon.name.toLowerCase().includes(query) || 
            icon.tags.some(tag => tag.toLowerCase().includes(query))
        );
        displayCount = 120;
        renderIcons();
    });

    [styleSelect, fillSelect, weightSelect].forEach(el => {
        el.addEventListener('change', () => {
            renderIcons();
        });
    });

    vscode.postMessage({ command: 'ready' });
}());
