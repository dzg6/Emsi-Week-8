// document.getElementsByTagName('th').addEventListener("click", sortTable);

//Uses a bubble sort alogrithm to organize table data

//type 0=donut, 1=count, 2=price
function sortTable(type) {

    table = document.getElementById("menuTable");
    rows = table.rows;

    for (i = 1; i <= rows.length; i++) {
        for (var j = 1; j < (rows.length - i); j++) {

            x = rows[j].getElementsByTagName("td")[type];
            y = rows[j + 1].getElementsByTagName("td")[type];


            if (Number(x.innerHTML) > Number(y.innerHTML)) {
                var temp = rows[j]
                rows[j].parentNode.insertBefore(rows[j + 1], rows[j])
                rows[j + 1].parentNode.insertBefore(temp, rows[j + 1])
            } else if (x.innerHTML > y.innerHTML) {
                var temp = rows[j]
                rows[j].parentNode.insertBefore(rows[j + 1], rows[j])
                rows[j + 1].parentNode.insertBefore(temp, rows[j + 1])
            }
        }
    }

}