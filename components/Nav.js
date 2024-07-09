import Link from "next/link";
import { auth } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Nav() {
  const [user, loading] = useAuthState(auth);
  //   console.log(user);
  return (
    <nav className="flex justify-between items-center py-10">
      <Link href="/">
        <button className="text-lg font-medium">Bloggy 🤪</button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <li className="py-2 px-4 text-sm bg-cyan-500 text-white font-medium rounded-lg ">
            <Link href="/auth/login">Join Now</Link>
          </li>
        )}
        {user && (
          <div className="flex item-center gap-6">
            <Link href="/post">
              <button className="font-medium bg-cyan-500 text-white py-2 px-4 rounded-full text-lg">
                Post
              </button>
            </Link>
            <Link href="/dashboard">
              <img
                className="w-12 rounded-full cursor-pointer"
                src={user.photoURL}
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}
