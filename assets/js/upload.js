function adicionarAnexoItem(fileName, base64Data, indice) {
    const container = document.getElementById('container-anexo');
    const sectionHeader = container.querySelector('.section-header');

    const anexoItem = document.createElement('div');
    anexoItem.classList.add('anexo-item');

    anexoItem.innerHTML = `
        <div class="btn-container" style="display: flex;">
            <button class="remover-anexo" style="margin-right: 1%;" onclick="removerAnexo(this, ${indice})">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            </button>
            <button class="btn-visualizar-anexo" onclick="vizualizarAnexo(this)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                </svg>
            </button>
            <span class="anexo-name" style="margin: 10px">${fileName}</span>
        </div>
    `;

    sectionHeader.insertAdjacentElement('afterend', anexoItem);
}

document.getElementById('file-input').addEventListener('click', function() {
    const fileInput = document.getElementById('adicionar-anexo');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64 = e.target.result;
            const anexos = JSON.parse(sessionStorage.getItem('anexos')) || [];
            const indice = anexos.length ? anexos[anexos.length - 1].indice + 1 : 1;
            const anexo = { indice, nomeArquivo: file.name, blobArquivo: base64 };
            anexos.push(anexo);
            sessionStorage.setItem('anexos', JSON.stringify(anexos));
            adicionarAnexoItem(file.name, base64, indice);
            fileInput.value = '';
        };
        reader.readAsDataURL(file);
    }
});

window.vizualizarAnexo = function(button) {
    const anexoItem = button.closest('.anexo-item');
    if (anexoItem) {
        const fileName = anexoItem.querySelector('.anexo-name').textContent.trim();
        const anexos = JSON.parse(sessionStorage.getItem('anexos')) || [];
        const anexo = anexos.find(a => a.nomeArquivo === fileName);

        if (anexo) {
            const fileURL = anexo.blobArquivo;
            const a = document.createElement('a');
            a.href = fileURL;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            alert("Arquivo não encontrado.");
        }
    } else {
        alert("Item de anexo não encontrado.");
    }
};

window.removerAnexo = function(button, indice) {
    const anexoItem = button.closest('.anexo-item');
    const anexos = JSON.parse(sessionStorage.getItem('anexos')) || [];
    const novoAnexos = anexos.filter(a => a.indice !== indice);
    sessionStorage.setItem('anexos', JSON.stringify(novoAnexos));
    anexoItem.remove();
};
