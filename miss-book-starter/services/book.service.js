import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const BOOK_KEY = 'bookDB'

_createBooks()

export const bookService = {
    query,
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
    if (!books || !books.length) {
        books = []
        const titles = ['holes', 'old tractors', 'beat your way to the top', 'magic lantern', 'between here and gone']
        for (let i = 0; i < 6; i++) {
            const title = titles[utilService.getRandomIntInclusive(0, titles.length - 1)]
            books.push(_createBook(title))
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title) {
    const book = getEmptyBook(title)
    book.id = utilService.makeId()
    return book
}
