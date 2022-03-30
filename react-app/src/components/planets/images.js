import mars from "../../../assets/planets/mars.png";
import jupiter from "../../../assets/planets/jupiter.png";
import earth from "../../../assets/planets/earth.png";
import mercury from "../../../assets/planets/mercury.png";
import moon from "../../../assets/planets/moon.png";
import neptune from "../../../assets/planets/neptune.png";
import pluto from "../../../assets/planets/pluto.png";
import saturn from "../../../assets/planets/saturn.png";
import uranus from "../../../assets/planets/uranus.png";
import venus from "../../../assets/planets/venus.png";
import sun from "../../../assets/planets/sun.png";
import ic from "../../../assets/planets/ic.png";
import ngc from "../../../assets/planets/ngc.png";
import messier from "../../../assets/planets/messier.png";
import asteroid from "../../../assets/planets/asteroid.png";
import galaxy from "../../../assets/planets/galaxy.png";
import meteor from "../../../assets/planets/meteor.png";
import rocket from "../../../assets/planets/rocket.png";
import satelite from "../../../assets/planets/satelite.png";
import star from "../../../assets/planets/star.png";
import station from "../../../assets/planets/station.png";
import telescope from "../../../assets/planets/telescope.png";
const planetList = {
  asteroid,
  galaxy,
  meteor,
  rocket,
  satelite,
  star,
  station,
  telescope,
  mars,
  jupiter,
  earth,
  mercury,
  moon,
  sun,
  neptune,
  pluto,
  saturn,
  uranus,
  venus,
  ic,
  ngc,
  messier,
};
export const Planet = (name) => {
  return planetList[name];
};
