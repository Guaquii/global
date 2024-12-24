let currentPage = 1;
const rowsPerPage = 10;
let currentSortColumn = -1;
let sortDirection = 'asc';

function displayData(page) {
    const table = document.getElementById('user-table');
    const rows = table.getElementsByTagName('tr');
    const totalRows = rows.length;

    for (let i = 0; i < totalRows; i++) {
        rows[i].style.display = 'none';
    }

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    for (let i = start; i < end && i < totalRows; i++) {
        rows[i].style.display = '';
    }

    document.getElementById('page-info').innerText = `Página ${page}`;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayData(currentPage);
    }
}

function nextPage() {
    const table = document.getElementById('user-table');
    const rows = table.getElementsByTagName('tr');
    const totalPages = Math.ceil(rows.length / rowsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        displayData(currentPage);
    }
}

function ipToNumber(ip) {
    return ip.split('.').reduce((acc, part) => acc * 256 + parseInt(part), 0);
}

function sortTable(column, columnName) {
    const table = document.getElementById('user-table');
    const rows = Array.from(table.getElementsByTagName('tr'));

    // Alternar la dirección de ordenamiento
    if (currentSortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortDirection = 'asc';
    }
    currentSortColumn = column;

    const sortedRows = rows.sort((a, b) => {
        let cellA = a.getElementsByTagName('td')[column].innerText.toLowerCase();
        let cellB = b.getElementsByTagName('td')[column].innerText.toLowerCase();

        // Verificar si los valores son numéricos o direcciones IP
        if (!isNaN(cellA) && !isNaN(cellB)) {
            cellA = parseFloat(cellA);
            cellB = parseFloat(cellB);
        } else if (columnName === 'ip_address') {
            cellA = ipToNumber(cellA);
            cellB = ipToNumber(cellB);
        }

        if (cellA < cellB) return sortDirection === 'asc' ? -1 : 1;
        if (cellA > cellB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    for (const row of sortedRows) {
        table.appendChild(row);
    }

    displayData(currentPage); // Asegúrate de mostrar la página actual después del ordenamiento
}

function applyFilters() {
    console.log("Applying filters...");

    const idFilter = document.getElementById('filter-id').value.trim().toLowerCase();
    const firstNameFilter = document.getElementById('filter-first_name').value.trim().toLowerCase();
    const lastNameFilter = document.getElementById('filter-last_name').value.trim().toLowerCase();
    const emailFilter = document.getElementById('filter-email').value.trim().toLowerCase();
    const genderFilter = document.getElementById('filter-gender').value.trim().toLowerCase();
    const ipAddressFilter = document.getElementById('filter-ip_address').value.trim().toLowerCase();
    const countryFilter = document.getElementById('filter-country').value.trim().toLowerCase();

    const table = document.getElementById('user-table');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const id = cells[0].innerText.trim().toLowerCase();
        const firstName = cells[1].innerText.trim().toLowerCase();
        const lastName = cells[2].innerText.trim().toLowerCase();
        const email = cells[3].innerText.trim().toLowerCase();
        const gender = cells[4].innerText.trim().toLowerCase();
        const ipAddress = cells[5].innerText.trim().toLowerCase();
        const country = cells[6].innerText.trim().toLowerCase();

        const matchesFilter = 
            (idFilter === '' || id.includes(idFilter)) &&
            (firstNameFilter === '' || firstName.includes(firstNameFilter)) &&
            (lastNameFilter === '' || lastName.includes(lastNameFilter)) &&
            (emailFilter === '' || email.includes(emailFilter)) &&
            (genderFilter === '' || gender.includes(genderFilter)) &&
            (ipAddressFilter === '' || ipAddress.includes(ipAddressFilter)) &&
            (countryFilter === '' || country.includes(countryFilter));

        rows[i].style.display = matchesFilter ? '' : 'none';
    }
}

// Inicializar la tabla con la primera página
displayData(currentPage);
