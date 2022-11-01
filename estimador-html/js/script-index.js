function loadProyects() {
    const liBase = document.querySelector('.est-li-base');
    const liNews = document.querySelectorAll('.est-li-new');
    const liBaseParent = liBase.parentElement;
    const dataSession = localStorage.data;

    if (liNews.length > 0) {
        liNews.forEach(liNew => {
            liNew.remove();
        });
    }

    if(typeof dataSession !== 'undefined') {
        data = JSON.parse(dataSession)
    }

    data.proyects.forEach((proyect, index) => {
        const liBaseClone = liBase.cloneNode(true);
        liBaseClone.setAttribute('data-id', proyect.replaceAll(' ', '_'));
        liBaseClone.querySelector('.ets-btn-remove').setAttribute('data-pos', index);
        liBaseClone.querySelector('.ets-btn-edit').setAttribute('data-pos', index);
        liBaseClone.classList.remove('est-li-base');
        liBaseClone.classList.add('est-li-new');
        liBaseClone.querySelector('.est-title').innerHTML = proyect;
    
        liBaseParent.append(liBaseClone);
    });

    removeEstimate();
}

function newEstimate() {
    const newEstiBtn = document.getElementById('new-estimate-btn');
    const newEstiInput = document.getElementById('new-estimate-input');

    newEstiBtn.addEventListener('click', function (event) {
        const dataSession = localStorage.data;
        let existe = false;
        const url = window.location.href;
        const urlNew = url.replace('estimador.html', 'estimador-maqueta.html')

        if(typeof dataSession !== 'undefined') {
            data = JSON.parse(dataSession)
        }

        data.proyects.forEach(proyect => {
            if (proyect === newEstiInput.value) {
                existe = true;
            }
        });

        if(existe) {
            alert('Ya existe una estiamción con ese nombre')
        } else {
            data.proyects.push(newEstiInput.value);

            localStorage.setItem("data", JSON.stringify(data));
            localStorage.setItem("name", newEstiInput.value);

            loadProyects();
            window.location.href = urlNew;
        }
    });
}

function removeEstimate() {
    const removeEle = document.querySelectorAll('.ets-btn-remove');

    removeEle.forEach(btn => {
        btn.addEventListener('click', function (event) {
            const btnAct = event.currentTarget;
            const pos = parseInt(btnAct.getAttribute('data-pos'));
            data.proyects.splice(pos, 1);

            localStorage.setItem("data", JSON.stringify(data));

            loadProyects();
        })
    });
    

}

loadProyects();
newEstimate();
