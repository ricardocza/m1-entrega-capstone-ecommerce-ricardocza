verificarDatabase(data)

function verificarDatabase(arrObj) {
    for(let i in arrObj) {
        let itemAtual = arrObj[i]
        inserirCards(itemAtual)
    }
}

function inserirCards (obj) {
    //criar list item
    const ul = document.querySelector('.produtos')
    const li = document.createElement('li')
    li.classList += 'card-produto'
    li.id = obj.id    
    const figure = document.createElement('figure')
    figure.classList += 'card-img'
    const img = document.createElement('img')
    img.src = obj.img
    figure.append(img)
    const divInfo = document.createElement('div')
    divInfo.classList += 'card-info'    
    const divTags = document.createElement('div')
    divTags.classList += 'tags'
    for(let i = 0; i < obj.tag.length; i++) {
        const small = document.createElement('small')        
        small.innerText = obj.tag[i]
        divTags.append(small)
    }
    const h3 = document.createElement('h3')
    h3.innerText = obj.nameItem
    const p = document.createElement('p')
    p.innerText = obj.description
    const h4 = document.createElement('h4')
    let valorProduto = converterPontoEmVirgula(obj.value)
    h4.innerText = `R$ ${valorProduto}`
    const divAdd = document.createElement('div')
    divAdd.classList += 'add-cart'
    divAdd.innerText = 'Adicionar ao carrinho'
    divInfo.append(divTags, h3, p, h4, divAdd)
    li.append(figure, divInfo)
    ul.append(li)
}

{/* <li class="card-produto">
    <figure class="card-img">
        <img src="img/jaqueta.svg" alt="Camiseta preta">
    </figure>                
    <div class="card-info">
        <div class="tags">
            <small>Camisetas</small>
            <small>Camisetas</small>
            <small>Camisetas</small>
        </div>
        <h3>Ligthweight Jacket</h3>
        <p>Adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante...</p>
        <h4>R$ 100,00</h4>
        <div class="add-cart">Adicionar ao carrinho</div>
    </div>
</li>  */}


function converterPontoEmVirgula(numero) {
    let valorString = numero.toFixed(2)
    valorString = String(valorString).replace('.', ',')    
    return valorString
}