import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const BOOK_KEY = 'bookDB'

_createBooks()

export const bookService = {
    query,
    remove,
    getEmptyBook,

}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            return books
        })
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}


function getEmptyBook(title = '', amount = 100, currencyCode = 'EUR', isOnSale = false ) {
    return {
        title,
        listPrice: {
            amount ,
            currencyCode,
            isOnSale
        }
    }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    console.log('books', books)
    if (!books || !books.length) {
        books = []
         books.push( _createBook('holes'))
         books.push( _createBook('old tractors'))
         books.push( _createBook('between here and gone'))
 
        
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title) {
    const book = getEmptyBook(title)
    book.id = utilService.makeId()
    return book
}
