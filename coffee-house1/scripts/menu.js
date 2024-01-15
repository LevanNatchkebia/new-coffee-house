let selectedCategory = 'coffee';
const filters = document.querySelector('.menu_list');
const loadMoreButton = document.querySelector('.load-more');

const resetProductsSection = (node) => {
    while(node.firstChild) {
        node.removeChild(node.lastChild);
    }
};

const getProducts = async () => {
    const products = await fetch('../data/products.json');
    const productsJson = await products.json();
    return productsJson;
};

const handleProductModalOpen = (product) => {
    const modalWrapper = document.querySelector('.modal_wrapper');
    modalWrapper.style.display = 'block';
    
    const productImage = modalWrapper.querySelector('.product_modal_image');
    const productTitle = modalWrapper.querySelector('.product_title');
    const productDescription = modalWrapper.querySelector('.product_description');
    const productSizes = modalWrapper.querySelectorAll('.product_size');
    const productAdditives = modalWrapper.querySelectorAll('.additive');
    const totalPrice = document.querySelector('.total_price')

    const modalCloseButton = modalWrapper.querySelector('.close_modal_button');
    modalCloseButton.addEventListener('click', () => {
        modalWrapper.style.display = 'none';
    });
};

const renderProducts = (products, productsContainer) => {

    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = `product_card ${index > 3 ? 'hidden' : ''}`
        productCard.classList.add('product_card');

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('img_div');

        const productImage = document.createElement('img');
        productImage.src = product.image;

        imageDiv.appendChild(productImage);
        productCard.appendChild(imageDiv);

        const productDescriptionContainer = document.createElement('div');
        productDescriptionContainer.classList.add('coffee_description');

        const productName = document.createElement('h4');
        productName.innerText = product.name;

        const productDescription = document.createElement('p');
        productDescription.innerText = product.description;

        const productPrice = document.createElement('span');
        productPrice.innerText = `$${product.price}`;

        productDescriptionContainer.appendChild(productName);
        productDescriptionContainer.appendChild(productDescription);

        productCard.appendChild(productDescriptionContainer);
        productCard.appendChild(productPrice);

        productsContainer.appendChild(productCard);

        productCard.addEventListener('click', () => handleProductModalOpen(product));

    });
};

document.addEventListener('DOMContentLoaded', async () => {
    let products = await getProducts();
    let productsToRender = products.filter((product) => product.category === selectedCategory);
    const productsSection = document.querySelector('.products');

    renderProducts(productsToRender, productsSection);

    filters.querySelectorAll('li').forEach((filter) => {
        filter.addEventListener('click', () => {
            const filterValue = filter.innerText.split('').slice(2).join('').trim().toLowerCase();
            selectedCategory = filterValue;

            productsToRender = products.filter((product) => product.category === selectedCategory);

            resetProductsSection(productsSection);
            renderProducts(productsToRender, productsSection);
            
            filters.querySelectorAll('li').forEach((productFilter) => {
                const filterText = productFilter.innerText.split('').slice(2).join('').trim().toLowerCase();
                if(filterText !== selectedCategory) {
                    productFilter.classList.remove('selected')
                } else {
                    productFilter.classList.add('selected')
                }
            });
        });
    });

    loadMoreButton.addEventListener('click', () => {
        const productCards = document.querySelectorAll('.product_card');
        const cardsToShow = [].slice.call(productCards, 4);

        cardsToShow.forEach((card) => {
            card.classList.toggle('hidden');
        });
    });
});

