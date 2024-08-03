import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (event) => {
    setFormData(event.target.value);
  };

  const handleSubmit = async () => {
    try {

      let parsedData;
    try {
      parsedData = JSON.parse(formData);
    } catch (parseError) {
      console.error('Invalid JSON:', parseError);
      alert('Please enter valid JSON data');
      return;
    }
    
      console.log(formData);
      const response = await axios.post('http://localhost:5000/bfhl',  JSON.parse(formData) );
      setResponseData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOptions(Array.from(event.target.selectedOptions, (option) => option.value));
  };

  return (
    <div className="App">
      <input className="input-field" type="text" value={formData} onChange={handleInputChange} placeholder="Enter JSON data" />
      <button className="submit-button" onClick={handleSubmit}>Submit</button>

      {responseData && (
        <div>
          <select className="dropdown" multiple onChange={handleOptionChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>

          <div className="response-container">
            {selectedOptions.includes('alphabets') && <p>Alphabets: {responseData.alphabets.join(', ')}</p>}
            {selectedOptions.includes('numbers') && <p>Numbers: {responseData.numbers.join(', ')}</p>}
            {selectedOptions.includes('highest_alphabet') && <p>Highest Alphabet: {responseData.highest_alphabet.join(', ')}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
