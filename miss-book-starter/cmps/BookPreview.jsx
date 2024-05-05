
export function BookPreview({ book }) {
    return (<article className="book-preview">
        <h3>{book.title}</h3>
        <p>Amount: {book.listPrice.amount }</p>
        <img src={`./img/${book.title}.jpg`} alt=""/>
    </article>
    )
}