import { useEffect, useState } from "react";

function App() {
  const [number, setNumber] = useState(1);
  const [firstCurrency, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("EUR");
  const [resultConverter, setResultConverter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const url = `https://api.frankfurter.app/latest?amount=${number}&from=${firstCurrency}&to=${secondCurrency}`;
    const fetchCurrency = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setResultConverter(data.rates[secondCurrency]);
        setIsLoading(false);
      } catch (err) {
        console.log("Error fetching currency", err);
      }
    };

    if (firstCurrency === secondCurrency) return setResultConverter(number);
    setIsLoading(true);
    fetchCurrency();
  }, [number, firstCurrency, secondCurrency]);

  return (
    <div className="App">
      <input
        placeholder="type number"
        type="text"
        value={number}
        onChange={(event) => {
          if (isNaN(event.target.value)) {
            setResultConverter("Введите число");
          } else {
            setNumber(event.target.value);
          }
        }}
        disabled={isLoading}
      ></input>
      <select
        name="first-number"
        id="first-number"
        onChange={(event) => setFirstCurrency(event.target.value)}
        value={firstCurrency}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="BGN">BGN</option>
        <option value="CZK">CZK</option>
      </select>
      <select
        name="second-number"
        id="second-number"
        onChange={(event) => setSecondCurrency(event.target.value)}
        value={secondCurrency}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="BGN">BGN</option>
        <option value="CZK">CZK</option>
      </select>

      {isLoading ? <p>Loading...</p> : <p>{resultConverter}</p>}
    </div>
  );
}

export default App;
