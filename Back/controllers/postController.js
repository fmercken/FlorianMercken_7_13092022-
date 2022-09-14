const Post = require("../models/postModels");
const fs = require('fs');

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .sort({dateLastUpdate: 'desc'})
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(404).json({ error }));
};


exports.createPost = (req, res, next) => {

  const post = new Post({
    description: req.body.description,
    userId: res.locals.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    usersLiked: [],
    dateCreate: new Date(),
    dateLastUpdate: new Date()
  });

post
  .save()
  .then(() => res.status(201).json({ message: "Publication enregistrée" }))
  .catch((error) => {
    console.log("Erreur mangoose")
    res.status(400).json({ error })
  });
};

exports.updatePost = (req, res, next) => {

  let userId = res.locals.userId
  let postId = req.params.id

  let postObject = req.file ?
    {
      description: req.body.description,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } :
    { ...req.body }

    postObject.dateLastUpdate = new Date();

  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(res.status(200).json({ message: "Publication modifiée" }))
    .catch(error => res.status(400).json({ error }))
    
  };

exports.deletePost = async (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      if (post.imageUrl) {
        const filename = post.imageUrl.split("/images/")[1]
        fs.unlink(`images/${filename}`, () => { })
      }
      Post.deleteOne({ _id: req.params.id })
        .then(res.status(200).json({ message: "Publication supprimée" }))
        .catch(error => res.status(400).json({ error }))
    })

    .catch(error => res.status(500).json({ error }))

};

exports.getPostById = (req, res, next) => {
  Post.find({ _id: req.params.id })
  .then(post => post.length > 0 ? 
    res.status(200).json(post[0]) : 
    res.status(404).json({error: "La publication n'existe pas"}))
  .catch(error => res.status(404).json({ error }));
};


exports.likePost = (req, res, next) => {
  let like = req.body.like
  let userId = res.locals.userId
  let postId = req.params.id


  switch (like) {
    case "1":
      Post.updateOne({ _id: postId }, { $push: { usersLiked: userId }, $inc: { likes: +1 } })
        .then(() => res.status(200).json({ message: `J'aime` }))
        .catch((error) => res.status(400).json({ error }))

      break;

    case "0":
      Post.findOne({ _id: postId })
        .then((post) => {
          if (post.usersLiked.includes(userId)) {
            Post.updateOne({ _id: postId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
              .then(() => res.status(200).json({ message: `Neutre` }))
              .catch((error) => res.status(400).json({ error }))
          }
        })
        .catch((error) => res.status(404).json({ error }))
      break;

    default:
      console.log("likepost ....  error");
  }
}
