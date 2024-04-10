const baseUrl = 'http://127.0.0.1:5000/api'

const onButtonClicked = () => {
    document.getElementById('mensagem').innerHTML = 'Você clicou no botão!';
}

const onSearchButtonClicked = async () => {
    let startDate = '2024-04-01';//document.getElementById('data_inicio').value;
    let endDate = '2024-04-26';//document.getElementById('data_fim').value;

    let url = `${baseUrl}/agenda_servicos?data_inicio=${startDate}&data_fim=${endDate}`;
    fetch(url, {method: 'get'})
        .then((response) => response.json())
        .then((data) => updateScheduleList(data))
        .catch((error) => {
          console.error('Error on fetch for schedule:', error);
        });
}

const updateScheduleList = (schedules) => {
    document.getElementById('scheduleList').innerHTML = '';

    schedules.forEach(item => addSchedule(item));
}

const addSchedule = (schedule) => {
    var itemElement = document.createElement("div");
    itemElement.id = 'scheduleItem'
    let itemIdElement = createItemIdElement(schedule.id);
    var contentElement = document.createTextNode(`Cliente ${schedule.nome_cliente} irá trazer ${schedule.nome_pet} para fazer ${schedule.servico_titulo}`);
    
    itemElement.appendChild(itemIdElement)
    itemElement.appendChild(contentElement)

    document.getElementById('scheduleList').appendChild(itemElement)
}

const createItemIdElement = (value) => {
    var element = document.createElement("input");
    element.type = 'hidden';
    element.value = value;
    return element;
}