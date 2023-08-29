import _ from "lodash";

const getDataFromLocalStorage = (data) =>
  localStorage.getItem(`${data}`)
    ? JSON.parse(localStorage.getItem(`${data}`))
    : [];

const makePosts = (postsData, commentsData, usersData, pictureData, userId) => {
  //getting data from browser
  const postIdsComments = _.groupBy(
    _.concat(
      commentsData.data.comments,
      getDataFromLocalStorage("userComments")
    ),
    "postId"
  );
  const currentUsers = usersData.data.users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});
  const allPosts = _.concat(
    postsData.data.posts,
    getDataFromLocalStorage("posts")
  ).reduce((acc, post) => {
    let finalComments = [];
    if (postIdsComments[post.id]) {
      finalComments = postIdsComments[post.id]?.map((comment) => {
        comment.user.firstname = currentUsers[comment.user.id].firstName;
        comment.user.lastname = currentUsers[comment.user.id].lastName;
        return comment;
      });
    }
    if (
      (!userId && postIdsComments[post.id]) ||
      post.userId === Number(userId)
    ) {
      const { id, title, body, reactions, imageURL } = post;
      const postInfo = {
        id: id,
        title: title,
        body: body,
        reactions: reactions,
        imageURL: imageURL || pictureData.request.responseURL,
        comments: finalComments,
        email: currentUsers[post.userId].email,
        alias:
          currentUsers[post.userId].firstName[0].toUpperCase() +
          currentUsers[post.userId].lastName[0].toUpperCase(),
        name:
          currentUsers[post.userId].firstName +
          " " +
          (currentUsers[post.userId].lastName || ""),
      };
      acc.push(postInfo);
    }
    return acc;
  }, []);
  return allPosts;
};

export { makePosts, getDataFromLocalStorage };
