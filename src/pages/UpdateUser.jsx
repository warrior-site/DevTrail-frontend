import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import {useDispatch,useSelector} from "react-redux"
import { updateProfile } from "../store/userAction";

function Signup() {
   const { register, handleSubmit, reset } = useForm();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [bgPreview, setBgPreview] = useState(null);

  const [avatarFile, setAvatarFile] = useState(null);
  const [bgFile, setBgFile] = useState(null);
  const { loading, user } = useSelector((state) => state.user);
 const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
      // FormData object
      const formData = new FormData();

      // Append text fields
      formData.append("username", data.username || user.username || null);
      formData.append("githubUsername", data.githubUsername || user.githubUsername || null);
      formData.append("bio", data.Bio || user.bio || null);
     const socialLinks = {
       github: data.github || user.socialLinks.github || null,
       linkedin: data.linkedin || user.socialLinks.linkedin || null,
       twitter: data.twitter || user.socialLinks.twitter || null,
       website: data.website || user.socialLinks.website || null,
     };
     formData.append("socialLinks", JSON.stringify(socialLinks));

      // Append files
    //   if (avatarFile) {
    //     formData.append("avatar", avatarFile);
    //   }
    //   if (bgFile) {
    //     formData.append("background", bgFile);
    //   }
    {formData.githubUsername && (
  <p>GitHub Username: {formData.githubUsername}</p>
)}
    await dispatch(updateProfile(formData, user._id));

      console.log("Form Data to be sent:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      
    //   console.log("Signup Success:", res.data);
      reset();
      setAvatarPreview(null);
      setBgPreview(null);
      setAvatarFile(null);
      setBgFile(null);

    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setAvatarFile(file);
    }
  };

  const handleBgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBgPreview(URL.createObjectURL(file));
      setBgFile(file);
    }
  };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white">
            <div className="w-[90%] max-w-5xl h-[80vh] flex rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,255,128,0.4)]">

                {/* Left Side */}
                <div className="w-1/2 bg-gradient-to-br from-green-800 via-black to-green-900 flex flex-col items-center justify-center gap-6 relative">
                    <div className="text-3xl font-bold text-green-300 drop-shadow-lg">
                        Welcome Aboard!
                    </div>
                    <div className="w-36 h-36 rounded-full border-4 border-green-400 shadow-[0_0_25px_rgba(0,255,128,0.7)] overflow-hidden flex items-center justify-center">
                        {avatarPreview ? (
                            <img
                                src={avatarPreview}
                                alt="Avatar Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-green-300">Avatar</span>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("avatar")}
                        onChange={handleAvatarChange}
                        className="text-sm text-green-300 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-green-700 file:text-white hover:file:bg-green-600"
                    />

                    <div className="w-52 h-28 border-2 border-green-400 rounded-lg shadow-[0_0_20px_rgba(0,255,128,0.5)] overflow-hidden">
                        {bgPreview ? (
                            <img
                                src={bgPreview}
                                alt="Background Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-green-300 text-sm">
                                Background
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("background")}
                        onChange={handleBgChange}
                        className="text-sm text-green-300 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-green-700 file:text-white hover:file:bg-green-600"
                    />
                </div>

                {/* Right Side */}
                <div className="w-1/2 bg-black/70 flex flex-col justify-center px-10 gap-5">
                    {/* <h2 className="text-2xl font-semibold text-green-400">Create Account</h2> */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4 w-full"
                    >
                        <div className="flex flex-col">
                            <label className="text-green-300 text-sm">Username</label>
                            <input
                                {...register("username")}
                                placeholder="Enter your name"
                                className="px-4 py-2 rounded-md bg-gray-800 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-green-300 text-sm">Github Username</label>
                            <input
                                {...register("Github Username")}
                                placeholder="Enter your Github username"
                                className="px-4 py-2 rounded-md bg-gray-800 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-green-300 text-sm">Bio</label>
                            <textarea
                                {...register("Bio")}
                                placeholder="Bio"
                                className="px-4 py-2 overflow-hidden  rounded-md bg-gray-800 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                            {/* Left Side */}
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-col">
                                    <label className="text-green-300 text-sm">Github</label>
                                    <input
                                        {...register("github")}
                                        placeholder="Github"
                                        className="px-4 py-2 rounded-md bg-gray-800 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-green-300 text-sm">LinkedIn</label>
                                    <input
                                        type="text"
                                        {...register("linkedin")}
                                        placeholder=" LinkedIn "
                                        className="px-4 py-2 rounded-md bg-gray-800 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
                                    />
                                </div>
                            </div>

                            {/* Right Side */}
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-col">
                                    <label className="text-green-300 text-sm">Twitter</label>
                                    <input
                                        {...register("twitter")}
                                        type="password"
                                        placeholder=" Twitter "
                                        className="px-4 py-2 rounded-md bg-gray-800 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-green-300 text-sm">Website</label>
                                    <input
                                        {...register("website")}
                                        type="password"
                                        placeholder="Portfolio Link"
                                        className="px-4 py-2 rounded-md bg-gray-800 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit(onSubmit)}
                            type="submit"
                            className="mt-4 py-2 rounded-md bg-green-600 hover:bg-green-500 text-white font-semibold shadow-[0_0_15px_rgba(0,255,128,0.6)]"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
