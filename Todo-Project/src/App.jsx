import ProjectsSidebar from "./component/ProjectsSidebar";
import NewProject from "./component/NewProject";
import NoProjectSelected from "./component/NoProjectSelected";
import { useState } from "react";
import SelectedProject from "./component/SelectedProject";

function App() {
  //if we didn't add new project selectedProjectId is undef when we add new project it'll be null
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleStartAddProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  };

  const handleAddProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: Math.random(),
    };
    setProjectsState((prevState) => {
      return {
        ...prevState, //to copy existing data
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }; //when inputs are validated and we click save button and save the input

  const handleCancelProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState, //to copy existing data
        selectedProjectId: undefined,
      };
    });
  }; //on clicking cancel button we again set state back to undef so that fallback component display

  const handleSelectProject = (id) => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }; //when we select a project from sidebar and want to display its info

  //to find an element by id
  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  const handleDelete = (id) => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((item) => item.id !== id), //filter out the project with the given id
      };
    });
  };

  const handleAddTask = (text) => {
    setProjectsState((prevState) => {
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        TaskId: Math.random(),
      };
      return {
        ...prevState, //to copy existing data
        tasks: [...prevState.tasks, newTask],
      };
    });
  }; //we send task here and than collect it in tasks array

  const handleDeleteTask = (id) => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.TaskId !== id), //filter out the project with the given id
      };
    });
  };

  console.log(projectsState);

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
      />
      {projectsState.selectedProjectId === null && (
        <NewProject onAdd={handleAddProject} onCancel={handleCancelProject} />
      )}
      {projectsState.selectedProjectId === undefined && (
        <NoProjectSelected onStartAddProject={handleStartAddProject} />
      )}

      {projectsState.selectedProjectId && (
        <SelectedProject
          project={selectedProject}
          onDelete={handleDelete}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          tasks={projectsState.tasks}
        />
      )}
    </main>
  );
}

export default App;
