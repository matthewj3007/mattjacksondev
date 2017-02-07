function createMatrixView(div_id) {
    Console.log("Creating matrix view");
    var table_div = document.getElementById(div_id);
    
/*    if(window.sessionStorage.getItem("MATRIX_CREATED") == 'true') {
        table_div.innerHTML = '';
        window.sessionStorage.setItem("MATRIX_CREATED",'false');
        return;
    } */
    
    var table_div_height = table_div.clientHeight;
    var table_div_width = table_div.clientWidth;
    
    var num_rows = 5;
    var num_columns = num_rows;
    
    var cell_height = table_div_height / num_rows;
    var cell_width = table_div_width / num_columns;
    
    var roygbiv = ['red','orange','yellow','green','blue','indigo','violet','black','aqua','purple'];
    
    for (i = 0; i < num_rows; i++) {
        
        var rowDiv = document.createElement("div");
        rowDiv.style.height = cell_height +"px";
        rowDiv.style.width = "100%";
        rowDiv.style.top = 100*(i/num_rows)+"%";
        rowDiv.style.position = "absolute";
        
        table_div.appendChild(rowDiv);
        
        for (j = 0; j < num_columns; j++) {
            var cellDiv = document.createElement("div");
            cellDiv.style.height = cell_height + "px";
            cellDiv.style.width = cell_width + "px";
            cellDiv.style.borderStyle = "solid";
            cellDiv.style.left = 100*(j/num_columns) + "%";
            cellDiv.style.position = "absolute";
            cellDiv.style.backgroundColor = roygbiv[Math.floor(Math.random()*10)];
            
            rowDiv.appendChild(cellDiv);
        }
    }
    
   // window.sessionStorage.setItem("MATRIX_CREATED", 'true');
}

function js_demo() {
    createMatrixView("middle_right");
}
