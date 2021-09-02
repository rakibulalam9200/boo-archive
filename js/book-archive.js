// toggle Bootstrap Spinner 
const toggleSpinner = (removeDisplay, displayStyle )=>{
    const spinner = document.getElementById('spinner');
    spinner.classList.remove(removeDisplay);
    spinner.classList.add(displayStyle);
}

// toggle search message  of books 
const toggleSearchMessage= displayStyle =>{
    document.getElementById('search-result-message').style.display = displayStyle;
    
}
// toggle search result of previous books display none 
const toggleSearchResultAddClass = (displayStyle )=>{
    const booksSearchResult = document.getElementById('display-books');
    booksSearchResult.classList.add(displayStyle);  
}
// toggle search result add books on display  
const toggleSearchResultRemoveClass = (displayStyle )=>{
    const booksSearchResult = document.getElementById('display-books');
    booksSearchResult.classList.remove(displayStyle);  
}

// event handler function for search button click 
const onLoadBook = () =>{
    const searchField = document.getElementById('search-text');
     const searchText = searchField.value;
     toggleSearchResultAddClass('d-none');
    if(searchText === ""){
        toggleSpinner("d-block","d-none");
        const searchResultMessage = document.getElementById('search-result-message');
        searchResultMessage.innerHTML = `
        <h2>Please, Enter Book Name</h2>
        `
    }else{
        toggleSpinner("d-none","d-block");
        toggleSearchMessage('none');
        //clear field 
        searchField.value = '';
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data =>displaySearchResult(data)); 
    }
    
}

// display search result 
const displaySearchResult = books=>{
    const searchResultText = document.getElementById('search-result-message');
    const booksResult = document.getElementById('display-books');
    searchResultText.innerText = '';
    booksResult.innerText = '';
    toggleSpinner("d-block","d-none");
    toggleSearchMessage('block');
    toggleSearchResultRemoveClass('d-none');

    // Check Total Search Result Found 
    if(books.numFound === 0){
        searchResultText.innerHTML = `
        <h2>No Search Item Found </h2>
        `
    }else{
        searchResultText.innerHTML = `
        <h2>Search Item Found: ${books.numFound} </h2>
        `
    }

    //Display Result for 40 Books 
    books?.docs.forEach((book,index) => {
        if(index<40){
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i?book.cover_i:''}-M.jpg" class="card-img-top text-warning" alt="No Cover found">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <hr>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-between">
                            <span>Author: </span>
                            <span class="fw-bold">${book.author_name?book.author_name[0]:''}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                            <span>Publisher: </span>
                            <span class="fw-bold">${book.publisher?book.publisher[0]:''}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                            <span>First Publish Year: </span>
                            <span class="fw-bold">${book.first_publish_year?book.first_publish_year:''}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                `;
            booksResult.appendChild(div);
        }
    });
    
}