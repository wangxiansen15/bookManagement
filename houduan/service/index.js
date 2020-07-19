const db = require('../db/index');

exports.addbook = (req, res) => {
    let sql = 'insert into book set ?';
    let data = {
        name: req.body.name,
        author: req.body.author,
        type: req.body.type,
        describion: req.body.describtion
    };
    db.base(sql,data,(result) => {
        res.json("1");
    });
};

exports.getbookList = (req, res) => {
    let sql = 'select count(*) from book;select * FROM book LIMIT ?, ?;';
    let data = [(req.body.current - 1) * req.body.pagesize, Number(req.body.pagesize)];
    db.base(sql, data,(result) => {
        var d = {
            total: result[0][0]['count(*)'],
            data: result[1]
        };
        res.json(d);
    });
};

exports.deleteBook = (req, res) => {
    let key = req.params.key;
    let sql = 'delete from book where `key` = ?';
    let data = [key];
    db.base(sql, data,(result) => {
        if (result.affectedRows === 1) {
            res.json(1);
        } else {
            res.json('error');
        }
    });
};

exports.getDetail = (req, res) => {
    let key = req.params.key;
    let sql = 'select `key`,name,author,type,describion from book where `key` = ?';
    let data = [key];
    db.base(sql,data,(result) => {
        res.json(result);
    });
};

exports.changeBook = (req, res) => {
    let key = req.params.key;
    let d = req.body;
    let sql = 'update book set name = ?, author = ?, type = ?, describion = ? where `key` = ?';
    let data = [d.name, d.author, d.type, d.describtion, key];
    db.base(sql, data, (result) => {
        if (result.affectedRows === 1) {
            res.json(1);
        } else {
            res.json('error');
        }
    });
};

exports.login = (req, res) => {
    let sql1 = 'SELECT count(*) FROM `user` WHERE username = ?';
    let sql = 'SELECT password FROM `user` WHERE username = ?';
    let data = [req.body.username];
    db.base(sql1, data, (result) => {
        if (result[0]['count(*)'] === 0) {
            res.json(0);
        } else {
            db.base(sql, data, (result) => {
                console.log(result);
                console.log(req.body.password);
                if (result[0].password == req.body.password) {
                    res.json(1);
                } else {
                    res.json(0);
                }
            });
        }
    });
};

exports.addorder =(req, res) => {
    let sql = 'insert into `order` set ?';
    let data = {
        name: req.body.name,
        phone: req.body.phone,
        bookname: req.body.bookname,
        limitTime: req.body.limitTime
    };
    db.base(sql,data,(result) => {
        res.json("1");
    });
};

exports.getorder = (req, res) => {
    let sql = 'select count(*) from `order`;select * FROM `order` LIMIT ?, ?;';
    let data = [(req.body.current - 1) * req.body.pagesize, Number(req.body.pagesize)];
    db.base(sql, data,(result) => {
        var d = {
            total: result[0][0]['count(*)'],
            data: result[1]
        };
        res.json(d);
    });
};

exports.deleteOrder = (req, res) => {
    let key = req.params.key;
    let sql = 'delete from `order` where `key` = ?';
    let data = [key];
    db.base(sql, data,(result) => {
        if (result.affectedRows === 1) {
            res.json(1);
        } else {
            res.json('error');
        }
    });
};

exports.jqueryBook = (req, res) => {
    console.log(req.body.name == '');
    if (req.body.name == '') {
        let sql = 'select count(*) from book;SELECT * FROM book LIMIT ?, ?;';
        let data = [(req.body.current - 1) * req.body.pagesize, Number(req.body.pagesize)];
        db.base(sql, data, (result) => {
            var d = {
                total: result[0][0]['count(*)'],
                data: result[1]
            };
            res.json(d);
        });
    } else {
        let data = ['%' + req.body.name + '%', '%' + req.body.name + '%', (req.body.current - 1) * req.body.pagesize, Number(req.body.pagesize)];
        let sql = 'select count(*) from book WHERE name = ?;SELECT * FROM book WHERE name like ? LIMIT ?, ?;';
        db.base(sql, data, (result) => {
            var d = {
                total: result[0][0]['count(*)'],
                data: result[1]
            };
            res.json(d);
        });
    }
};