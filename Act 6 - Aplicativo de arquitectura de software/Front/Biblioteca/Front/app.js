// Obtener elementos del DOM
const registerUserForm = document.getElementById('registerUserForm');
const addBookForm = document.getElementById('addBookForm');
const loanForm = document.getElementById('loanForm');
const fetchAvailableBooksButton = document.getElementById('fetchAvailableBooks');
const availableBooksList = document.getElementById('availableBooksList');

// Función para registrar un usuario
registerUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("Hola mundo")
    const userId = document.getElementById('userId').value;
    const userName = document.getElementById('userName').value;
    const userPassword = document.getElementById('userPassword').value;
    const userEmail = document.getElementById('userEmail').value;
    console.log(userId, userName, userPassword, userEmail)

    const response = await fetch('http://localhost:5000/registrar_usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_usuario: userId, nombre: userName, contraseña: userPassword, email: userEmail })
    });

    const data = await response.json();
    alert(data.mensaje);
});

// Función para agregar un libro
addBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const bookId = document.getElementById('bookId').value;
    const bookAuthor = document.getElementById('bookAuthor').value;
    const bookTitle = document.getElementById('bookTitle').value;
    const bookPublisher = document.getElementById('bookPublisher').value;
    const bookAvailable = document.getElementById('bookAvailable').value;

    const response = await fetch('http://localhost:5000/crear_libro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_libro: bookId, autor: bookAuthor, titulo: bookTitle, editorial: bookPublisher, disponible: bookAvailable })
    });

    const data = await response.json();
    alert(data.mensaje);
});

// Función para registrar un préstamo
loanForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const loanId = document.getElementById('loanId').value;
    const loanBookId = document.getElementById('loanBookId').value;
    const loanUserId = document.getElementById('loanUserId').value;
    const loanDate = document.getElementById('loanDate').value;
    const returnDate = document.getElementById('returnDate').value;

    const response = await fetch('http://localhost:5000/registrar_prestamo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_prestamo: loanId, id_libro: loanBookId, id_usuario: loanUserId, fecha_prestamo: loanDate, fecha_entrega: returnDate })
    });

    const data = await response.json();
    alert(data.mensaje);
});

// Función para obtener libros disponibles
fetchAvailableBooksButton.addEventListener('click', async () => {
    const response = await fetch('http://localhost:5000/libros_disponibles');
    const books = await response.json();

    availableBooksList.innerHTML = ''; // Limpiar lista antes de mostrar
    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `ID: ${book.ID}, Título: ${book.Título}, Autor: ${book.Autor}`;
        availableBooksList.appendChild(li);
    });
});
