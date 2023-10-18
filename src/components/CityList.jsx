import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CityContext";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }
  if (cities.length === 0)
    return <Message message="add your city by ckicking on a ciry on the map" />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city, index) => {
        return <CityItem key={index} city={city} />;
      })}
    </ul>
  );
}

export default CityList;
