document.addEventListener('DOMContentLoaded', () => {
    const dniInput = document.getElementById('dniInput');
    const searchButton = document.getElementById('searchButton');
    const displayDNI = document.getElementById('displayDNI');
    const displayUsername = document.getElementById('displayUsername');
    const displayPassword = document.getElementById('displayPassword');
    const errorMessage = document.getElementById('errorMessage');

    let padronData = [];

    // Cargar el archivo CSV externo
    fetch('padron.csv')
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar el archivo CSV.');
            return response.text();
        })
        .then(csvText => {
            padronData = csvText.split('\n')
                .filter(line => line.trim() !== '') // <-- CORRECCIÓN: Filtra líneas vacías que pueden causar problemas.
                .slice(1)
                .map(line => {
                    const [dni, username, password] = line.split(',').map(v => v.trim());
                    return { dni, username, password };
                });
        })
        .catch(err => {
            console.error('Error cargando el padrón:', err);
            errorMessage.textContent = 'Error al cargar el padrón de usuarios.';
        });

    // Buscar por DNI
    searchButton.addEventListener('click', () => {
        const dni = dniInput.value.trim();
        // Se asegura que la comparación sea entre cadenas de texto limpias
        const record = padronData.find(item => item.dni === dni);

        if (record) {
            displayDNI.textContent = record.dni;
            displayUsername.textContent = record.username;
            displayPassword.textContent = record.password;
            errorMessage.textContent = '';
        } else {
            displayDNI.textContent = '';
            displayUsername.textContent = '';
            displayPassword.textContent = '';
            errorMessage.textContent = '❌ DNI no encontrado en el padrón.';
        }
    });
});