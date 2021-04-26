// document.getElementsByTagName('th').addEventListener("click", sortTable);
console.log('jjjjere')

function sortTable(type){

    table = document.getElementById("menuTable");
    rows = table.rows;
    console.log(table.rows)
    for(i = 1; i <= rows.length; i++){
        x = rows[i].getElementsByTagName("td")[0];
        y = rows[i + 1].getElementsByTagName("td")[0];
        while(x.innerHTML > y.innerHTML){
             rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
            console.log(rows)
            
        }
    }

}