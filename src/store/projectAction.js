// ProjectAction.js
import axios from "axios";
import { setProject, setLoading, setError } from "./projectSlice";

// Fetch all Projects for a user
export const fetchProjects = (userId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
        console.log("Fetching projects for user:", userId);
      const response = await axios.get(
        `https://devtrail-backend.onrender.com/api/project/all-projects/${userId}`
      );
      dispatch(setProject(response.data));
      return response
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// Fetch a single Project by ID
export const fetchOneProject = (projectId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(
        `https://devtrail-backend.onrender.com/api/project/get-one-project/${projectId}`
      );
      dispatch(setProject(response.data));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// Create a new Project
export const createProjectAction = (projectData) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
     const response = await axios.post(
        `https://devtrail-backend.onrender.com/api/project/create-project`,
        projectData
      );
      dispatch(fetchProjects(projectData.userId)); // Refresh list
      return response;
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// Update an existing Project
export const updateProjectAction = (projectData) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await axios.post(
        `https://devtrail-backend.onrender.com/api/project/update-project/${projectData.projectId}`,
        projectData
      );
      console.log("Project updated successfully");
      dispatch(fetchProjects(projectData.userId)); // Refresh list
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// Delete a Project
export const deleteProjectAction = ({ projectId, userId }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await axios.post(
        `https://devtrail-backend.onrender.com/api/project/delete-project/${projectId}`
      );
      dispatch(fetchProjects(userId)); // Refresh list
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// ⚠️ Star Project (Only if backend supports it)
export const starProjectAction = ({ projectId, userId }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await axios.post(
        `https://devtrail-backend.onrender.com/api/project/star-project/${projectId}`
      );
      dispatch(fetchProjects(userId)); // Refresh list
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
}; 
