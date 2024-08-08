document.addEventListener('DOMContentLoaded', function () {
    const adicionarProdutoBtn = document.getElementById('adicionar-produto');
    const removerProdutoBtn = document.getElementById('remover-produto');

    function atualizarValorTotal(element) {
        const quantidadeInput = element.querySelector('input[name="quantidade"]');
        const valorUnitarioInput = element.querySelector('input[name="valor-unitario"]');
        const valorTotalInput = element.querySelector('input[name="valor-total"]');

        function calcularValorTotal() {
            const quantidade = parseFloat(quantidadeInput.value) || 0;
            const valorUnitario = parseFloat(valorUnitarioInput.value) || 0;
            const valorTotal = quantidade * valorUnitario;

            valorTotalInput.value = valorTotal.toFixed(2); 
        }

        quantidadeInput.addEventListener('input', calcularValorTotal);
        valorUnitarioInput.addEventListener('input', calcularValorTotal);

        calcularValorTotal();
    }

    function adicionarProduto() {
        adicionarProdutoBtn.style.display = 'none';

        const produtos = document.getElementById('section-produto');
        const produtoCount = produtos.querySelectorAll('.produtos').length + 1;

        const novoProduto = document.createElement('div');
        novoProduto.style.display = '-webkit-box';
        novoProduto.className = 'produtos'; 
        novoProduto.innerHTML = `
            <button class="remover-produto" style="height: 10%; margin: 50px 0 0 0;">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            </button>
            <div class="section-content-produto" style="width: 93%; margin-left: 2%;">
                <div class="bordered-section">
                    <span class="border-text">Produto - ${produtoCount}</span>
                    <div class="form-produto" style="padding: 10px 50 0 0px;">
                        <div style="display: -webkit-box; text-align: end;">
                            <button class="btn-box" style="width: 5%; border-radius: 50px;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-seam" viewBox="0 0 16 16">
                                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"/>
                                </svg>
                            </button>
                            <div class="form" style="display: inline;">
                                <label for="produto">Produto</label>
                                <input type="text" style="width: 90%;" name="produto" required>
                            </div>
                            <div class="form" style="display: inline;">
                                <label for="unidade">UND. Medida</label>
                                <select name="unidade" style="width: 15%;" required>
                                    <option value="unidade">Unidade</option>
                                    <option value="KG">Kg</option>
                                    <option value="litro">Litro</option>
                                </select>

                                <label for="quantidade">QTD. em Estoque</label>
                                <input type="number" style="width: 5%;" name="quantidade" required>

                                <label for="valor-unitario">Valor Unitário</label>
                                <input type="number" style="width: 15%;" name="valor-unitario" step="0.01" required>

                                <label for="valor-total">Valor Total</label>
                                <input class="valor-total" disabled type="number" style="width: 15%; background-color: gainsboro; margin-top: 10px;" name="valor-total" required>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        novoProduto.querySelector('.remover-produto').addEventListener('click', function() {
            removerProduto(novoProduto);
        });

        bloquearCampos(produtos);

        produtos.appendChild(novoProduto);

        atualizarValorTotal(novoProduto);

        produtos.appendChild(adicionarProdutoBtn);

        atualizarSessionStorage();

        adicionarProdutoBtn.style.display = 'block';

        // const addFluigToast = (title, type, timeout) => {
        //     FLUIGC.toast({
        //       title: `${title}`,
        //       message: "",
        //       type: `${type}`,
        //       timeout: `${timeout}`,
        //     });
        //   };
      
        // addFluigToast("Produto adicionado com sucesso!", "success", "fast");

        alert('Produto adicionado com sucesso')

    }

    function bloquearCampos(produto) {
        const inputs = produto.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.disabled = true;
        });
    }

    function removerProduto(button) {
        const produto = button.closest('.produtos');
        if (produto) {
            produto.remove();
            reindexarProdutos();
            atualizarSessionStorage();
        }
    }

    function reindexarProdutos() {
        const produtos = document.querySelectorAll('.produtos');
        produtos.forEach((produto, index) => {
            const span = produto.querySelector('.border-text');
            span.textContent = `Produto - ${index + 1}`;
        });
    }

    function atualizarSessionStorage() {
        const containerProdutos = document.getElementById('section-produto');
        const produtoDados = Array.from(containerProdutos.querySelectorAll('.produtos')).map(produto => {
            const produtoElement = produto.querySelector('.form-produto');
            const produtoNome = produtoElement.querySelector('input[name="produto"]').value.trim();
            const unidade = produtoElement.querySelector('select[name="unidade"]').value;
            const quantidade = produtoElement.querySelector('input[name="quantidade"]').value.trim();
            const valorUnitario = produtoElement.querySelector('input[name="valor-unitario"]').value.trim();
            const valorTotal = produtoElement.querySelector('input[name="valor-total"]').value.trim();

            if (produtoNome && quantidade && valorUnitario) {
                return {
                    produto: produtoNome,
                    unidade: unidade,
                    quantidade: quantidade,
                    valorUnitario: valorUnitario,
                    valorTotal: valorTotal
                };
            } else {
                return null;
            }
        }).filter(item => item !== null); 

        sessionStorage.setItem('produtos', JSON.stringify(produtoDados));
    }

    adicionarProdutoBtn.addEventListener('click', adicionarProduto);
    document.querySelector('.remover-produto').addEventListener('click', function() {
        removerProduto(this);
    });

    Array.from(document.querySelectorAll('.section-content-produto')).forEach(atualizarValorTotal);
});

