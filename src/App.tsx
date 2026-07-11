import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { ExperienceRoot } from './components/experience/ExperienceRoot';
import { About } from './components/sections/About';
import { Capabilities } from './components/sections/Capabilities';
import { Contact } from './components/sections/Contact';
import { Education } from './components/sections/Education';
import { Experience } from './components/sections/Experience';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';

function App() {
  return (
    <ExperienceRoot>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Experience />
        <Capabilities />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </ExperienceRoot>
  );
}

export default App;
