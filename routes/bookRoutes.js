var express = require('express'),

    routes = function(Book) {
        var bookController = require('../controllers/bookController')(Book),
            bookRouter = express.Router();

        /* body... */
        bookRouter.route('/')
            .post(bookController.post)
            .get(bookController.get);
        bookRouter.use('/:bookId', function(req, res, next) {
            /* body... */
            Book.findById(req.params.bookId, function(err, book) {
                if (err) {
                    res.status(500).send(err);
                } else if (book) {
                    // statement;
                    req.book = book;
                    next();
                } else {
                    res.status(404).send('no book found');
                }
            });
        });
        bookRouter.route('/:bookId')
            .get(function(req, res) {
                /* body... */
                var returnBook = req.book.toJSON();

                returnBook.links = {};
                var newLink= 'http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre;
                returnBook.links.FilterByThisGenre = newLink.replace(' ', '%20');
                res.json(returnBook);
            })
            .put(function(req, res) {
                // statement;
                req.book.title = req.body.title;
                req.book.author = req.body.author;
                req.book.genre = req.body.genre;
                req.book.read = req.body.read;
                req.book.save(function(err) {
                    /* body... */
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.json(req.book);

                    }
                });
            })
            .patch(function(req, res) {
                for (var p in req.body) {
                    // statement
                    req.book[p] = req.body[p];
                }
                if (req.body._id) {
                    delete req.body._id;
                }
                req.book.save(function(err) {
                    /* body... */
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.json(req.book);

                    }
                });
            })
            .delete(function(req, res) {
                /* body... */
                req.book.remove(function(err) {
                    /* body... */
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(204).send('Removed');

                    }
                });
            });

        return bookRouter;

    };

module.exports = routes;
