import axios from "axios";
import { setRepo, setLoading, setError } from "./repoSlice";

// Fetch all repos for a user
export const fetchRepos = ({ userId, githubUsername }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `https://devtrail-backend.onrender.com/api/github/sync`,
        { userId, githubUsername }
      );

      console.log("Fetched repos:", response.data);

      // ✅ Only pass the array of repos to Redux
      dispatch(setRepo(response.data.githubRepos || []));
      return response
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};
export const syncRepos = ({ userId, githubUsername }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `https://devtrail-backend.onrender.com/api/github/sync-again`, // 👈 your new route
        { userId, githubUsername }
      );

      console.log("Synced repos:", response.data);

      // ✅ Store latest repos in Redux
      // dispatch(setRepo(response.data.githubRepos || []));
      dispatch(fetchRepos({userId, githubUsername}))
      return response;
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

