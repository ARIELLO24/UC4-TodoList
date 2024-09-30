class Tarefa {
    descricao: string
    prioridade: string// agora é obrigatório
    status: 'pendente' | 'concluída'

    constructor(descricao: string, prioridade: string) {
        this.descricao = descricao
        this.prioridade = prioridade// deve ser fornecido ao criar a tarefa
        this.status = 'pendente'
    }

    marcarConcluida() {
        this.status = 'concluída'
    }

    toString(): string {
        return `[${this.status === 'concluída' ? 'X' : ' '}] ${this.descricao} (Prioridade: ${this.prioridade})`
    }
}

class FilaDeTarefas {
    tarefas: Tarefa[]

    constructor() {
        this.tarefas = []
    }

    adicionarTarefa(tarefa: Tarefa) {
        this.tarefas.push(tarefa)
    }

    removerTarefa(index: number): Tarefa | null {
        if (index >= 0 && index < this.tarefas.length) {
            return this.tarefas.splice(index, 1)[0]; // Remove a tarefa pelo índice
        }
        return null
    }

    listarTarefas() {
        if (this.tarefas.length === 0) {
            console.log("Nenhuma tarefa na lista.")
        } else {
            this.tarefas.forEach((tarefa, index) => {
                console.log(`${index + 1}. ${tarefa.toString()}`)// Exibe a tarefa corretamente
            });
        }
    }

    tarefaPronta() {
        if (this.tarefas.length > 0) {
            this.tarefas[0].marcarConcluida()
            console.log(`Tarefa concluída: ${this.tarefas[0].toString()}`)
        } else {
            console.log("Não há tarefas para marcar como concluídas.")
        }
    }
}

function menu() {
    const fila = new FilaDeTarefas()

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const showMenu = () => {
        console.log("\n--------Fila de Tarefas---------")
        console.log("1.       Adicionar tarefa         ")
        console.log("2.        Remover tarefa          ")
        console.log("3.        Listar tarefas          ")
        console.log("4.    Marcar tarefa como concluída")
        console.log("5.              Sair              ")
        console.log("----------------------------------")
        
        readline.question("Escolha uma opção: ", (opcao: string) => {
            switch (opcao) {
                case '1':
                    console.clear()
                    readline.question("Digite a descrição da tarefa: ", (descricao: string) => {
                        readline.question("Digite a prioridade da tarefa: ", (prioridade: string) => {
                            const tarefa = new Tarefa(descricao, prioridade)// Prioridade agora é obrigatória
                            fila.adicionarTarefa(tarefa);
                            console.log("Tarefa adicionada com sucesso!")
                            console.clear()
                            showMenu()
                        })
                    })
                    break

                case '2':
                    fila.listarTarefas(); // Exibe as tarefas antes de remover
                    readline.question("Digite o número da tarefa que deseja remover: ", (input: string) => {
                        const index = parseInt(input) - 1 // Converte a entrada do usuário para índice
                        const tarefaRemovida = fila.removerTarefa(index)
                        if (tarefaRemovida) {
                            console.log(`Tarefa removida: ${tarefaRemovida.toString()}`)
                        } else {
                            console.log("Tarefa não encontrada.")
                        }
                        showMenu()
                    })
                    break

                case '3':
                    console.clear()
                    console.log("Lista de tarefas:")
                    fila.listarTarefas()
                    showMenu()
                    break

                case '4':
                    fila.tarefaPronta()
                    showMenu()
                    break

                case '5':
                    console.clear()
                    console.log("Saindo...")
                    readline.close()
                    break

                default:
                    console.log("Opção inválida, tente novamente.")
                    showMenu()
                    break
            }
        })
    }

    showMenu()
}

menu()
