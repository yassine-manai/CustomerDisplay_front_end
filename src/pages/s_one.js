import InfoContainer from "../components/InfoComp";
import '../styles/s_one.css';


function S_ONE() {

    const locationData = {
        iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/bd134da79b4287c378621cc11a38dc61c6af1b036b1f38172c4ae4602455f6fa?apiKey=3a9f9b98de3f493789d8094471d44942&",
        name: "PUMC Carpark",
        exit: "- Exit 705"
      };

      
  return (
    <div className="container">
      <InfoContainer location={locationData} />

      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e11a681a7f660ed53f19d72bb4f34cf40abfbfad147f9278cec9a79b25e4a582?apiKey=3a9f9b98de3f493789d8094471d44942&"
        alt="Map"
        className="map-image"
      />
    </div>
  );
}

export default S_ONE;
