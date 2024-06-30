import ProjectsSidebar from "./component/ProjectsSidebar";
import NewProject from "./component/NewProject";
import NoProjectSelected from "./component/NoProjectSelected";
import { useState } from "react";

function App() {
  //if we didn't add new project selectedProjectId is undef when we add new project it'll be null
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  const handleStartAddProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  };

  const handleAddProject=(projectData)=>{
    const newProject= {
      ...projectData,
      id: Math.random()
    }
    setProjectsState((prevState) => {
      return {
        ...prevState,//to copy existing data
        projects: [...prevState.projects, newProject],
      };
    });
  }
  
  console.log(projectsState);
  
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} />
      {projectsState.selectedProjectId === null ? (
        <NewProject onAdd={handleAddProject}/>
      ) : (
        <NoProjectSelected onStartAddProject={handleStartAddProject} />
      )}
    </main>
  );
}

export default App;
