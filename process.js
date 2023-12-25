let parsedData;
        let selectedFields;

        document.getElementById('fileInput').addEventListener('change', handleFileSelect);
        document.getElementById('addBtn').addEventListener('click', moveOption);
        document.getElementById('removeBtn').addEventListener('click', moveOption);
        document.getElementById('displayBtn').addEventListener('click', displayData);

        function handleFileSelect(event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    parsedData = JSON.parse(e.target.result);
                    populateDisplayHandlingOptions(Object.keys(parsedData.products[Object.keys(parsedData.products)[0]]));
                };
                reader.readAsText(file);
            }
        }

        function populateDisplayHandlingOptions(fields) {
            const availableFieldsList = document.getElementById('availableFieldsList');
            const displayedFieldsList = document.getElementById('displayedFieldsList');

            availableFieldsList.innerHTML = '';
            displayedFieldsList.innerHTML = '';

            fields.forEach(field => {
                const option = document.createElement('option');
                option.value = field;
                option.textContent = field;
                availableFieldsList.appendChild(option);
            });
        }

        function moveOption(event) {
            const fromListId = event.target.id === 'addBtn' ? 'availableFieldsList' : 'displayedFieldsList';
            const toListId = event.target.id === 'addBtn' ? 'displayedFieldsList' : 'availableFieldsList';

            const fromList = document.getElementById(fromListId);
            const toList = document.getElementById(toListId);

            Array.from(fromList.selectedOptions).forEach(option => {
                toList.appendChild(option);
            });
        }

        function displayData() {
            selectedFields = Array.from(document.getElementById('displayedFieldsList').options).map(option => option.value);

            if (!parsedData || !selectedFields || selectedFields.length === 0) {
                alert("Please select a file and choose at least one field to display.");
                return;
            }

            const sortedProducts = Object.keys(parsedData.products).sort((a, b) => {
                return parsedData.products[b].popularity - parsedData.products[a].popularity;
            });

            const tableHeader = document.getElementById('tableHeader');
            const tableBody = document.getElementById('tableBody');
            tableHeader.innerHTML = '';
            tableBody.innerHTML = '';

            selectedFields.forEach(field => {
                const th = document.createElement('th');
                th.textContent = field;
                tableHeader.appendChild(th);
            });

            sortedProducts.forEach(productId => {
                const product = parsedData.products[productId];
                const tr = document.createElement('tr');
                selectedFields.forEach(field => {
                    const td = document.createElement('td');
                    td.textContent = product[field];
                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);
            });

            document.getElementById('dataTable').style.display = 'table';
        }