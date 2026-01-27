import React, { useState } from "react";
import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "../../helpers/Spinner";
import { __DB } from "../../backend/FirebaseConjig";
import { doc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
const DeleteAccount = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReauthenticateAndDelete = async () => {
    if (!user) {
      toast.error("No user is logged in!");
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, password);

    try {
      setIsLoading(true);
      await reauthenticateWithCredential(user, credential);
      
      // Delete the user document from Firestore
      await deleteDoc(doc(__DB, "user_profile", user?.uid));



      await deleteUser(user);
      toast.success("Account deleted successfully!");
      navigate("/auth/register");
    } catch (error) {
      toast.error(error.message);
    }finally {
        setIsLoading(false);
      }
  };

  return (
    <section className="h-[100%] w-[100%]  flex items-center justify-center">
      <div className="min-h-[300px] w-[40%] bg-slate-900 rounded-xl p-4">
        <h2 className="text-xl text-white mb-4">Delete Account</h2>
    
        <p className="text-gray-300 mb-4">
          Are you sure you want to delete the account?<br/> if yes enter your password to confirm deletion.
        </p>
        <input
          type="password"
           className="outline-none border-1 w-[100%] my-3 rounded-md py-2 px-4 mt-4"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          onClick={handleReauthenticateAndDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 w-full cursor-pointer mt-7"
        >
          Delete My Account
        </button>
      </div>
    
      {isLoading && <Spinner />}
      
    </section>
  );
};

export default DeleteAccount;