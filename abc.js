let currentPage = 1;
    
document.addEventListener("DOMContentLoaded", function() {
    loadCharacters(currentPage);
});

function loadCharacters(page) {
    const tableBody = document.querySelector('#charactersTable tbody');
    let count =0;
    tableBody.innerHTML = ''; // Clear previous table data

    fetch(`https://swapi.dev/api/people/?page=${page}`)
        .then(response => response.json())
        .then(myData => {
          
            const characters = myData.results ;
            characters.forEach(character => { 
                const row = tableBody.insertRow();
                count++;
               const detailId= count +( (currentPage-1) * 10)
            

                row.insertCell(0).textContent = character.name;
                row.insertCell(1).textContent = character.gender;
                row.insertCell(2).textContent = character.height;
                row.insertCell(3).textContent = character.eye_color;
                
                row.insertCell(4).innerHTML = ` <div class="pagination2" > <button onclick="showDetails(${character.url.split('/').slice(-2, -1)})" >Details</button> </div> `;

            });

            document.getElementById('pageInfo').textContent = `Page ${page}`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function nextPage() {
    if(currentPage<9 ){
    currentPage++;
    loadCharacters(currentPage);}
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadCharacters(currentPage);
    }
}

function showDetails(sss){  

    const url = `Page2.html?exampleParam=${sss}`;
    
    window.location.href = url;

}


function searchByName(){

   
        const input = document.getElementById('searchInput').value.toLowerCase();
        const tableBody = document.querySelector('#charactersTable tbody');
        tableBody.innerHTML='';

        fetch(`https://swapi.dev/api/people/?search=${input}`)
        .then(response => response.json())
        .then(myData => {
          
            const characters = myData.results ;
            characters.forEach(character => { 
                const row = tableBody.insertRow();
                
            

                row.insertCell(0).textContent = character.name;
                row.insertCell(1).textContent = character.gender;
                row.insertCell(2).textContent = character.height;
                row.insertCell(3).textContent = character.eye_color;
                
                row.insertCell(4).innerHTML = `<div class="pagination2"><button onclick="showDetails(${character.url.split('/').slice(-2, -1)})" >Details</button></div>`;

            });

            document.getElementById('pageInfo').textContent = `Page ${page}`;
        })
        
        .catch(error => {
            console.error('Error fetching data:', error);
        });

        

       /* const tableRows = document.querySelectorAll('#charactersTable tbody tr'); // tableRows is an array 

        tableRows.forEach(row => {
            const name = row.cells[0].textContent.toLowerCase();
            if (name.includes(input)) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        });*/
    }




