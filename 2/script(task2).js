document.addEventListener('DOMContentLoaded', () => {
    let main = document.querySelector('.main')
    let hd = document.createElement('h1')
    hd.className = 'header'
    hd.innerHTML = 'Корзина товаров'
    hd.style.textAlign = 'center'
    main.appendChild(hd);
    let basketWrap = document.createElement('div')
    basketWrap.className = 'basket__wrap'
    main.appendChild(basketWrap)
    let newProd

    class Basket {
        constructor(prod, price) {
            this.prod = prod
            this.price = price
            this.sum = {
                'Общая сумма': 0,
                'Количество товара': 0,
                Товар: this.prod
            }
        }
        getSum(prod, sum, amount) {
            this.sum = {
                'Общая сумма': sum,
                'Количество товара': amount,
                Товар: prod
            };
        }
        returnSum() {
            return this.sum;
        }
        getItemName() {
            return this.prod
        }
    }
    function createProdItem(item) {
        newProd = document.createElement('div')
        newProd.className = 'prod__wrap'
        newProd.innerHTML = `
     <div class='prod__header'>${item.prod}</div>
     
     <div class='count'>
     <div class='prod__price'>${item.price}</div>
     <button class='minus'>-</button>
     <div class='number'>0</div>
     <button class='plus'>+</button>
    </div>`;
        basketWrap.appendChild(newProd)
    }
    let addBasket = document.createElement('button')
    addBasket.className = 'add__btn'
    addBasket.innerHTML = 'Добавить'
    main.appendChild(addBasket);

    let basketInfo = document.createElement('div')
    basketInfo.className = 'basket__info'
    basketInfo.innerHTML =
        `<div class='sum__wrap'>Корзина пуста</div>
       <div class='sum__price'></div>`
    main.appendChild(basketInfo)

    let iphone = new Basket('iphone', 150000)
    let samsung = new Basket('samsung', 100000)
    let arr = [iphone, samsung]
    createProdItem(iphone)
    createProdItem(samsung)

    let del = document.createElement('button')
    del.className = 'delete'
    del.innerHTML = 'Очистить'
    main.appendChild(del);

    let infoWrap = document.querySelector('.sum__wrap')

    function addHandlers(count) {
        let minus = count.querySelector('.minus')
        let number = count.querySelector('.number')
        let plus = count.querySelector('.plus')
        let price = count.querySelector('.prod__price')

        plus.addEventListener('click', function () {
            number.innerText++
            sum = number.innerText * price.innerText
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].getItemName() === count.previousElementSibling.textContent) {
                    arr[i].getSum(arr[i].getItemName(), sum, parseInt(number.innerText))
                }
            }
        });
        minus.addEventListener('click', function () {
            if (number.textContent == 0) {
                number.textContent = 0
            }
            else {
                number.innerText--
            }
            sum = number.innerText * price.innerText
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].getItemName() === count.previousElementSibling.textContent) {
                    arr[i].getSum(arr[i].getItemName(), sum, parseInt(number.innerText))
                }
            }
        })
    }

    let counts = document.querySelectorAll('.count')
    counts.forEach(addHandlers);


    let dele = document.querySelector('.delete')

    dele.addEventListener('click', function () {
        let number = document.querySelectorAll('.number')
        for (let i = 0; i < arr.length; i++) {
            arr[i].getSum(arr[i].getItemName(), 0, 0)
        }
        infoWrap.textContent = 'Корзина пуста'
        for (let i = 0; i < number.length; i++) {
            number[i].innerText = 0
        }
    })

    let price = document.querySelectorAll('.prod__price')
    let number = document.querySelectorAll('.number')
    addBasket.addEventListener('click', function () {
        let infoPrice = 0;
        let infoAmount = ''
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].returnSum()['Количество товара'] !== 0) {
                infoAmount += `${arr[i].returnSum()['Товар']} в количестве ${arr[i].returnSum()['Количество товара']} штук `;
                infoPrice += arr[i].returnSum()['Общая сумма']
            }
        }
        if (infoPrice === 0) {
            infoWrap.innerText = `В корзине ничего нет`
        }
        else {
            infoWrap.innerText = `Товары в корзине: ${infoAmount} на общую сумму в ${infoPrice} рублей`
        }
        infoAmount = ''
    })

    let hb = document.createElement('h2')
    hb.className = 'header'
    hb.style.textAlign = 'center'
    main.appendChild(hb)
    main.appendChild(modalBtn)
    let modal = document.createElement('div')
    modal.className = 'modal'
    let modalContent = document.createElement('div')
    modalContent.className = 'modal__content'
    let closeModal = document.createElement('span')
    closeModal.className = 'close__modal'
    closeModal.innerHTML = '&times'

    main.appendChild(modal)
    modal.appendChild(modalContent)
    modalContent.appendChild(closeModal)
    modalContent.appendChild(img)

    modalBtn.onclick = function () {

        modal.classList.toggle('block')
    }
    closeModal.onclick = function () {
        modal.classList.add('none')
    }
    window.onclick = function (e) {
        if (e.target == modal) {
            modal.classList.add('none')
        }
    }

})