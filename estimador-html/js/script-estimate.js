let estComp = ''
let estType = '0';
let estComplexity = '0';
let estHours = '0';
let numComp = 0;
let numPag = 0;
const listTask = [];

const num_comp = document.getElementById('num_comp');
const num_page = document.getElementById('num_page');
const accesivility = document.getElementById('accesivility');
const browser = document.getElementById('browser');
const team_experience = document.getElementById('team_experience');
const responsive = document.getElementById('responsive');
const test = document.getElementById('test');
const repository = document.getElementById('repository');
const analytics = document.getElementById('analytics');
const totalHours = document.getElementById('totalHours');
const totalDays = document.getElementById('totalDays');
const accesivilitySelect = document.getElementById('accesivility-select');
const browserSelect = document.getElementById('browser-select');
const team_experienceSelect = document.getElementById('team_experience-select');
const responsiveSelect = document.getElementById('responsive-select');
const testInput = document.getElementById('test-input');
const repositoryInput = document.getElementById('repository-input');
const analyticsInput = document.getElementById('analytics-input');
const pageDatabase = document.querySelector('.est-page_database');
const pageIndex = document.querySelector('.est-page_index');


function initRowsTable() {
    const trBase = document.querySelector('.est-table__th-base');

    if (trBase !== null) {
        const tbody = trBase.parentElement;
        const numRows = data.num_rows;
    
        for (let index = 0; index < numRows; index++) {
            const trBaseClone = trBase.cloneNode(true);
            trBaseClone.setAttribute('data-cont', index + 1);
            trBaseClone.classList.remove('est-table__th-base');
    
            tbody.append(trBaseClone);
        }
    
        eventSelectComponent();
    }
}

function eventSelectComponent() {
    const selectComp = document.querySelectorAll('[data-id="component"]');

    for (let index = 0; index < Array.from(selectComp).length; index++) {
        const select = Array.from(selectComp)[index];

        select.addEventListener('change', changeSelectComponent);
    };
}

function changeSelectComponent(event) {
    const select = event.currentTarget;
    const selectValue = select.value;
    const selectParent = select.parentElement.parentElement;
    const row = parseInt(selectParent.getAttribute('data-cont'));
    const selectType1Act = selectParent.querySelector('[data-id="type1"]');
    const selectType2Act = selectParent.querySelector('[data-id="type2"]');
    const selectcomplexityAct = selectParent.querySelector('[data-id="complexity"]');
    const hours = selectParent.querySelector('[data-id="hours"]');
    const num_comp = document.getElementById('num_comp');
    const num_page = document.getElementById('num_page');

    selectType1Act.classList.remove('hidden');
    selectType2Act.classList.remove('hidden');
    selectcomplexityAct.classList.remove('hidden');
    selectType1Act.classList.add('hidden');
    selectType2Act.classList.add('hidden');
    selectcomplexityAct.classList.add('hidden');
    selectType1Act.value = 0;
    selectType2Act.value = 0;
    selectcomplexityAct.value = 0;
    estComp = ''
    estType = '0';
    estComplexity = '0';
    estHours = '0'
    numComp = 0;
    numPag = 0;

    switch (selectValue) {
        case '1':
            selectType1Act.classList.remove('hidden');
            estComp = 'component'
            eventSelectType(selectType1Act);

            break;
        case '2':
            selectType2Act.classList.remove('hidden');
            estComp = 'page'
            eventSelectType(selectType2Act);

            break;
    
        default:
            selectType1Act.classList.add('hidden');
            selectType2Act.classList.add('hidden');
            selectcomplexityAct.classList.add('hidden');

            break;
    }

    listTask[row - 1] = [estComp, estType, estComplexity, estHours];
    hours.innerHTML = '';

    for (let index = 0; index < listTask.length; index++) {
        const task = listTask[index];

        if (task[0] !== '') {
            if (task[0] === 'component') {
                numComp++
            } else {
                numPag++
            }
        }
    }

    num_comp.innerHTML = numComp;
    num_page.innerHTML = numPag;
}

function eventSelectType(selectTypeAct) {
    selectTypeAct.removeEventListener('change', changeSelectType);
    selectTypeAct.addEventListener('change', changeSelectType);
}

function changeSelectType(event) {
    const select = event.currentTarget;
    const selectParent = select.parentElement.parentElement;
    const row = parseInt(selectParent.getAttribute('data-cont'));
    const selectComplexityAct = selectParent.querySelector('[data-id="complexity"]');
    const selectValue = select.value;
    const hours = selectParent.querySelector('[data-id="hours"]');
    const totalHours = document.getElementById('totalHours');
    const totalDays = document.getElementById('totalDays');

    selectComplexityAct.classList.remove('hidden');

    if(selectValue !== '0' && selectValue !== '') {
        estType = selectValue;
    }

    eventSelectComplexity(selectComplexityAct)

    if(typeof listTask[row - 1] !== 'undefined') {
        estComp = listTask[row - 1][0]
        estComplexity = listTask[row - 1][2]
        estHours = data[estComp][estType][estComplexity];
    } else {
        estHours = data[estComp][estType][estComplexity];
    }

    listTask[row - 1] = [estComp, estType, estComplexity, estHours];
    hours.innerHTML = estHours;

    totalHours.parentElement.classList.remove('hidden');
    totalDays.parentElement.classList.remove('hidden');

    loadData();
}

function eventSelectComplexity(selectComplexityAct) {
    selectComplexityAct.removeEventListener('change', changeSelectComplexity);
    selectComplexityAct.addEventListener('change', changeSelectComplexity);
}

function changeSelectComplexity(event) {
    const select = event.currentTarget;
    const selectParent = select.parentElement.parentElement;
    const row = parseInt(selectParent.getAttribute('data-cont'));
    const hours = selectParent.querySelector('[data-id="hours"]');
    const selectValue = select.value;
    const totalHours = document.getElementById('totalHours');
    const totalDays = document.getElementById('totalDays');

    if(selectValue !== '0' && selectValue !== '') {
        estComplexity = selectValue;
    }

    if(typeof listTask[row - 1] !== 'undefined') {
        estComp = listTask[row - 1][0]
        estType = listTask[row - 1][1]
        estHours = data[estComp][estType][estComplexity];
    } else {
        estHours = data[estComp][estType][estComplexity];
    }

    listTask[row - 1] = [estComp, estType, estComplexity, estHours];
    hours.innerHTML = estHours;

    totalHours.parentElement.classList.remove('hidden');
    totalDays.parentElement.classList.remove('hidden');

    loadData();

}

function loadData() {
    let totalRows = 0;

    listTask.forEach(element => {
        totalRows = totalRows + parseInt(element[3]);
    });

    const accesivilityValueTot = data.accesivility[accesivilitySelect.value] * totalRows;
    const browserValueTot = data.browser[browserSelect.value] * totalRows;
    const team_experienceValueTot = data.team_experience[team_experienceSelect.value] * totalRows;
    const responsiveValueTot = data.responsive[responsiveSelect.value] * totalRows;

    const testValueTot = testInput.checked ? data.test * totalRows : 0;
    const repositoryValueTot = repositoryInput.checked ? data.repository * totalRows : 0;
    const analyticsValueTot = analyticsInput.checked ? data.analytics * totalRows : 0;
    const totalValue = totalRows;

    loadConfig()

    num_comp.innerHTML = numComp;
    num_page.innerHTML = numPag;
    accesivility.innerHTML = accesivilityValueTot.toFixed(2);
    browser.innerHTML = browserValueTot.toFixed(2);
    team_experience.innerHTML = team_experienceValueTot.toFixed(2);
    responsive.innerHTML = responsiveValueTot.toFixed(2);
    test.innerHTML = testValueTot.toFixed(2);
    repository.innerHTML = repositoryValueTot.toFixed(2);
    analytics.innerHTML = analyticsValueTot.toFixed(2);
    totalHours.innerHTML = (totalValue + 
                        accesivilityValueTot + 
                        browserValueTot + 
                        team_experienceValueTot + 
                        responsiveValueTot + 
                        testValueTot +
                        repositoryValueTot +
                        analyticsValueTot).toFixed(0);
    totalDays.innerHTML = ((totalValue + 
                        accesivilityValueTot + 
                        browserValueTot + 
                        team_experienceValueTot + 
                        responsiveValueTot + 
                        testValueTot +
                        repositoryValueTot +
                        analyticsValueTot) / 8).toFixed(0);
}

function loadConfig() {

    // const accesivilityValue = data.accesivility[accesivilitySelect.value];
    // const browserValue = data.browser[1];
    // const team_experienceValue = data.team_experience[1];
    // const responsiveValue = data.responsive[1];
    // const testValue = data.test;
    // const repositoryValue = data.repository;
    // const analyticsValue = data.analytics;

    // accesivilityInput.value = accesivilityValue.toFixed(2);
    // browserInput.value = browserValue.toFixed(2);
    // team_experienceInput.value = team_experienceValue.toFixed(2);
    // responsiveInput.value = responsiveValue.toFixed(2);
    // testInput.value = testValue.toFixed(2);
    // repositoryInput.value = repositoryValue.toFixed(2);
    // analyticsInput.value = analyticsValue.toFixed(2);
}


changeBg();
initRowsTable();
loadConfig();
