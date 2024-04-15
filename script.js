const baseUrl = 'http://127.0.0.1:5000/api'

/**
 * Busca os agendamentos registrados no período informado nos filtros.
 */
const buscarAgendamentosPorData = async () => {
    let dataInicio = document.getElementById('filtro-data-inicio').value;
    let dataFim = document.getElementById('filtro-data-fim').value;

    const url = `${baseUrl}/agenda_servicos?data_inicio=${dataInicio}&data_fim=${dataFim}`;
    fetch(url, {method: 'get'})
        .then(async (response) => {
            if (!response.ok) {
                let data = await response.json()
                throw data.mensagem
            }
            return response.json()
        })
        .then((data) => adicionarAgendamentos(data))
        .catch((error) => {
          console.error('Erro ao buscar por agendamentos:', error);
          alert("Erro ao buscar agendamentos por data!")
        });
}

/**
 * Atualiza a listagem de agendamentos na página.
 * 
 * @param {JSON} agendamentos 
 */
const adicionarAgendamentos = (agendamentos) => {
    let tabela = document.getElementById('lista-resultados')
    tabela.innerHTML = ''

    adicionarCabecalhoTabela(tabela)

    agendamentos.forEach(item => adicionarAgendamento(tabela, item));
}

/**
 * Adiciona linha na tabela de resultados com as informações do agendamento.
 * 
 * @param {HTMLTableElement} tabela 
 * @param {JSON} agendamento 
 */
const adicionarAgendamento = (tabela, agendamento) => {
    let linha = tabela.insertRow()
    let colunas = [
        formatarDataHora(agendamento.data_agendamento), 
        agendamento.servico_titulo,
        `${agendamento.nome_cliente} / ${agendamento.nome_pet}`,
        `R$ ${agendamento.valor_servico}`,
        agendamento.cancelado ? 'Sim' : 'Não'
    ]
    colunas.forEach((coluna) => {
        let celula = linha.insertCell()
        celula.textContent = coluna;
    })
    let celulaAcoes = linha.insertCell()
    if (!agendamento.cancelado) {
        let botaoCancelar = criarBotaoCancelarAgendamento()
        botaoCancelar.onclick = function () {
            cancelarAgendamento(agendamento.id);
        }
        celulaAcoes.appendChild(botaoCancelar)
    }
    let botaoExcluir = criarBotaoExcluirAgendamento()
    botaoExcluir.onclick = function () {
        excluirAgendamento(agendamento.id);
    }
    celulaAcoes.appendChild(botaoExcluir)
}

const criarBotaoExcluirAgendamento = () => {
    let botao = document.createElement("button")
    botao.className = 'botao-icone'
    let img = document.createElement("i")
    img.className = 'bi bi-trash'
    botao.appendChild(img)
    return botao;
}

const criarBotaoCancelarAgendamento = () => {
    let botao = document.createElement("button")
    botao.className = 'botao-icone'
    let img = document.createElement("i")
    img.className = 'bi bi-calendar-x'
    botao.appendChild(img)
    return botao;
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

/**
 * Ao selecionar uma opção de servicço, atualiza o valor do serviço agendado.
 * 
 */
const selecionarOpcaoServico = () => {
    let valorServico = document.getElementById('novo-valor-servico')
    let valorServicoSelecionado = document.getElementById('servicos-agendamento').value
    valorServico.textContent = valorServicoSelecionado
}

/**
 * Limpa os valores dos campos de registro de agendamento.
 * 
 */
const limparCamposNovoAgendamento = () => {
    document.getElementById('novo-data-agendamento').valueAsDate = new Date()
    document.getElementById('novo-hora-agendamento').value = ''
    document.getElementById('novo-nome-cliente').value = ''
    document.getElementById('novo-nome-pet').value = ''
    document.getElementById('novo-valor-servico').textContent = '0.00'
    document.getElementById('servicos-agendamento').value = 0
}

/**
 * Carrega os serviços ativos na base para exibir na página.
 * 
 */
const carregarServicos = async () => {
    const url = `${baseUrl}/servico`;
    fetch(url, {method: 'get'})
        .then(async (response) => {
            if (!response.ok) {
                let data = await response.json()
                throw data.mensagem;
            }
            return response.json()
        })
        .then((data) => adicionarServicos(data))
        .catch((error) => {
          console.error('Erro ao buscar por agendamentos:', error);
        });
}

/**
 * Adiciona as opções de serviços no seletor de serviços.
 * 
 */
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

/**
 * Adiciona uma opção no seletor de serviços.
 * 
 */
const novaOpcaoServico = (servico) => {
    let opcao = document.createElement('option')
    opcao.text = servico.titulo
    opcao.value = servico.preco_unitario
    opcao.id = servico.id
    return opcao
}

/**
 * Registra um novo agendamento na base de dados.
 * 
 */
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
            buscarAgendamentosPorData()
            alert('Serviço agendado com sucesso!')
        })
        .catch((erro) => {
            console.debug('Erro ao agendar novo serviço!\n' + erro)
            alert('Erro ao agendar novo serviço!\n' + erro)
        })
}

/**
 * Exclui um agendamento na base e atualiza a listagem.
 * 
 */
const excluirAgendamento = (id) => {
    const url = `${baseUrl}/agendamento_servico?id=${id}`
    fetch(url, {method: 'DELETE'})
        .then(async (response) => {
            if (!response.ok) {
                let data = await response.json()
                throw data.mensagem
            }
            buscarAgendamentosPorData()
            alert('Agendamento excluído com sucesso!')
        })
        .catch((erro) => {
            console.debug('Erro ao excluir agendamento de serviço!\n' + erro)
            alert('Erro ao excluir agendamento de serviço!\n' + erro)
        })
}

/**
 * Cancelar um agendamento na base e atualiza a listagem.
 * 
 */
const cancelarAgendamento = (id) => {
    const alerta = 'Cancelamento do serviço não irá liberar o horário para nova marcação.'
    const confirmacao = 'Tem certeza que deseja prosseguir?'
    if (confirm(`${alerta}\n${confirmacao}`)) {
        const url = `${baseUrl}/agendamento_servico/cancelar?id=${id}`
        fetch(url, {method: 'POST'})
            .then(async (response) => {
                if (!response.ok) {
                    let data = await response.json()
                    throw data.mensagem
                }
                buscarAgendamentosPorData()
                alert('Agendamento cancelado com sucesso!')
            })
            .catch((erro) => {
                console.debug('Erro ao cancelar agendamento de serviço!\n' + erro)
                alert('Erro ao cancelar agendamento de serviço!\n' + erro)
            })
    }
}

/**
 * Formata a string para exibir o registro.
 * 
 * @param {String} textDataHora: Data e hora formato string. 
 * @returns String formatada dd/mm/aaaa HH.
 */
const formatarDataHora = (textDataHora) => {
    let dataHora = new Date(textDataHora)
    const dia = dataHora.getDate()
    const mes = dataHora.getMonth() + 1
    const ano = dataHora.getFullYear()
    const hora = dataHora.getHours()
    return `${dia}/${mes}/${ano} ${hora}H`
}


const adicionarCabecalhoTabela = (tabela) => {
    let titulos = [
        'Data/Hora',
        'Serviço',
        'Cliente / Pet',
        'Valor',
        'Cancelado',
        'Ações'
    ]
    
    let cabecalho = tabela.createTHead()
    let linha = cabecalho.insertRow()
    titulos.forEach((titulo) => {
        let celula = document.createElement('th')
        celula.innerHTML = titulo;
        linha.appendChild(celula)
    })
}

// Inicia os filtros  na inicialização do script.
iniciarFiltrosData()

// Carregar agendamentos para o dia atual
buscarAgendamentosPorData()

// Carregar serviços ativos na inicialização do script.
carregarServicos()