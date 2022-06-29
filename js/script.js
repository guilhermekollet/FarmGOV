/* Guilherme Kollet 
** @guisklherme

    Script inicial do programa. É possível sair do estado de importação
    e entrar em estado de pesquisa a partir deste documento de código.

*/

//Botão de importação
var import_csv = document.querySelector("#button_import");

import_csv.addEventListener("click", function(event){

    event.preventDefault();

        open_file = document.getElementById('open_file');
        open_file.click();
        });

open_file.addEventListener('change', function() {

    //Cria um objeto de leitura e armazena o resultado
    var data_text = new FileReader();

    data_text.onload = () => {

        Json_Read(data_text.result);

        }

    data_text.readAsText(this.files[0]);
        
    //Se for possível ler o arquivo
    if (data_text.readyState == 1){
            
        //muda o estado do programa
        Document_Imported_State(false);

        //exibição do resultado da leitura do arquivo
        Show_Ready_Read();
            
    } else { //Caso não for possível ler o arquivo

        Document_Imported_State(true);
        Show_Error_Read();
            

    }
    
});

//Botão de Ranking
button_ranking.addEventListener("click", function(event){

    //função responsável por evitar comportamento default de refresh page
    event.preventDefault();

    console.log("ranking");

    let str_ranking = search.value;

    console.log(str_ranking);

    if(isNaN(str_ranking)){ 
        
        Show_Error_Search();
        Table_Control(false);
        Write_Number_Students(0);
        Write_All_Payment(0, false);
        Write_Media_Payment_and_Qbs(0, false);
        

    }else{ //Se for número, então pesquisar pela data
        
        Search_Ranking(str_ranking);

    }

});



