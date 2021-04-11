"use strict";


const catalog = {
    catalogBlock: null,
    cart: null,
    list: [
        {
            id_product: 123,
            product_name: 'Ноутбук',
            price: 45600,
        },
        {
            id_product: 456,
            product_name: 'Мышка',
            price: 1000,
        },
        {
            id_product: 245,
            product_name: 'Клавиатура',
            price: 1500,
        }
    ],


    init(catalogBlockClass, cart) {
        this.catalogBlock = document.querySelector(`.${catalogBlockClass}`);
        this.cart = cart;
        this.render();
        this.addEventHandlers();
    },


    render() {
        if (this.getCatalogListLength() > 0) {
            this.renderCatalogList();
        } else {
            this.renderEmptyCatalog();
        }
    },


    addEventHandlers() {
        this.catalogBlock.addEventListener('click', event => this.addToBasket(event));
    },

    addToBasket(event) {
        if (!event.target.classList.contains('product__add-to-cart')) return;
        const idProduct = +event.target.dataset.id_product;
        const productToAdd = this.list.find((product) => product.id_product === idProduct);
        this.cart.addToBasket(productToAdd);
    },


    getCatalogListLength() {
        return this.list.length;
    },


    renderCatalogList() {
        this.catalogBlock.innerHTML = '';
        this.list.forEach(item => {
            this.catalogBlock.insertAdjacentHTML('beforeend', this.renderCatalogItem(item));
        });
    },


    renderCatalogItem(item) {
        return `<div class="product">
                <h3>${item.product_name}</h3>
                <p>${item.price} руб.</p>
                <button class="product__add-to-cart" data-id_product="${item.id_product}">В корзину</button>
            </div>`;
    },


    renderEmptyCatalog() {
        this.catalogBlock.innerHTML = '';
        this.catalogBlock.textContent = 'Каталог товаров пуст';
    },
};


const cart = {
    cartBlock: null,
    clrCartButton: null,
    goods: [],


    init(cartBlockClass, clrCartButton) {
        this.cartBlock = document.querySelector(`.${cartBlockClass}`);
        this.clrCartButton = document.querySelector(`.${clrCartButton}`);

        this.addEventHandlers();
        this.render();
    },


    addEventHandlers() {
        this.clrCartButton.addEventListener('click', this.dropCart.bind(this));
    },


    dropCart() {
        this.goods = [];
        this.render();
    },

    render() {
        if (this.getCartGoodsLength() > 0) {
            this.renderCartList();
        } else {
            this.renderEmptyCart();
        }
    },


    addToBasket(product) {
        if (product) {
            const findInBasket = this.goods.find(({ id_product }) => product.id_product === id_product);
            if (findInBasket) {
                findInBasket.quantity++;
            } else {
                this.goods.push({ ...product, quantity: 1 });
            }
            this.render();
        }
    },


    getCartGoodsLength() {
        return this.goods.length;
    },


    renderEmptyCart() {
        this.cartBlock.innerHTML = '';
        this.cartBlock.textContent = 'Корзина пуста.';
    },


    renderCartList() {
        this.cartBlock.innerHTML = '';
        this.goods.forEach(item => {
            this.cartBlock.insertAdjacentHTML('beforeend', this.renderCartItem(item));
        });
    },

    summ() {
        let sum = 0;
        this.goods.forEach(items => {
            sum += (items.price * items.quantity);
        });
        return sum;
    },


    renderCartItem(item) {
        return `<div>
                <h3>${item.product_name}</h3>
                <p>${item.price} руб.</p>
                <p>${item.quantity} шт.</p>
                <p>Сумма товаров в корзине: ${this.summ()} руб.</p>
            </div>`;
    },
};


catalog.init('catalog', cart);
cart.init('cart', 'clr-cart');
