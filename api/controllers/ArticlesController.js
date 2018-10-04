/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    list: async(req, res) => {
        Articles.find({}).exec((err, articles) => {
            if(err) res.send(500, {error: "Database Error"});
            res.view('pages/list', {articles})
        });
    },
    add: async(req, res) => {
        res.view('pages/add');
    },
    create: async(req, res) => {
        let title = req.body.title;
        let body = req.body.body;
        let article = {
            title,
            body
        }
        Articles.create(article).exec((err, article) => {
            if(err) return res.send(500, {error: "Database Error"})
            res.redirect('/articles/list');
        });
    },
    edit: async(req, res) => {
        let id = req.params.id;
        Articles.findOne({id}).exec((err, article) => {
            if(err) return res.send(500, {error: "Database Error"});
            console.log(article);
            if(article === undefined) return res.status(404).send({error: "Khong tim thay article"});
            res.view('pages/edit', {article});
        });     
    },
    update: async (req, res) => {
        let id = req.params.id;
        let title = req.body.title;
        let body = req.body.body;
        Articles.findOne({id}).exec((err, article) => {
            if(err) return res.send(500, {error: "Database Error"});
            console.log(article);
            if(article === undefined) return res.status(404).send({error: "Khong tim thay article"});
            Articles.update({id}, {title, body}).exec((err, articleUpdate) => {
                if(err) return res.send(500, {error: "Database Error"});
                res.redirect('/articles/list');
            });
        }); 
    }
    ,
    delete: async(req, res) => {
        let id = req.params.id; //get params
        Articles.destroy({id}).exec((err, article) => {
            if(err) res.send(500, {error: "Database Error"});
            res.redirect('/articles/list');
        });
        return false;
    }
};

