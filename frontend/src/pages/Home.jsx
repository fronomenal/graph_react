
import ClientPostModal from "../components/ClientPostModal";
import Clients from "../components/Clients";
import Projects from "../components/Projects";

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <ClientPostModal></ClientPostModal>
      </div>
        <Projects/>
        <hr />
        <Clients/>
    </>
  )
}
