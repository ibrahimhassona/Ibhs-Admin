import { Project } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
}

const initialState: ProjectsState = {
  projects: [],
  currentProject: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
      //   ---------- Current Project --------
    setCurrentProject: (state, action: PayloadAction<Project>) => {
      state.currentProject = action.payload;
    },
    resetCurrentProject: (state) => {
        state.currentProject = null;
      },
    //   ---------- Projects --------
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );

      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
    
  },
});

export const { setProjects, updateProject, deleteProject,setCurrentProject,resetCurrentProject } =
  projectsSlice.actions;
export default projectsSlice.reducer;
