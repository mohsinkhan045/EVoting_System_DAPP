import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import HeroSection from "./components/Section/Section";
import Candidate from "./components/Candidates/Candidates";
import Voters from "./components/Votes/Votes";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import About from "./components/About/About";

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact component={HeroSection} />
        <Route path="/candidates" exact component={Candidate} />
        <Route path="/votes" exact component={Voters} />
        <Route path="/footer" exact component={Contact} />
        <Route path="/about" exact component={About} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
