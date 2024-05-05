export function BookList({books}) {
    return <section className="book-list">
              <ul>
                 {books.map(book => <li key={book.id}>{book.title}</li>)}
              </ul>
    </section>
}