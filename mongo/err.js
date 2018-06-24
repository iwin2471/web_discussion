function Pre_save_user(next) {
  this.token = this.generateToken();
  next();
}

function Post_save_user(error, res, next) {
  if (error.name === "BulkWriteError" && error.code === 11000)
    next(new user_duplicate("duplicate error"));
  else if (error.name === "ValidationError")
    next(new ValidationError(error.message));
  else next(error);
}

function Pre_save_boards(next) {
  this.discuss_token = this.generateToken();
  next();
}


export { Pre_save_boards, Pre_save_user, Post_save_user };
