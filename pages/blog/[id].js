//import { useRouter } from "next/router";
import posts from "../../posts.json";

const Post = (props) => {
  // const router = useRouter();
  // const post = posts[router.query.id];
  // if (!post) {
  //   console.log("aun no hay post");
  //   return <p></p>;
  // }
  return (
    <>
      <h1>{props.post.title}</h1>
      <p>{props.post.content}</p>
    </>
  );
};

Post.getInitialProps = (obj) => {
  console.log("getinitialprops", obj);
  return {
    post: posts[obj.query.id],
  };
};

export default Post;
