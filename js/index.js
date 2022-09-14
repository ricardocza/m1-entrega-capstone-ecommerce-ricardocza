verificarDatabase(data)
let quantidadeItensTotal = 0
let valorTotal = 0
const quantidadeItensCart = document.getElementById('quantidade-itens')
const totalCart = document.getElementById('total-compra')

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
    figure.style.opacity = '100%'
    const img = document.createElement('img')
    img.src = obj.img[0]
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

function converterPontoEmVirgula(numero) {
    let valorString = numero.toFixed(2)
    valorString = String(valorString).replace('.', ',')    
    return valorString
}

const button = document.getElementsByClassName('add-cart')
for(let i = 0; i < button.length; i++) {
    let botaoAddAtual = button[i]
    botaoAddAtual.addEventListener('click', function(event) {
        let liAtualId = event.path[2].id
        identificaProdutoCart(liAtualId)
    })
}

function identificaProdutoCart(idProduto) {
    if(quantidadeItensCart.innerText == 0) {
        const cartEmpty = document.getElementById('cart-empty')
        cartEmpty.style.display = 'none'
    }
    for(let i in data) {
        if(data[i].id == idProduto) {
            adicionarItem = data[i]
            insereProdutoCart(adicionarItem)            
        }
    }    
}

function insereProdutoCart(produto) {
    const cartList = document.querySelector('.cart-list')
    const liCart = document.createElement('li')

    liCart.classList += 'cart-item'
    liCart.id = `cart${cartList.children.length}`            
    
    const figureCart = document.createElement('figure')
    figureCart.classList += 'cart-item-img'            
    const imgCart = document.createElement('img')
    imgCart.src = produto.img[0]
    figureCart.append(imgCart)

    const divCart = document.createElement('div')
    divCart.classList += 'cart-item-description'
    const titleCart = document.createElement('h4')
    titleCart.innerText = produto.nameItem
    const priceCart = document.createElement('p')
    priceCart.innerText = `R$ ${converterPontoEmVirgula(produto.value)}`
    const removerItem = document.createElement('p')
    removerItem.style.fontSize = '14px'
    removerItem.classList += 'remove-cart'
    removerItem.innerText = 'Remover Produto'    
    divCart.append(titleCart, priceCart, removerItem)
    liCart.append(figureCart, divCart)
    cartList.append(liCart)
    quantidadeItensTotal++
    quantidadeItensCart.innerText = quantidadeItensTotal
    valorTotal += produto.value
    totalCart.innerText = `R$ ${converterPontoEmVirgula(valorTotal)}`

    //Identificar e remover item do cart
    removerItem.addEventListener('click', removerItemDoCart)
}

function removerItemDoCart(event) {
    if(quantidadeItensTotal == 1) {
        const cartEmpty = document.getElementById('cart-empty')
        cartEmpty.style.display = 'flex'                     
    }
    let valorRemover = buscarValorRemover(event)
    valorTotal -= valorRemover
    totalCart.innerText = `R$ ${converterPontoEmVirgula(valorTotal)}`
    quantidadeItensTotal--
    quantidadeItensCart.innerText = quantidadeItensTotal

    let itemRemover = event.path[2]
    itemRemover.remove()
}

function buscarValorRemover(event) {
    let item = event.path[1]
    let price = item.children[1].innerText
    price = price.substr(3).replace(',', '.')
    return price    
}

const menuFiltro = document.getElementsByClassName('menu')
const botoesFiltro = menuFiltro[0].children
for(let i = 0; i < botoesFiltro.length; i++) {
    botoesFiltro[i].addEventListener('click', adicionarFiltro)
}

function adicionarFiltro(event) {
    event.preventDefault()

    const ul = document.querySelector('.produtos')
    ul.style.animationName = 'none'    
    const filtroClicado = event.path[1]
    ajustarMenu(filtroClicado)
    if(filtroClicado.innerText !== 'Todos') {
        limparFiltro()
        for(let i = 0; i < ul.children.length; i++) {
            let encontrar = false
            let liAtual = ul.children[i]
            let tagLi = liAtual.children[1].children[0].children
            for(let j = 0; j < tagLi.length; j++) {
                let tagAtual = tagLi[j].innerText            
                if(tagAtual == filtroClicado.innerText) encontrar = true
            }    
            if(!encontrar) liAtual.classList += ' filtrar'        
        }    
                
    } 
    else limparFiltro() 
    requestAnimationFrame(() => {
        ul.style.animationName = ''
    })
}

function limparFiltro() {
    const li = document.getElementsByClassName('card-produto')
    for(let i = 0; i < li.length; i++) {
        li[i].className = 'card-produto'        
    }
}

function ajustarMenu(obj) {
    const ulMenu = document.getElementsByClassName('menu')[0]
    for(let i = 0; i < ulMenu.children.length; i++) {
        let liAtual = ulMenu.children[i]
        liAtual.children[0].classList = ''        
    }
    let ancora = obj.children[0]
    ancora.classList = 'menu-selected'    
}


let flagOut = ''
let frame = 50
let frameDivisor = 60
let lastTime = 0
let indiceSoma = 1
let opacidade = 0
let incrementoOpacidade = 0.1
let figuraAtual = ['']
let indiceImagem = 1
let id = 0

const cardFigures = document.getElementsByClassName('card-img')
for(let i = 0; i < cardFigures.length; i++) {
    let slideAtual = cardFigures[i]
    slideAtual.addEventListener('mouseout', mouseOut)
    slideAtual.addEventListener('mouseover', mouseEnter)
}

function mouseOut() {
    flagOut = true
    figuraAtual[0].children[0].src = data[id-1].img[0]
    frame=50
}

function mouseEnter(event) {
    figuraAtual[0] = event.target
    animarSlide()    
}

function animarSlide() {
    
    let figure = figuraAtual[0]
    id = figure.parentElement.id
    if(frame % frameDivisor == 0) {
        figure.children[0].src =  data[id-1].img[indiceImagem]
        if(indiceImagem == 3) indiceImagem = 0
        else indiceImagem++
    }
    
    opacidade += indiceSoma
    frame++
    
    if(flagOut != true) requestAnimationFrame(animarSlide)
    else if(flagOut == true) flagOut = false

}


