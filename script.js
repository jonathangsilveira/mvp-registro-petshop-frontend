const baseUrl = 'http://127.0.0.1:5000/api'

const buscarAgendamentosPorData = async () => {
    let dataInicio = document.getElementById('filtro-data-inicio').value;
    let dataFim = document.getElementById('filtro-data-fim').value;

    const url = `${baseUrl}/agenda_servicos?data_inicio=${dataInicio}&data_fim=${dataFim}`;
    fetch(url, {method: 'get'})
        .then((response) => {
            if (!response.ok) {
                let data = response.json()
                throw new Error(data.mensagem);
            }
            return response.json()
        })
        .then((data) => adicionarAgendamentos(data))
        .catch((error) => {
          console.error('Erro ao buscar por agendamentos:', error);
          alert("Erro ao buscar agendamentos por data!")
        });
}

const adicionarAgendamentos = (agendamentos) => {
    document.getElementById('lista-resultados').innerHTML = '';

    agendamentos.forEach(item => adicionarAgendamento(item));
}

const adicionarAgendamento = (agendamento) => {
    var itemElement = document.createElement("div")
    itemElement.id = 'item-agendamento-' + agendamento.id
    itemElement.className = 'item-agendamento'
    let itemIdElement = createItemIdElement(agendamento.id)
    var contentElement = document.createTextNode(`Cliente ${agendamento.nome_cliente} irá trazer ${agendamento.nome_pet} para fazer ${agendamento.servico_titulo}`)
    
    itemElement.appendChild(itemIdElement)
    itemElement.appendChild(contentElement)

    document.getElementById('lista-resultados').appendChild(itemElement)
}

const createItemIdElement = (value) => {
    var element = document.createElement("input");
    element.type = 'hidden';
    element.value = value;
    return element;
}

/**
 * Atribuit valores padrão para os filtros de data.
 * 
 * Valor padrão: Data atual.
 */
const iniciarFiltrosData = () => {
    let hoje = new Date();
    document.getElementById('filtro-data-inicio').valueAsDate = hoje;
    document.getElementById('filtro-data-fim').valueAsDate = hoje;
}

const selecionarOpcaoServico = () => {
    let valorServico = document.getElementById('novo-valor-servico')
    let valorServicoSelecionado = document.getElementById('servicos-agendamento').value
    valorServico.textContent = valorServicoSelecionado
}

const limparCamposNovoAgendamento = () => {
    document.getElementById('novo-data-agendamento').valueAsDate = new Date()
    document.getElementById('novo-hora-agendamento').value = ''
    document.getElementById('novo-nome-cliente').value = ''
    document.getElementById('novo-nome-pet').value = ''
    document.getElementById('novo-valor-servico').textContent = '0.00'
    document.getElementById('servicos-agendamento').value = 0
}

const carregarServicos = async () => {
    const url = `${baseUrl}/servico`;
    fetch(url, {method: 'get'})
        .then((response) => {
            if (!response.ok) {
                let data = response.json()
                throw new Error(data.mensagem);
            }
            return response.json()
        })
        .then((data) => adicionarServicos(data))
        .catch((error) => {
          console.error('Erro ao buscar por agendamentos:', error);
        });
}

const adicionarServicos = (servicos) => {
    let servicosAgendamento = document.getElementById('servicos-agendamento')
    servicosAgendamento.innerHTML = ''
    let placeholder = {
        "id" : -1,
        "preco_unitario" : 0.00,
        "titulo" : "Selecione um serviço" 
    }
    servicosAgendamento.appendChild(novaOpcaoServico(placeholder))
    servicos.forEach(servico => {
        let opcao = novaOpcaoServico(servico)
        servicosAgendamento.appendChild(opcao)
    });
}

const novaOpcaoServico = (servico) => {
    let opcao = document.createElement('option')
    opcao.text = servico.titulo
    opcao.value = servico.preco_unitario
    opcao.id = servico.id
    return opcao
}

const registrarNovoAgendamento = async () => {
    let dataAgendamento = document.getElementById('novo-data-agendamento').value
    let horaAgendamento = document.getElementById('novo-hora-agendamento').value
    let nomeCliente = document.getElementById('novo-nome-cliente').value
    let nomePet = document.getElementById('novo-nome-pet').value
    let valorServico = document.getElementById('novo-valor-servico').textContent
    let servicosAgendamento = document.getElementById('servicos-agendamento')
    let servicoSelecionado = servicosAgendamento.options[servicosAgendamento.selectedIndex]
    let servicoId = servicoSelecionado.id
    
    let form = new FormData()
    form.append('data_agendamento', `${dataAgendamento} ${horaAgendamento}:00:00`)
    form.append('nome_cliente', nomeCliente)
    form.append('nome_pet', nomePet)
    form.append('servico_id', servicoId)
    form.append('valor_servico', valorServico)

    const url = `${baseUrl}/agendamento_servico/novo`
    fetch(url, {method: 'POST', body: form})
        .then(async (response) => {
            if (!response.ok) {
                let data = await response.json()
                throw data.mensagem
            }
            alert('Serviço agendado com sucesso!')
        })
        .catch((erro) => {
            console.debug('Erro ao agendar novo serviço!\n' + erro)
            alert('Erro ao agendar novo serviço!\n' + erro)
        })
}

// Inicia os filtros  na inicialização do script.
iniciarFiltrosData()

// Carregar serviços ativos na inicialização do script.
carregarServicos()