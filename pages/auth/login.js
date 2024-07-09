"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function Login() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      route.push("/");
    } else {
      console.log("login");
    }
  }, [user]);
  // sign-in with google

  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
      <h2 className="text-2xl font-medium ">Join Today</h2>
      <div className="py-4">
        <h3 className="py-4">Sign in with our Providers</h3>
        <button
          onClick={GoogleLogin}
          className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2"
        >
          <FcGoogle className="text-2xl" />
          Sign in with google
        </button>
      </div>
    </div>
  );
}
