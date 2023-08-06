/*========= Apps mostrar y ocultarse====*/
const headMenu = document.getElementById('head-menu'),
    headToogle = document.getElementById('head-toggle'),
    headClose = document.getElementById('head-close')
if (headToogle) {
    headToogle.addEventListener('click', () => {
        headMenu.classList.add('show-menu')
    })
} if (headClose) {
    headClose.addEventListener('click', () => {
        headMenu.classList.remove('show-menu')
    })
};


/*========= Quitar menu mobile-design ====*/

const headLink = document.querySelectorAll('.head__link')

function linkAction() {
    const headMenu = document.getElementById('head-menu')
    // When we click on each nav__link, we remove the show-menu class
    headMenu.classList.remove('show-menu')
}
headLink.forEach(n => n.addEventListener('click', linkAction));

/*========= Menú desplegable Educación ====*/

const educacionContent = document.getElementsByClassName('educacion__content'),
    educacionHead = document.querySelectorAll('.educacion__head')

function toogleEducacion() {
    let itemClass = this.parentNode.className

    for (i = 0; i < educacionContent.length; i++) {
        educacionContent[i].className = 'educacion__content educacion__close'
    }

    if (itemClass === 'educacion__content educacion__close') {
        this.parentNode.className = 'educacion__content educacion__open'
    }
};

educacionHead.forEach((el) => {
    el.addEventListener('click', toogleEducacion)
});

/*========= Activar lista desplegable experiencias adquiridas ====*/

const modalViews = document.querySelectorAll('.experiencias__modal'),
    modalBtns = document.querySelectorAll('.experiencia__btn'),
    modalCloses = document.querySelectorAll('.experiencia__modal-close')

let modal = function (modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}
modalBtns.forEach((modalBtns, i) => {
    modalBtns.addEventListener('click', () => {
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

/*========= portafolio Slider ====*/

let swiper = new Swiper('.portafolio__container ', {
    cssMode: true,
    loop: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

});


/*========= Activar formulario Contacto ====*/

const formularioDeslizable = document.getElementsByClassName('contacto__deslizable-form'),
    formularioBtn = document.querySelectorAll('.contacto__btn-desplegable')

function toogleFormulario() {
    let itemClass = this.parentNode.className

    for (i = 0; i < formularioDeslizable.length; i++) {
        formularioDeslizable[i].className = 'contacto__deslizable-form formulario__close'
    }

    if (itemClass === 'contacto__deslizable-form formulario__close') {
        this.parentNode.className = 'contacto__deslizable-form formulario__open'
    }
};

formularioBtn.forEach((el) => {
    el.addEventListener('click', toogleFormulario)
});


/*========= Validador Frmulario Contacto ====*/

const inputs = document.querySelectorAll('contact__input');

inputs.forEach(input => {
    input.addEventListener('blur', (input) => {
        valida(input.target);
    });
});


function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    if (input.validity.valid) {
        input.parentElement.classList.remove('contact__content--invalid');
        input.parentElement.querySelector('.contact_input-message-error').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-contanier--invalid');
        input.parentElement.querySelector('.contact_input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patterMismatch',

];

const mensajesDeError = {
    nombre: {
        valueMissing: 'El campo nombre no puede estar vacío',
    },
    email: {
        valueMissing: 'El campo correo no puede estar vacío',
        typeMismatch: 'El correo no es válido',
    },

    numero: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'El formato requerido es xxxxxxxxxx 10 números',
    },
    mensaje: {
        valueMissing: 'El campo nombre no puede estar vacío',
    },

};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = '';
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
};

/*========= Scroll Sections Active Link ====*/

const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.head__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.head__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*========= Cambiar background Header ====*/

function scrollHeader() {
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 200) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*========= Show Scroll Up ====*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*========= Cambiar Tema Oscuro ====*/

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-btn')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})