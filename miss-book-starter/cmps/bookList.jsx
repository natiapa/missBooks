export function bookList({books}) {
    return <section className="book-list">
              <pre>{JSON.stringify(books, null, 2)}</pre>
        
    </section>
}