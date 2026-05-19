(function () {
    const vscode        = acquireVsCodeApi();
    const iconGrid      = document.getElementById('iconGrid');
    const searchInput   = document.getElementById('searchInput');
    const styleSelect   = document.getElementById('styleSelect');
    const fillSelect    = document.getElementById('fillSelect');
    const weightSelect  = document.getElementById('weightSelect');
    const statsEl       = document.getElementById('stats');
    const cdnBtn        = document.getElementById('cdnBtn');

    let allIcons      = [];
    let filteredIcons = [];
    let displayCount  = 120;
    const PAGE_SIZE   = 80;

    // ── Botón CDN ─────────────────────────────────────────────
    if (cdnBtn) {
        cdnBtn.addEventListener('click', () => {
            vscode.postMessage({ command: 'importCdn', style: styleSelect.value });
        });
    }

    // ── Mensajes desde el backend ──────────────────────────────
    window.addEventListener('message', event => {
        const msg = event.data;
        if (msg.command === 'loadIcons') {
            allIcons      = msg.icons;
            filteredIcons = [...allIcons];
            renderIcons();
        }
    });

    // ── Renderizado ────────────────────────────────────────────
    function renderIcons() {
        iconGrid.innerHTML = '';
        const style  = styleSelect.value;
        const fill   = fillSelect.value;
        const weight = weightSelect.value;

        filteredIcons.slice(0, displayCount).forEach(icon => {
            const card = document.createElement('div');
            card.className = 'icon-card';
            card.title     = icon.name;
            card.innerHTML = `
                <div class="icon-preview material-symbols-${style}"
                     style="font-variation-settings:'FILL' ${fill},'wght' ${weight},'GRAD' 0,'opsz' 24"
                >${icon.name}</div>
                <div class="icon-name">${icon.name}</div>
                <div class="card-actions">
                    <button class="action-btn" data-action="insert">Insertar</button>
                    <button class="action-btn" data-action="copyHtml">HTML</button>
                    <button class="action-btn" data-action="copyReact">React</button>
                    <button class="action-btn" data-action="copyName">Nombre</button>
                </div>`;

            card.addEventListener('click', e => {
                const btn    = e.target.closest('.action-btn');
                const action = btn ? btn.getAttribute('data-action') : 'insert';
                vscode.postMessage({
                    command:  action,
                    iconName: icon.name,
                    style:    styleSelect.value,
                    fill:     fillSelect.value,
                    weight:   weightSelect.value
                });
            });

            iconGrid.appendChild(card);
        });

        // "Cargar más"
        if (displayCount < filteredIcons.length) {
            const wrap = document.createElement('div');
            wrap.className = 'load-more';
            const btn = document.createElement('button');
            btn.className   = 'secondary';
            btn.textContent = `Cargar más (${filteredIcons.length - displayCount} restantes)`;
            btn.addEventListener('click', () => { displayCount += PAGE_SIZE; renderIcons(); });
            wrap.appendChild(btn);
            iconGrid.appendChild(wrap);
        }

        updateStats();
    }

    function updateStats() {
        if (statsEl) {
            statsEl.textContent =
                `Mostrando ${Math.min(displayCount, filteredIcons.length)} de ${filteredIcons.length} iconos`;
        }
    }

    // ── Búsqueda ───────────────────────────────────────────────
    searchInput.addEventListener('input', () => {
        const q = searchInput.value.toLowerCase();
        filteredIcons = allIcons.filter(icon =>
            icon.name.toLowerCase().includes(q) ||
            (icon.tags && icon.tags.some(tag => tag.toLowerCase().includes(q)))
        );
        displayCount = 120;
        renderIcons();
    });

    // ── Cambios de controles ───────────────────────────────────
    [styleSelect, fillSelect, weightSelect].forEach(el => {
        el.addEventListener('change', () => renderIcons());
    });

    // ── Listo ──────────────────────────────────────────────────
    vscode.postMessage({ command: 'ready' });
}());
