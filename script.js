const baseUrl = 'http://127.0.0.1:5000/api'

const onButtonClicked = () => {
    document.getElementById('mensagem').innerHTML = 'Você clicou no botão!';
}

const onSearchButtonClicked = async () => {
    let startDate = document.getElementById('filter-start-date').value;
    let endDate = document.getElementById('filter-end-date').value;

    let url = `${baseUrl}/agenda_servicos?data_inicio=${startDate}&data_fim=${endDate}`;
    fetch(url, {method: 'get'})
        .then((response) => response.json())
        .then((data) => updateScheduleList(data))
        .catch((error) => {
          console.error('Error on fetch for schedule:', error);
        });
}

const updateScheduleList = (schedules) => {
    document.getElementById('schedule-list').innerHTML = '';

    schedules.forEach(item => addSchedule(item));
}

const addSchedule = (schedule) => {
    var itemElement = document.createElement("div")
    itemElement.id = 'scheduleItem'
    itemElement.className = 'schedule-item'
    let itemIdElement = createItemIdElement(schedule.id)
    var contentElement = document.createTextNode(`Cliente ${schedule.nome_cliente} irá trazer ${schedule.nome_pet} para fazer ${schedule.servico_titulo}`)
    
    itemElement.appendChild(itemIdElement)
    itemElement.appendChild(contentElement)

    document.getElementById('schedule-list').appendChild(itemElement)
}

const createItemIdElement = (value) => {
    var element = document.createElement("input");
    element.type = 'hidden';
    element.value = value;
    return element;
}

const initDateFilters = () => {
    let today = new Date()
    var startDateElement = document.getElementById('filter-start-date')
    var endDateElement = document.getElementById('filter-end-date')
    startDateElement.valueAsDate = today
    endDateElement.valueAsDate = today
}

initDateFilters()