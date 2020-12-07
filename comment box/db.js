const mongoose = require("mongoose");
function dbConnect(){
    mongoose.connect(
        "mongodb+srv://siddhant:FUMjAZSYEk3YqCQ8@comment-box.4iikd.mongodb.net/comments?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: true
        }
      );
}

module.exports=dbConnect