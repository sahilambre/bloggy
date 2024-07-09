import { auth, db } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { Bounce, Flip, toast } from "react-toastify";

export default function Post() {
  //form state
  const [post, setPost] = useState({ description: "" });

  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  // console.log(route);
  const routeData = route.query;

  // submit post
  const submitPost = async (e) => {
    e.preventDefault();

    //run checks for description
    if (!post.description) {
      toast.error("Description field empty 😴", {
        autoClose: 2000,
        transition: Bounce,
        position: "top-center",
        draggable: true,
      });
      return;
    }
    if (post.description.length > 300) {
      toast.error("Description too long! 🫨", {
        autoClose: 2000,
        transition: Bounce,
        position: "top-center",
        draggable: true,
      });
      return;
    }

    if (post?.hasOwnProperty("id")) {
      const docRef = doc(db, "posts", post.id);
      const updatedPost = { ...post, timestamp: serverTimestamp() };
      await updateDoc(docRef, updatedPost);
      return route.push("/");
    } else {
      // make a new post
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });
      setPost({ description: "" });
      toast.success("Post has been made! 🎉", {
        autoClose: 2000,
        transition: Bounce,
        position: "top-center",
        draggable: true,
      });
      return route.push("/");
    }
  };

  // make a new post

  // ccheck user
  const checkUser = async () => {
    if (loading) return;
    if (!user) route.push("/auth/login");
    if (routeData.id) {
      setPost({ description: routeData.description, id: routeData.id });
    }
  };

  useEffect(() => {
    checkUser();
  }, [user, loading]);

  return (
    <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
      <form onSubmit={submitPost}>
        {/* {post} */}
        <h1 className="text-2xl font-bold">
          {post.hasOwnProperty("id") ? "Edit your Post" : "Create a new post"}
        </h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm"
          ></textarea>
          <p
            className={`text-cyan-600 font-medium text-sm ${
              post.description.length > 300 ? "text-red-600" : ""
            }`}
          >
            {post.description.length}/300
          </p>
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white font-medium py-2 my-2 rounded-lg text-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
