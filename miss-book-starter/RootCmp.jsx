
const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { BookIndex } from "./pages/BookIndex.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"

import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"

export function RootCmp() {
    return (
        <Router>
            <AppHeader />
            <main className="content-grid">
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="/book" element={<BookIndex />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/book/:bookId" element={<BookDetails />} />
                    <Route path="/book/edit" element={<BookEdit />} />
                    <Route path="/book/edit/:bookId" element={<BookEdit />} />
                </Routes>
            </main>
        </Router>
    )


}