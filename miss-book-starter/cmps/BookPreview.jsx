
export function BookPreview({ book }) {
    return (<article className="book-preview">
        <h3>{book.title}</h3>
        <p>Price: {book.listPrice.amount}</p>
        <img src={book.thumbnail} alt="" />
    </article>
    )
}