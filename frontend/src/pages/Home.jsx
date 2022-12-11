
import ClientPostModal from "../components/ClientPostModal";
import Clients from "../components/Clients";
import ProjectPostModal from "../components/ProjectPostModal";
import Projects from "../components/Projects";

export default function Home() {
  return (
    <>
      <div>
        <p className="display-6 text-center">Projects</p>
        <ProjectPostModal className="mt-4"></ProjectPostModal>
        <Projects/>
      </div>
      <hr />
      <div>
        <p className="display-6 text-center">Clients</p>
        <ClientPostModal className="mt-4"></ClientPostModal>
        <Clients/>
      </div>
    </>
  )
}
