# TaskFlow

Aplicativo simples de lista de tarefas com filtros, categorias, prioridades, prazo (data/hora), modo claro/escuro e reordenação via drag & drop. Há duas versões no repositório:
- Raiz: versão HTML/CSS/JS pura.
- `taskflow-react/`: scaffold React criado com Create React App (ainda não integrado às features da versão pura).

## Funcionalidades (versão HTML/JS)
- Criar tarefas com categoria, prioridade, data e hora de prazo.
- Buscar, filtrar (todas/pendentes/concluídas) e marcar como concluída.
- Editar texto, prazo e prioridade.
- Reordenar tarefas por drag & drop (ordem persiste no `localStorage`).
- Modo claro/escuro persistente.

## Estrutura
```
index.html
css/style.css
js/app.js
taskflow-react/  # scaffold React (opcional)
```

## Como rodar (versão HTML/JS)
1. Clone o repositório:
   ```bash
   git clone https://github.com/sowft/TaskFlow.git
   cd TaskFlow
   ```
2. Abra `index.html` no navegador ou sirva com um servidor simples:
   ```bash
   npx serve .   # ou python -m http.server 5500
   ```

## Como rodar a versão React (opcional)
1. Entre na pasta React e instale dependências:
   ```bash
   cd taskflow-react
   npm install
   npm start
   ```
2. Abra http://localhost:3000.

## Próximos passos sugeridos
- Unificar as features da versão pura na versão React.
- Adicionar validação para prazos e ordenar por data/hora.
- Exportar/backup das tarefas (ex.: JSON).

## Licença
MIT
