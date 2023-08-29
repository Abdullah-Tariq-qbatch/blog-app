/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import _ from "lodash";

const imagesData = [
  "https://images.unsplash.com/photo-1692563318078-a9ccbda4d6d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80",
  "https://images.unsplash.com/photo-1692560415033-44a79cff20b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3029&q=80",
  "https://images.unsplash.com/photo-1691859323561-16fda0b543f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2875&q=80",
  "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
  "https://images.unsplash.com/photo-1461696114087-397271a7aedc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
  "https://images.unsplash.com/photo-1503876466-1fc5143eda57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2048&q=80",
  "https://images.unsplash.com/photo-1554232682-b9ef9c92f8de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
  "https://images.unsplash.com/photo-1505832018823-50331d70d237?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3008&q=80",
  "https://images.unsplash.com/photo-1585592377048-a627ec452b7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80",
  "https://images.unsplash.com/photo-1549558549-415fe4c37b60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2919&q=80",
  "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80",
  "https://images.unsplash.com/photo-1683009427666-340595e57e43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
  "https://images.unsplash.com/photo-1692637852896-bca5c430f47d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
  "https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
  "https://images.unsplash.com/photo-1692716677628-f1d0c35cf174?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
  "https://images.unsplash.com/photo-1692794864989-263daf1d1868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
];

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
        imageURL:
          imageURL || imagesData[Math.floor(Math.random() * imagesData.length)],
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
