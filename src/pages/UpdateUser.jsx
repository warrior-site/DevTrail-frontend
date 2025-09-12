import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../store/userAction";
import "./stylePage.css"
import { toast } from "react-toastify";

function UpdateProfile() {
  const { register, handleSubmit, reset } = useForm();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [bgPreview, setBgPreview] = useState(null);

  const [avatarFile, setAvatarFile] = useState(null);
  const [bgFile, setBgFile] = useState(null);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append text fields
      formData.append("username", data.username || user.username || "");
      formData.append("githubUsername", data.githubUsername || user.githubUsername || "");
      formData.append("bio", data.bio || user.bio || "");

      const socialLinks = {
        github: data.github || user.socialLinks?.github || "",
        linkedin: data.linkedin || user.socialLinks?.linkedin || "",
        twitter: data.twitter || user.socialLinks?.twitter || "",
        website: data.website || user.socialLinks?.website || "",
      };
      formData.append("socialLinks", JSON.stringify(socialLinks));

      // Append files
      if (avatarFile) formData.append("avatar", avatarFile);
      if (bgFile) formData.append("background", bgFile);
      
      const response = await dispatch(updateProfile(formData, user._id));
      if (response.data.success) {
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }

      console.log("Form Data sent:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      reset();
      setAvatarPreview(null);
      setBgPreview(null);
      setAvatarFile(null);
      setBgFile(null);
    } catch (error) {
      console.error("Update Error:", error);
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
    <div className="main-box min-h-screen w-full flex items-center justify-center  text-white p-4">
      <button
        className="absolute top-6 left-20  text-green-400 underline hover:text-green-300"
        onClick={() => window.history.back()} >
        ← Go Back
      </button>
      <div className="w-full max-w-5xl mt-10 min-h-[80vh] md:h-[80vh] flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,255,128,0.4)]">

        {/* Left Side */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-green-800 via-black to-green-900 flex flex-col items-center justify-center gap-6 p-6">
          <div className="text-2xl md:text-3xl font-bold text-green-300 drop-shadow-lg text-center">
            Update Your Profile
          </div>

          {/* Avatar Preview */}
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-green-400 shadow-[0_0_25px_rgba(0,255,128,0.7)] overflow-hidden flex items-center justify-center">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-green-300 text-sm md:text-base">Avatar</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="text-sm text-green-300 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-green-700 file:text-white hover:file:bg-green-600"
          />

          {/* Background Preview */}
          <div className="w-40 h-24 md:w-52 md:h-28 border-2 border-green-400 rounded-lg shadow-[0_0_20px_rgba(0,255,128,0.5)] overflow-hidden">
            {bgPreview ? (
              <img src={bgPreview} alt="Background Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-green-300 text-xs md:text-sm">
                Background
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleBgChange}
            className="text-sm text-green-300 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-green-700 file:text-white hover:file:bg-green-600"
          />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 bg-black/70 flex flex-col justify-center px-6 md:px-10 py-6 overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
            {/* Username */}
            <div className="flex flex-col">
              <label className="text-green-300 text-sm">Username</label>
              <input
                {...register("username")}
                placeholder="Enter your name"
                className="px-4 py-2 rounded-md bg-gray-800 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Github Username */}
            <div className="flex flex-col">
              <label className="text-green-300 text-sm">Github Username</label>
              <input
                {...register("githubUsername")}
                placeholder="Enter your Github username"
                className="px-4 py-2 rounded-md bg-gray-800 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Bio */}
            <div className="flex flex-col">
              <label className="text-green-300 text-sm">Bio</label>
              <textarea
                {...register("bio")}
                placeholder="Bio"
                className="px-4 py-2 rounded-md bg-gray-800 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
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
                    placeholder="LinkedIn"
                    className="px-4 py-2 rounded-md bg-gray-800 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <div className="flex flex-col">
                  <label className="text-green-300 text-sm">Twitter</label>
                  <input
                    {...register("twitter")}
                    type="text"
                    placeholder="Twitter"
                    className="px-4 py-2 rounded-md bg-gray-800 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-green-300 text-sm">Website</label>
                  <input
                    {...register("website")}
                    type="text"
                    placeholder="Portfolio Link"
                    className="px-4 py-2 rounded-md bg-gray-800 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
                  />
                </div>
              </div>
            </div>

            <button
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

export default UpdateProfile;
