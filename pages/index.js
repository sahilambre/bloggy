import Image from "next/image";
// import { Inter } from "next/font/google";
import Message from "@/components/message";
import { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
// const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";

export default function Home() {
  // create a state with all the posts
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    return unsubscribe;
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="my-12 text-lg font-medium">
      <h2 className="">See what other people are saying</h2>
      {allPosts.map((post, index) => (
        <Message key={index} {...post}>
          <Link href={{ pathname: `/${post.id}`, query: { ...post } }}>
            <button>
              {post.comments?.length > 0 ? post.comments?.length : 0} Comments
            </button>
          </Link>
        </Message>
      ))}
    </div>
  );
}
