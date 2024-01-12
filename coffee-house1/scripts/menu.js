let selectedCategory = 'coffee';
const filters = document.querySelector('.menu_list');

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

const renderProducts = (products, productsContainer) => {

    products.forEach((product) => {
        const productCard = document.createElement('div');
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
});

