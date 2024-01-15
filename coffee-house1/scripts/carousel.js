document.addEventListener('DOMContentLoaded', () => {
    const carouselProducts = [
        {
            id: 0,
            imageSource: './assets/coffee-slider-1.png',
            title: 'S’mores Frappuccino',
            description: 'This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.',
            price: '$5.50'
        },
        {
            id: 1,
            imageSource: './assets/coffee-slider-2.png',
            title: 'Caramel Macchiato',
            description: 'Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.',
            price: '$5.00 '
        },
        {
            id: 2,
            imageSource: './assets/coffee-slider-3.png',
            title: 'Ice coffee',
            description: 'A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.',
            price: '$4.50'
        }
    ];
        
    // Accessing carousel product image
    const carouselProductImage = document.querySelector('.carousel-product-image');
    const carouselProductTitle = document.querySelector('.slider_title');
    const carouselProductDescription = document.querySelector('.slider_description');
    const carouselProductPrice = document.querySelector('.price');
    
    // Accessing carousel arrows
    const arrowLeft = document.querySelector('.left_arrow');
    const arrowRight = document.querySelector('.rigth_arrow')
    
    let activeIndex = 0;
    
    const handleCarouselDotsChange = (newActiveIndex) => {
        const carouselDots = document.querySelectorAll('.mark');
    
        carouselDots.forEach((carouselDot, index) => {
            if(!carouselDot.classList.contains('activeMark') && newActiveIndex === index) {
                carouselDot.classList.add('activeMark');
            } else {
                if(newActiveIndex !== index) {
                    carouselDot.classList.remove('activeMark');
                }
            }
        });
    };
    
    const renderCarouselProduct = (productIndex) => {
        carouselProductImage.src = carouselProducts[productIndex].imageSource;
        carouselProductTitle.innerText = carouselProducts[productIndex].title;
        carouselProductDescription.innerText = carouselProducts[productIndex].description;
        carouselProductPrice.innerText = carouselProducts[productIndex].price; 
    };
    
    const changeCarouselProduct = (direction = 'right', productIndex = undefined) => {
        if(productIndex) {
            activeIndex = productIndex;
        } else {
            activeIndex = 
                direction === 'right' ? activeIndex < carouselProducts.length - 1 ? activeIndex + 1 : 0
                : activeIndex > 0 ? activeIndex - 1 : carouselProducts.length - 1;
        }
    
        renderCarouselProduct(activeIndex);
        handleCarouselDotsChange(activeIndex);
    };
    
    
    
    
    
        const marks = document.querySelectorAll('.mark');
    
    
    
        marks.forEach((mark, index) => {
    
            if(carouselProducts.id === 0) {
                mark.classList.add('active');
            };
    
            mark.addEventListener('click', () => {
                // activeIndex = carouselProduct.id;
    
                changeCarouselProduct(undefined, index);
    
            });
    
        });
    
        setInterval(() => changeCarouselProduct(), 5000);
    
        arrowLeft.addEventListener('click', () => changeCarouselProduct('left'));
        arrowRight.addEventListener('click', () => changeCarouselProduct('right'));
});
