//software.js — Guilherme Serafim Kollet — 29/02/2022

//exibe no console os resultados
var showConsole = true;

let inputSearch = document.querySelector('.consultar-input');

//declaração de objetos: estrutura de exibição ao usuário
let tableName = document.querySelector('#consulta-table-name');
let tableEAN = document.querySelector('#consulta-table-ean');
let tableReport = document.querySelector('#consulta-table-report');
let resultsTable = document.querySelector('#consulta-response');

//declaração de objetos: estrutura dos botões do usuário
let consultarButton = document.querySelector('#consultar-button');
let consultarRelatorio = document.querySelector('#consultar-relatorio');
var buttonImport = document.getElementById('consultar-import');

//declaração de vetores: armazenamento dos produtos do .CSV
var ProdutosCSV = new Array;
var ProdutosComercializados2020CSV = new Array;

//declaração de cabeçalho
var dataHeader = new Array; 

//declaração de variável quantificadora de erro à leitura do .CSV
var errorResults = 0;

//funções de comunicação ao usuário
function uxOutputDone(){

    document.getElementById('Output').classList.add("done");
    document.getElementById('Output').textContent = "Dados carregados!";
    setTimeout(function(){
 
        //oculta a exibição após 5000ms
        document.getElementById('Output').classList.replace("done","remove");
    
    },5000);
 
}

function uxOutputError(){

    document.getElementById('Output').classList.add("error");
    document.getElementById('Output').textContent = "Erro no carregamento dos dados!";
    setTimeout(function(){
 
        //oculta a exibição após 5000ms
        document.getElementById('Output').classList.replace("error","remove");
    
    },5000);
 
}

function uxResultError(){

    document.getElementById('Output').classList.add("error");
    document.getElementById('Output').textContent = "Sem resultados";
    setTimeout(function(){
 
        //oculta a exibição após 5000ms
        document.getElementById('Output').classList.replace("error","remove");
    
    },5000);
 
}

//funções controladoras de desativação dos botões
function disableButtonImport(){
    buttonImport.disabled = true;
    buttonImport.classList.remove("attention_import");
    buttonImport.textContent = "Importado";
}

function disableButtonBuscar(){
    consultarButton.disabled = true;
}

function disableButtonRelatorio(){
    consultarRelatorio.disabled = false;
}

//funções controladoras de ativação dos botões
function enableButtonImport(){
    buttonImport.disabled = false;
    buttonImport.classList.add("attention_import");
    buttonImport.textContent = "Importar";
}

function enableButtonBuscar(){
    consultarButton.disabled = false;
}

function enableButtonRelatorio(){
    consultarRelatorio.disabled = false;
}

//funções de controla da tabela de exibição ao usuário
function disableTable(){
    tableName.classList.add("disabled");
    tableEAN.classList.add("disabled");
    tableReport.classList.add("disabled");
}

function enableTableName(){
    tableName.classList.remove('disabled');
}

function enabledTableEAN(){
    tableEAN.classList.remove("disabled");
}

function enabledTableReport(){
    tableReport.classList.remove("disabled");
}

function disableLinesTable(){
    let lineTopTable = document.querySelector('#line-top-table');
    let lineBottomTable = document.querySelector('#line-bottom-table');

    lineTopTable.classList.add("disabled");
    lineBottomTable.classList.add("disabled");
}

function enableLinesTable(){
    let lineTopTable = document.querySelector('#line-top-table');
    let lineBottomTable = document.querySelector('#line-bottom-table');

    lineTopTable.classList.remove("disabled");
    lineBottomTable.classList.remove("disabled");
}

function outputTableReport(dataReport){
    resultsTable.classList.remove("disabled");
    let text = "Exibindo Relatório de concessão de crédito tributário (PIS/COFINS) | " + "Emissão: " + dataReport;
    resultsTable.textContent = text;
}

function outputTable(results, obj){
    resultsTable.classList.remove("disabled");

    let text = "";
    text += "Exibindo " + results + " de " + obj.length;
    if(results == 1) text += " resultado";
    if(results > 1) text += " resultados";
    resultsTable.textContent = text;

}

//função de reset da tabela de exibição
function resetTable(){
    resultsTable.classList.add("disabled");

    disableLinesTable();
    disableTable();
 
    let trsNome = document.querySelector('#consulta-content-name');
    let trsEAN = document.querySelector('#consulta-content-ean');
    let trsReport = document.querySelector('#consulta-content-report')
    trsNome.innerHTML = '';
    trsEAN.innerHTML = '';
    trsReport.innerHTML = '';

}

//função central de exibição à tabela do usuário
function createTable(obj){
    enableLinesTable(); 
    let results = 0;    

    //montadora de tabela para busca pelo nome
    if(obj[0].length == 4){
        enableTableName();

        for(let i=0; i<obj.length; i++){
                
            let tBodyName = document.querySelector('#consulta-content-name');

            let trProduto = document.createElement("tr");
            trProduto.classList.add("row-td");

            let tdNome = document.createElement("td");
            tdNome.classList.add("row-td--nome");
            tdNome.textContent = obj[i][0];
                
            let tdProduto = document.createElement("td");
            tdProduto.classList.add("row-td--produto");
            tdProduto.textContent = obj[i][1];

            let tdApresentacao = document.createElement("td");
            tdApresentacao.classList.add("row-td--apresentacao");
            tdApresentacao.textContent = obj[i][2];

            let tdPF = document.createElement("td");
            tdPF.classList.add("row-td--pf");
            let tdPFContent = obj[i][3];
            tdPFContent = tdPFContent.replace(",",".");
            tdPF.textContent = parseFloat(tdPFContent).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

            trProduto.appendChild(tdNome);
            trProduto.appendChild(tdProduto);
            trProduto.appendChild(tdApresentacao);
            trProduto.appendChild(tdPF);
            tBodyName.appendChild(trProduto);
            results++;
            if(i==9) break;
        }
        outputTable(results, obj);

    }
    //montadora de tabela para busca pelo código de barras 
    else if(obj[0].length == 6){
        enabledTableEAN();

        for(let i=0; i<obj.length; i++){
                
            let tBodyEAN = document.querySelector('#consulta-content-ean');

            let trProduto = document.createElement("tr");
            trProduto.classList.add("row-td");

            let tdEAN = document.createElement("td");
            tdEAN.classList.add("row-td--ean");
            tdEAN.textContent = obj[i][0];

            let tdProduto = document.createElement("td");
            tdProduto.classList.add("row-td--produto");
            tdProduto.textContent = obj[i][1];
                
            let tdPF = document.createElement("td");
            tdPF.classList.add("row-td--pf");
            let tdPFContent = obj[i][2];
            tdPFContent = tdPFContent.replace(",",".");
            tdPF.textContent = parseFloat(tdPFContent).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

            let tdPrecoMax = document.createElement("td");
            tdPrecoMax.classList.add("row-td--precomax");
            let tdPrecoMaxContent = obj[i][3];
            tdPrecoMaxContent = tdPrecoMaxContent.replace(",",".");
            tdPrecoMax.textContent = parseFloat(tdPrecoMaxContent).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

            let tdPrecoMin = document.createElement("td");
            tdPrecoMin.classList.add("row-td--precomin");
            let tdPrecoMinContent = obj[i][4];
            tdPrecoMinContent = tdPrecoMinContent.replace(",",".");
            tdPrecoMin.textContent = parseFloat(tdPrecoMinContent).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

            let tdPrecoDif = document.createElement("td");
            tdPrecoDif.classList.add("row-td--precodif");
            let tdPrecoDifContent = obj[i][5];
            tdPrecoDifContent = tdPrecoDifContent.replace(",",".");
            tdPrecoDif.textContent = parseFloat(tdPrecoDifContent).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

            trProduto.appendChild(tdEAN);
            trProduto.appendChild(tdProduto);
            trProduto.appendChild(tdPF);
            trProduto.appendChild(tdPrecoMax);
            trProduto.appendChild(tdPrecoMin);
            trProduto.appendChild(tdPrecoDif);
            tBodyEAN.appendChild(trProduto);
            results++;
            if(i==9) break;
        }
        outputTable(results, obj);

    }
    //montadora de tabela para geração do relatório
    else if(Object.entries(obj[0])[0][0] == "report"){
        enabledTableReport();
            
        for(let i=0; i<obj.length; i++){

            let tBodyReport = document.querySelector('#consulta-content-report');

            let trReport = document.createElement("tr");
            trReport.classList.add("row-td");

            let tdClassificacao = document.createElement("td");
            tdClassificacao.classList.add("row-td--classificacao");
            tdClassificacao.textContent = Object.entries(obj[2])[i][0];

            let tdPercentual = document.createElement("td");
            tdPercentual.classList.add("row-td--percentual");
            tdPercentual.textContent = Object.entries(obj[2])[i][1];

            let tdGraphic = document.createElement("td");
            tdGraphic.classList.add("row-td--graphic");
            tdGraphic.textContent = Object.entries(obj[3])[i][1];
                
            trReport.appendChild(tdClassificacao);
            trReport.appendChild(tdPercentual);
            trReport.appendChild(tdGraphic);
            tBodyReport.appendChild(trReport);
            
        }
        let dataReport = Object.entries(obj[0])[1][1];
        outputTableReport(dataReport);
    }

}

//função de pesquisa por nome
function search(str){
    if(str == "") return;

    //declaração de variáveis da função
    let expression = new RegExp(str,"i");
    let resultadoSearch = new Array;
    let statusFind = false;

    //laço de repetição que verifica a entrada com a base de dados
    for(let i=0; i<ProdutosComercializados2020CSV.length; i++){

        //validador regExp
        if(expression.test(ProdutosComercializados2020CSV[i][8])){
            
            let text = "";
            text += ProdutosComercializados2020CSV[i][0] + ";";
            text += ProdutosComercializados2020CSV[i][8] + ";";
            text += ProdutosComercializados2020CSV[i][9] + ";";
            text += ProdutosComercializados2020CSV[i][13];

            resultadoSearch.push(text.split(";"));

            statusFind = true;
        }
    }

    if(statusFind) {
        if(showConsole) console.log(resultadoSearch);
        createTable(resultadoSearch);

    } else {
        uxResultError();

    }

}

//função de consulta por código de barras EAN-1, EAN-2, EAN-3
function searchEAN(str){
    if(str == "") return;

    //declaração de variáveis da função
    let resultadoSearch = new Array;
    let PmcAlto = 0.0;
    let PmcBaixo = 0.0;
    let PmcDiferenca = 0.0;
    let statusFind = false;
    let text = "";

    //laço de repetição que verifica a entrada com a base de dados
    for(let i=0; i<ProdutosCSV.length; i++){

        //condição de existência — validador de entrada
        if(str == ProdutosCSV[i][5] || str == ProdutosCSV[i][6] || str == ProdutosCSV[i][7]){
            PmcBaixo = ProdutosCSV[i][23];
            PmcBaixo = PmcBaixo.replace(",",".");
            PmcBaixo = parseFloat(PmcBaixo);

            PmcAlto = ProdutosCSV[i][31];
            PmcAlto = PmcAlto.replace(",",".");
            PmcAlto = parseFloat(PmcAlto);

            PmcDiferenca = parseFloat(PmcAlto) - parseFloat(PmcBaixo);
            
            text += ProdutosCSV[i][5] + ";";
            text += ProdutosCSV[i][8] + ";";
            text += ProdutosCSV[i][13] + ";";

            if(PmcAlto == ""){
                text += 0.0 + ";";
            } else {
                text += ProdutosCSV[i][31] + ";";
            }

            if(PmcBaixo == ""){
                text += 0.0 + ";";
            } else {
                text += ProdutosCSV[i][23] + ";";
            }
            
            if(isNaN(PmcDiferenca)){
                text += 0.0;
            } else {
                text += PmcDiferenca.toFixed(2);
            }
            
            resultadoSearch.push(text.split(";"));
            
            statusFind = true;

        }
    
    }

    //condição de existência — monta tabela ou informa erro
    if(statusFind){
        if(showConsole) console.log(resultadoSearch);
        createTable(resultadoSearch);

    } else {
        uxResultError();
        
    }
    
}

//função de leitura inicial e detecção de informações
function readData(data){ 
 
    //declaração de variável local que armazena um array de dados da quebra de linha
    let dataArray = data.split('\r\n');

    dataHeader = dataArray[0].split(';');

    //laço de repetição para gravação do vetor de produtos
    for(let i=1; i < dataArray.length; i++){

        //construção da posição da apresentação
        let dataApresentacao = dataArray[i].split("\"");
        
        if(dataApresentacao.length == 1){
            ProdutosCSV.push(dataApresentacao[0].split(';'));

        } else if(dataApresentacao.length == 3){

            //substituir todos os pontos e vírgulas da apresentação por espaço
            dataApresentacao[1] = dataApresentacao[1].replaceAll(";"," ");

            dataApresentacao[2] = dataApresentacao[2].split(';');

            if(dataApresentacao[2].length != 40){
                
                dataApresentacao[0] = dataApresentacao[0].split(';');
                dataApresentacao[0][9] = dataApresentacao[1];
                dataApresentacao.splice(1, 1);
                dataApresentacao[1].shift();
                
                for(let i=0; i < dataApresentacao[1].length; i++){
                    dataApresentacao[0].push(dataApresentacao[1][i]);
                }

                dataApresentacao.pop();

            } else {
                dataApresentacao.splice(0, 1);
                dataApresentacao[1][0] = dataApresentacao[0];
                dataApresentacao.splice(0, 1);
                
            }

            ProdutosCSV.push(dataApresentacao[0]);

        }  else if(dataApresentacao.length == 5) {

            //remoção da posição vazia do vetor
            dataApresentacao.splice(0, 1);

            //substituir todos os pontos e vírgulas da apresentação por espaço
            dataApresentacao[0] = dataApresentacao[0].replaceAll(";"," ");
            dataApresentacao[1] = dataApresentacao[1].split(';');
            dataApresentacao[1][0] = dataApresentacao[0];

            //remoção da posição vazia do vetor
            dataApresentacao.splice(0, 1);

            dataApresentacao[1] = dataApresentacao[1].replaceAll(";"," ");
            dataApresentacao[0][9] = dataApresentacao[1];

            //remoção da posição vazia do vetor
            dataApresentacao.splice(1, 1);

            dataApresentacao[1] = dataApresentacao[1].split(';');

            //remoção da posição vazia do vetor
            dataApresentacao[1].splice(0, 1);

            for(let i=0; i<dataApresentacao[1].length; i++)
            dataApresentacao[0].push(dataApresentacao[1][i]);
            
            dataApresentacao.splice(1, 1);
            ProdutosCSV.push(dataApresentacao[0]);
        
        } else if(dataApresentacao.length == 7) {
            dataApresentacao[0] = dataApresentacao[0].split(';');
            dataApresentacao[0][9] = dataApresentacao[1];
            dataApresentacao[0][9] += dataApresentacao[3];
            dataApresentacao[1] = dataApresentacao[6].split(';');
            dataApresentacao.splice(2,5);
            dataApresentacao[1].splice(0,1);

            for(let i=0; i<dataApresentacao[1].length; i++) dataApresentacao[0].push(dataApresentacao[1][i]);

            dataApresentacao.splice(1,2);
            
            ProdutosCSV.push(dataApresentacao[0]);

        } else {
            errorResults++;

            if(showConsole){
                let textResult = (errorResults > 1) ? "medicamentos" : "medicamento"; 
                console.log(`Não foi possível ler ${errorResults} ${textResult}.`);
            }

        }

    }  

    //declaração de variável: armazena última posição do vetor
    let lastVetor = ProdutosCSV.length-1;

    //remove a última posição do vetor caso estiver vazio
    if(ProdutosCSV[lastVetor] == "") ProdutosCSV.pop();

    //laço de repetição para gravação do vetor de produtos comercializados em 2020
    for(let i=0; i < ProdutosCSV.length; i++){
        if(ProdutosCSV[i][38] == "Sim") ProdutosComercializados2020CSV.push(ProdutosCSV[i]);
    
    }
    
}

buttonImport.addEventListener("click", function(event){

    event.preventDefault();

    openFile = document.getElementById('openFile');
    openFile.click();

});


openFile.addEventListener('change', function(){
    //Cria um objeto de leitura e armazena o resultado
    var data = new FileReader();

    data.onload = () => {

        readData(data.result);

    }

    data.readAsText(this.files[0]);
        
    //Se for possível ler o arquivo
    if (data.readyState == 1){
            
        enableButtonBuscar();

        enableButtonRelatorio();
        
        //Desativa o botão de importação
        disableButtonImport();

        //Exibição do resultado da leitura do arquivo
        uxOutputDone();
            
    } 
    //Caso não for possível ler o arquivo
    else { 

        uxOutputError();

    }
    
});

consultarButton.addEventListener("click", function(event){

    //função responsável por evitar comportamento default de refresh page
    event.preventDefault();

    //comando que reseta a tabela de exibição ao usuário
    resetTable();
    
    //declaração de variável local do valor obtido do input
    let str = inputSearch.value;

    //se não for número, então pesquisar pelo nome
    if(isNaN(str)){ 
        
        search(str);

    }
    //se for número, então pesquisar pela data
    else{ 
        
        searchEAN(str);

    }
    
    
});

consultarRelatorio.addEventListener("click", function(event){

    //função responsável por evitar comportamento default de refresh page
    event.preventDefault();

    //comando que reseta a tabela de exibição ao usuário
    resetTable();

    //declaração de variável para cálculo do relatório
    let Negativa = 0;
    let Neutra = 0;
    let Positiva = 0;
    let Total = 0;

    //declaração de um objeto de data
    var currentTime = new Date();
    let dataStr = currentTime.toLocaleDateString() + " — " + currentTime.toLocaleTimeString();

    let log = {
        report: 'relatório de crédito',
        time: dataStr,

    }

    let tittle = {
        Classificação: 'Classificação',
        Percentual: 'Percentual',
        Gráfico: 'Práfico',

    }
    
    let percentual = {
        Negativa: '',
        Neutra: '',
        Positiva: '',
        Total: '100%'

    }

    let graphic = {
        negativa: '',
        neutra: '',
        positiva: '',
        null: '',

    }

    let resultadoSearch = new Array;

    for(let i=0; i<ProdutosCSV.length; i++){

        if(ProdutosCSV[i][37] == "Negativa"){

            Negativa++;

        } else if(ProdutosCSV[i][37] == "Neutra"){

            Neutra++;

        } else if(ProdutosCSV[i][37] == "Positiva"){

            Positiva++;

        } else {
            if(showConsole){
            console.log(`Erro encontrado em delimitar o Crédito Tributario do Produto: ${i}`);
            console.log(ProdutosCSV[i]);

            }

        } 

    }
    
    //definição da quantidade total de produtos
    Total = Negativa+Neutra+Positiva;

    //cálculo do percentual referente a concessão de crédito
    percentual.Negativa = (((Negativa * 100) / Total).toFixed(2)); 
    percentual.Neutra = ((Neutra * 100) / Total).toFixed(2); 
    percentual.Positiva = ((Positiva * 100) / Total).toFixed(2); 

    //cálculo dos asteriscos de composição do gráfico
    for(let i = 0; i<percentual.Negativa; i++) graphic.negativa += '*'; 
    for(let i = 0; i<percentual.Neutra; i++) graphic.neutra += '*'; 
    for(let i = 0; i<percentual.Positiva; i++) graphic.positiva += '*'; 

    percentual.Negativa += '%';
    percentual.Neutra += '%';
    percentual.Positiva += '%';

    resultadoSearch.push(log);
    resultadoSearch.push(tittle);
    resultadoSearch.push(percentual);
    resultadoSearch.push(graphic);

    createTable(resultadoSearch);

    if(showConsole) console.log(resultadoSearch);

});