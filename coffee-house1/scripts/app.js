document.addEventListener('DOMContentLoaded', ()  => {

    const header = document.querySelector('header');
    const navBar = document.querySelector('.navigation_bar');
    const burgerBtn = document.querySelector('.burger_btn');
    const burgerBtnBars = burgerBtn.querySelectorAll('div');
    const navLinks = navBar.querySelectorAll('a');

    burgerBtn.addEventListener('click', () => {
        navBar.classList.toggle('menu_visible');
        header.classList.toggle('header_grid');
        navLinks.forEach((navlink) => {
            navlink.classList.toggle('navigation_links_MT');
        })

        burgerBtnBars[0].classList.toggle('burger_btn1');
        burgerBtnBars[1].classList.toggle('burger_btn2'); 
        burgerBtn.classList.toggle('burger_gap');

        document.body.style.overflow = header.classList.contains('header_grid') ? 'hidden' : 'visible'; 
    })


   






























})