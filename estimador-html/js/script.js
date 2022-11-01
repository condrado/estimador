const today = new Date();
const bodyHTML = document.querySelector('.est-body');
const estMaq = 'estimador-maqueta.html';
const estSpa = 'estimador-spa.html';
const tab1 = document.querySelector('[data-id="tab-1"]');
const tab2 = document.querySelector('[data-id="tab-2"]');
const btnMenu = document.querySelector('.esp-database');
const menu = document.querySelector('.est-menu');
const nameProyect = document.querySelector('#nameProyect');
let minutes = today.getMinutes();

function changeBg() {
    if (minutes === 0) {
        minutes = 31
    } else if (minutes > 30) {
        minutes = minutes - 30;
    } 

    bodyHTML.classList.add('est-bg__' + minutes);
}

function initTabs() {
    const url = window.location.pathname;

    tab1.classList.remove('active');
    tab2.classList.remove('active');

    if (url.indexOf(estMaq) > -1) {
        tab1.classList.add('active');
    } else  if (url.indexOf(estSpa) > -1) {
        tab2.classList.add('active');
    }
}

function initMenu() {
    btnMenu.addEventListener('click', function (event) {
        const btn = event.currentTarget;

        event.stopPropagation();
        event.preventDefault();

        btn.classList.toggle('active');
        menu.classList.toggle('active');
    })
}

function loadPageData() {
    const dataSession = localStorage.data;
    const numElements = 4;
    const id1 = 'component-html-';
    const id2 = 'component-js-';
    const id3 = 'page-home-';
    const id4 = 'page-template-';
    const id5 = 'team_experience-';
    const id6 = 'accesivility-'
    const id7 = 'responsive-'
    const id8 = 'browser-';
    const id9 = 'analytics-';
    const id10 = 'test-';
    const id11 = 'repository-';
    const id12 = 'num_rows-';

    if(typeof dataSession !== 'undefined') {
        data = JSON.parse(dataSession)
    } else {
        localStorage.setItem("data", JSON.stringify(data));
    }

    // 4 elementos
    for (let i = 0; i < numElements; i++) {
        document.getElementById(id1 + (i + 1)) !== null ? document.getElementById(id1 + (i + 1)).value = data.component.html[i + 1] : null;
        document.getElementById(id2 + (i + 1)) !== null ? document.getElementById(id2 + (i + 1)).value = data.component.js[i + 1] : null;
        document.getElementById(id3 + (i + 1)) !== null ? document.getElementById(id3 + (i + 1)).value = data.page.home[i + 1] : null;
        document.getElementById(id4 + (i + 1)) !== null ? document.getElementById(id4 + (i + 1)).value = data.page.template[i + 1] : null;
        document.getElementById(id5 + (i + 1)) !== null ? document.getElementById(id5 + (i + 1)).value = data.team_experience[i + 1] : null;
        document.getElementById(id6 + (i + 1)) !== null ? document.getElementById(id6 + (i + 1)).value = data.accesivility[i + 1] : null;
        document.getElementById(id7 + (i + 1)) !== null ? document.getElementById(id7 + (i + 1)).value = data.responsive[i + 1] : null;
        document.getElementById(id8 + (i + 1)) !== null ? document.getElementById(id8 + (i + 1)).value = data.browser[i + 1] : null;
        document.getElementById(id9 + (i + 1)) !== null ? document.getElementById(id9 + (i + 1)).value = data.analytics : null;
        document.getElementById(id10 + (i + 1)) !== null ? document.getElementById(id10 + (i + 1)).value = data.test : null;
        document.getElementById(id11 + (i + 1)) !== null ? document.getElementById(id11 + (i + 1)).value = data.repository : null;
        document.getElementById(id12 + (i + 1)) !== null ? document.getElementById(id12 + (i + 1)).value = data.num_rows : null;
    }

    eventInputData();
}

function eventInputData() {
    const inputs = document.querySelectorAll('.est-page_database input[type="text"]');

    if (inputs.length > 0) {
        inputs.forEach(input => {
            input.addEventListener('keyup', function(event) {
                const inputAct = event.target;
                const idInput = inputAct.getAttribute('id');
                const ruteValue = idInput.split('-');
                let ruteData = data;

                ruteValue.forEach((element, i) => {
                    console.log(ruteValue)
                    if (ruteValue.length > i + 1) {
                        ruteData = ruteData[element];
                    } else {
                        ruteData[element] = parseInt(inputAct.value);
                    }
                });

                localStorage.setItem("data", JSON.stringify(data));
            })
        });
    }
}

function saveDataChange() {
    const guardarArchivoDeTexto = (contenido, nombre) => {
        const a = document.createElement("a");
        const archivo = new Blob([contenido], { type: 'text/plain' });
        const url = URL.createObjectURL(archivo);
        a.href = url;
        a.download = nombre;
        a.click();
        URL.revokeObjectURL(url);
    }
    const $botonDescargar = document.querySelector("#save-data");

    $botonDescargar.onclick = () => {
        guardarArchivoDeTexto( "let data = " + JSON.stringify(data), "data-1.js");
    }
}

function loadNameProyect() {
    const name = localStorage.name;
    if (nameProyect !== null) {
        nameProyect.innerHTML = name;
    }
}

changeBg();
initTabs();
initMenu();
loadPageData();
saveDataChange();
loadNameProyect();
