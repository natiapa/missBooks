const { useState, useEffect } = React

export function AddBook() {
    const [books, setBooks] = useState([])

    function handleChange({ target }) {
        console.log(target.value)
        searchBooks(target.value)
            .then(bookResults => {
                console.log('book-google', bookResults)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error)
            });
    }
        function searchBooks(searchTerm) {
            return fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    return data.items;
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error)
                })
        }
   
      return  <section className="add-book-filter">
            <h3>Book Search & Add</h3>
            <input onChange={handleChange} name='txt' type="text" placeholder="Title" />
        
        </section>
   
}