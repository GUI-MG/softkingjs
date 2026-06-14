let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

var produtos = [
  {id: 1, nome: "Álbum de Figurinhas", descricao: "Álbum de figurinhas da Copa do Mundo 2026 - Capa Dura Ouro", estoque: 20000, categoria: "album", preco: 139.9, ativo: true, quantidade: 0},
  { id: 2, nome: "Brasil", descricao: "Camisa da Seleção Brasileira", tamanhos: ['P', 'M', 'G', 'GG'], estoque: [2000, 5000, 10000, 15000], preco: 339.9, categoria: "camisa", ativo: true, quantidade: 0, tamanho: ""},
  { id: 3, nome: "Uruguai", descricao: "Camisa da Seleção do Uruguai", tamanhos: ['P', 'M', 'G', 'GG', 'G1'], estoque: [2000, 6000, 12000, 14000, 3000], ativo: true, preco: 272.6, categoria: "camisa", quantidade: 0, tamanho: ""},
  { id: 4, nome: "Argentina", descricao: "Camisa da Seleção Argentina", tamanhos: ['P', 'M', 'G', 'GG', 'G1', 'G2'], ativo: true, preco: 329.99, estoque: [3000, 6000, 10000, 14000, 5000, 9000], categoria: "camisa", quantidade: 0, tamanho: ""},
  { id: 5, nome: "Alemanha", descricao: "Camisa 2 da Seleção Alemã", tamanhos: ['P', 'M', 'G', 'GG'], ativo: true, estoque: [6000, 10000, 15000, 20000], preco: 489.9, categoria: "camisa", quantidade: 0, tamanho: ""},
  { id: 6, nome: "Espanha", descricao: "Camisa da Seleção Espanhola", tamanhos: ['P', 'M', 'G'], ativo: true, preco: 399.99, categoria: "camisa", estoque: [3000, 4000, 10000], quantidade: 0, tamanho: ""},
  { id: 7, nome: "EUA", descricao: "Camisa da Seleção Americana", tamanhos: ['P', 'M', 'G'], ativo: true, preco: 288.7, categoria: "camisa", estoque: [4000, 2000, 8000], quantidade: 0, tamanho: ""},
  { id: 8, nome: "Itália", descricao: "Camisa da Seleção Italiana", tamanhos: ['P', 'M', 'G', 'GG'], ativo: true, preco: 378.8, categoria: "camisa", estoque: [5000, 20000, 15000, 10000], quantidade: 0, tamanho: ""},
  { id: 9, nome: "Japão", descricao: "Camisa da Seleção Japonesa", tamanhos: ['P', 'M'], ativo: true, preco: 269.99, categoria: "camisa", estoque: [2000, 4000], quantidade: 0, tamanho: ""},
  { id: 10, nome: "México", descricao: "Camisa da Seleção Mexicana", tamanhos: ['P', 'M', 'G'], ativo: true, preco: 279.9, categoria: "camisa", estoque: [1450, 3000, 5000], quantidade: 0, tamanho: ""},
  { id: 11, nome: "Portugal", descricao: "Camisa da Seleção Portuguesa", tamanhos: ['P', 'M', 'G', 'GG'], ativo: true, preco: 320.99, categoria: "camisa", estoque: [4000, 3000 ,5000, 10000], quantidade: 0, tamanho: ""},
  { id: 12, nome: "Inglaterra", descricao: "Camisa da Seleção Inglesa", tamanhos: ['P', 'M', 'G'], ativo: true, preco: 270.9, categoria: "camisa", estoque: [5000, 12000, 15000], quantidade: 0, tamanho: ""},


];

function renderizarProdutos() {
    const container = document.getElementById('visualizacao');
    let containerTamanhos = document.getElementById('tamanhos');
    
    if (!container) return;
    
    let tamanhosHTML = '';
    container.innerHTML = '';
    
    produtos.forEach (produto => {
        
        if(!produto.ativo) return;

        containerTamanhos = '';

        if(produto.tamanhos) {
            for (let i = 0; i < produto.tamanhos.length; i++) {
            
                tamanhosHTML = `
                    <div id="segmentoTamanho">
                        <input type="checkbox" id="tamanhoProduto" name="${produto.tamanhos[i]}" value="${produto.tamanhos[i]}" onclick="selecionarTamanho([${produto.id}, '${produto.tamanhos[i]}'])">
                        <label for="tamanhoProduto">${produto.tamanhos[i]}</label>
                    </div>
                `;
            
                containerTamanhos += tamanhosHTML;
                
            }
        }

        const produtoHTML = `
        <section class="produto">
                <article class="card">
                    <div class="card_header">
                        <header>
                            <h2>${produto.nome}</h2>
                        </header>
                    </div>
                        <div class="card_image">
                            <img src="../../assets/img/${getImagePorNome(produto.nome)}" alt="${produto.nome}">
                        </div>
                        <div class="card_description">
                            <div class="card_description_header">
                                <h4>Descrição:</h4>
                            </div>
                            <div class="card_description_body">
                                <p>${produto.descricao}</p>
                               ${containerTamanhos == '' ? '' : 
                                `
                                <p><b>Obs.: Adicione um tamanho por vez ao carrinho.</b></p>
                                <div id="tamanhos" class="container">
                                    ${containerTamanhos}
                                </div>

                                `}
                            </div>
                        </div>

                        <div class="card_footer">
                            <div class="actions">
                                <button class="actionsButton" onclick="comprar(${produto.id})">
                                    <i class="bi bi-bag-fill"></i>  Comprar
                                </button>
                                <button class="actionsButton" onclick="adicionarAoCarrinho(${produto.id})">
                                    <i class="bi bi-cart"></i>  Adicionar ao carrinho
                                </button>
                            </div>
                        </div>
                </article>
            </section>
        `;

        container.innerHTML += produtoHTML;
    });
}

function getImagePorNome(nome) {
    const images = {
        'Álbum de Figurinhas': 'album_capa_dura.webp',
        'Brasil': 'camisaBrasil.avif',
        'Uruguai': 'camisaUruguai.png',
        'Argentina': 'camisaArgentina.avif',
        'Alemanha': 'camisaAlemanha.avif',
        'Espanha': 'camisaEspanha.avif',
        'EUA': 'camisaEUA.avif',
        'Itália': 'camisaItalia.jpg',
        'Japão': 'camisaJapan.avif',
        'México': 'camisaMexico.avif',
        'Portugal': 'camisaPortugal.avif',
        'Inglaterra': 'camisaInglaterra.avif'
    };
    
    return images[nome] || 'placeholder.jpg';
}

document.addEventListener('DOMContentLoaded', function() {
    renderizarProdutos();
})


function comprar() {
    Swal.fire ({
        title: 'Perfeito!',
        text: `Preparando tudo para sua compra...
        Direcionando para a página de finalização de compra.
        `,
        icon: 'success',
        showConfirmButton: false
    })
    setTimeout(() => {
        window.location.href='finalizacaoCompra.html';
    }, 1800);
}

function selecionarTamanho(tamProduto) {
    const checkbox = document.querySelector(`input[name=${tamProduto[1]}]`);

    let idProduto = tamProduto[0];
    let produtoTam = tamProduto[1];

    if (checkbox.checked) {
        produtos.forEach(produto => {
            
            if(produto.id == idProduto) {
                let tamanhoExistente = false;

                if(carrinho.length>0) {
                    for (let i = 0; i < carrinho.length; i++) {
                        if(carrinho[i].tamanho == produtoTam[1]) {
                            tamanhoExistente = true;
                            break;
                        }
                    }
                }
                
                
                let indexTamanho = produto.tamanhos.indexOf(produtoTam);
                let estoqueProduto = produto.estoque[indexTamanho];

                if(estoqueProduto > 0 && !tamanhoExistente) {
                    produto.tamanho = produtoTam;
                    produto.estoque[indexTamanho]-=produto.quantidade;                   

                } else {
                    Swal.fire ({
                        title: 'Erro!',
                        icon: 'error',
                        confirmButtonText: 'Ok', 
                        confirmButtonColor: 'rgb(0, 150, 0)'
                    });
                    checkbox.checked = false;
                }
            }
        });

    } else {
        produtos.forEach(produto => {
            if(produto.id == idProduto) {
                let indexTamanhoExclusao = produto.tamanhos.indexOf(produtoTam)
                produto.tamanho = '';
                produto.estoque[indexTamanhoExclusao]+=produto.quantidade;
                produto.quantidade = 0;
            }
        })
    }    
}

function adicionarAoCarrinho(idProduto) {
    let produtoEncontrado = false;
    let produtoCarrinho = false;
    
    if(carrinho.length==0) {
        
        for(let i = 0;i < produtos.length; i++) {
            let produto1 = produtos[i];
            
            let totalEstoque1 = 0;
            if(produto1.categoria == "camisa") {
                for (let w = 0; w < produto1.estoque.length; w++) {
                    totalEstoque1 += produto1.estoque[w];
                }
            }
            
            if(parseInt(idProduto)==produto1.id && produto1.ativo==true && (produto1.categoria == "camisa" ? totalEstoque1>1 : produto1.estoque>1)) {
                produtoEncontrado = true;
                produto1.quantidade++;
                carrinho.push(produto1);
                salvarCarrinho();
                
                Swal.fire ({
                    title: 'Produto adicionado!',
                    text: '',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1100
                })
                
                break;
            }
        }
    } else {
        
        for(let j = 0; j < carrinho.length; j++) {
            let produto2 = carrinho[j];
            let produto4 = "";
            for(let i = 0; i < produtos.length; i++) {
                if(produtos[i].id == idProduto) {
                    produto4 += produtos[i];
                }
            }
            if(produto2.tamanho == produto4.tamanho) {
                Swal.fire ({
                    title:'Produto já adicionado!',
                    icon: 'warning',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: 'rgb(0, 160, 0)'
                })
                produtoEncontrado = true;
                produtoCarrinho = true;
                salvarCarrinho();
                break;
            }
        }
        
        if(!produtoCarrinho){
            for(let h = 0; h < produtos.length; h++) {
                let produto3 = produtos[h];
            
                let totalEstoque2 = 0;
                if(produto3.categoria == "camisa") {
                    for (let q = 0; q < produto3.estoque.length; q++) {
                        totalEstoque2+=produto3.estoque[q];                    
                    }
                }
            
                if(parseInt(idProduto) == produto3.id && produto3.ativo == true && (produto3.categoria == "camisa" ? totalEstoque2>1 : produto3.estoque>1)) {
                    produtoEncontrado = true;
                    carrinho.push(produto3);
                    produto3.quantidade++;
                    salvarCarrinho();

                    Swal.fire ({
                        title: 'Produto adicionado!',
                        text: '',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1100
                    })
                            
                    salvarCarrinho();
                    break;
                }
            }
        }

        }
        if(!produtoEncontrado){
            Swal.fire ({
            title: 'Atenção!',
            text: 'Ocorreu um erro.',
            icon: 'warning',
            confirmButtonText: 'Ok',
            confirmButtonColor: 'rgb(0, 150, 0)'
            });
        }
}

document.addEventListener('animationend', function() {
    renderizarProdutos();
});


function limparCarrinho() {
    carrinho = [];
    sessionStorage.removeItem('carrinho');
    calcularTotal();
    salvarCarrinho();
    renderizarCarrinho();
}

function renderizarCarrinho() {
    const container = document.getElementById('produtosCarrinho');

    if(!container) return;

    container.innerHTML = '';

    if(carrinho.length === 0) {
        container.innerHTML += `
            <div id="message" class="container">
                <h2>O carrinho está vazio...</h2>
                <h4>Desejas comprar alguma coisa?</h4>
                <button onclick="window.location.href='produtos.html'" id="produtos"><strong>Clique aqui!</strong></button> 
            </div>
        `
    }    

    for(let f = 0; f < carrinho.length; f++) {
        
        produtoHTML = `
        <section class="produtoCarrinho">
            <article class="card_carrinho">
            <div class="card_description">
               <img src="../../assets/img/${getImagePorNome(carrinho[f].nome)}" alt="${carrinho[f].nome}">
                <div class="description_body"> 
                    <p>${carrinho[f].descricao}</p>
                    <p>${carrinho[f].tamanho ? carrinho[f].tamanho : ''}</p>
                </div>
            </div>

            <div class="card_footer_carrinho">
                <div class="card_price_carrinho">
                    <p><span>R$ ${carrinho[f].preco.toFixed(2).replace('.', ',')}</span></p>
                </div>
                <div class="quantidade">
                    <button onclick="maisProduto(${[carrinho[f].id, carrinho[f].tamanho]})" id="mais"></button>
                    <p>${carrinho[f].quantidade}</p>
                    <button onclick="menosProduto(${[carrinho[f].id, carrinho[f].tamanho]})" id="menos"></button>
                </div>

                <div class="actionsProduto">
                    <button onclick="excluirProduto(${[carrinho[f].id, carrinho[f].tamanho]})" id="excluirProdutoCarrinho">Excluir</button>
                    <button onclick="resetProduto(${carrinho[f].id})" id="resetarProduto">Reset</button>
                </div>
                
            </article>
        </section>
        `;

    container.innerHTML += produtoHTML;
    
    }

    return container;

}

document.addEventListener('DOMContentLoaded', function() {
    renderizarCarrinho();
});

function maisProduto(idProdutoCarrinho, tamanho) {
    
    carrinho.forEach((produto) => {
        if(produto.id == idProdutoCarrinho && produto.tamanho == tamanho) {
            produto.quantidade++;
            salvarCarrinho();
            calcularTotal();    
        }
    })
    
    document.addEventListener('click', function() {
        renderizarCarrinho();
    });
    
}

function menosProduto(idProdutoCarrinho, tamanho) {
    
    carrinho.forEach((produto) => {
        if(produto.id == idProdutoCarrinho && produto.tamanho == tamanho) {
            produto.quantidade > 1 ? produto.quantidade-- : produto.quantidade = 1;
            produto.estoque++;
            salvarCarrinho();
            calcularTotal();
        }
    })
    
    document.addEventListener('click', function() {
        renderizarCarrinho();
    });
    
}

/* Criar Função de excluir produto do carrinho */

function excluirProduto(idProdutoCarrinho, tamanho) {

    let id = idProdutoCarrinho;
    let tamanhoExclusao = tamanho;

    for (let i = 0; i < carrinho.length; i++) {
        let exclusao = carrinho[i];
        if(exclusao.tamanho == tamanhoExclusao && exclusao.id == id) {
            carrinho.splice(i, 1);
            salvarCarrinho();
            calcularTotal();
        }
    };
    
    document.addEventListener('click', function() {
        renderizarCarrinho();
    });
    
}


function calcularTotal() {
    const container = document.getElementById('carrinhoTotal');
    const container2 = document.getElementById('compraDoCarrinho');
    
    let totalHTML = '';
    let comprarHTML = '';

    if(!container) return;
    if(!container2) return;

    container.innerHTML = '';
    container2.innerHTML = '';

    let total = 0;

    /* carrinho.forEach((produto) => {
        //Refazer a lógica do cálculo do total
    })
 */
    let valorFormatado = total.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    if(carrinho.length>0) {
        totalHTML = `
            <div id="produtosTotal" class="container">
                <h3><b>Total: </b></h3>
                <h3>R$ ${valorFormatado=0}</h3>
            </div>
        `;

        comprarHTML = `
            <div id="comprarCarrinho" class="container">
                <button onclick="comprarCarrinho()">Finalizar Compra</button>
            </div>
        `;
    }

    container.innerHTML += totalHTML;
    container2.innerHTML += comprarHTML;

    return container, container2;
    
}

document.addEventListener('DOMContentLoaded', function() {
    calcularTotal();
})

function resetProduto(idProduto) {
    
    /* const containerTamanhos = document.g */

    carrinho.forEach((produto) => {
        if(produto.id == idProduto) {
            produto.quantidade = 1;
            calcularTotal();
            salvarCarrinho();
        }
    })

    document.addEventListener('click', function() {
        resetProduto();
    })

}

function comprarCarrinho() {
    window.location.href='finalizacaoCompra.html';
}