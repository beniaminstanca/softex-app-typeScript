import "./Home.scss";
import LogoTitle from '../../assets/images/logo-s.png'

const Home = () => {
  return (
    <div className="container home-page">
      <div className="text-zone">
        <h1>Hi, <br /> I'm
        <img src={LogoTitle} alt="developer" />
        tanca
        <br />
        web developer
        </h1>
        <h2>Full Stack Developer / JAVA SCRIPT / NODEJS / REACT</h2>
      </div>
    </div>
  );
};

export default Home;
