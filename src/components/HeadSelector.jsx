import { useState } from "react";

function HeadSelector() {
  const [region, setRegion] = useState("");

  return (
    <div>
      <h2>Select Head Region</h2>

      <button onClick={() => setRegion("Front")}>Front</button>
      <button onClick={() => setRegion("Side")}>Side</button>
      <button onClick={() => setRegion("Back")}>Back</button>
      <button onClick={() => setRegion("Top")}>Top</button>

      <p>Selected: {region}</p>
    </div>
  );
}

export default HeadSelector;