import { useState } from 'react'
import "./ResourcesPage.css";
const PHQ9Questionnaire = () => {
  const [answers, setAnswers] = useState(Array(9).fill(0));
  const [score, setScore] = useState(null);
  
  const questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading the newspaper or watching television",
    "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
    "Thoughts that you would be better off dead or of hurting yourself in some way"
  ];
  
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = parseInt(value);
    setAnswers(newAnswers);
  };
  
  const calculateScore = () => {
    const total = answers.reduce((sum, value) => sum + value, 0);
    setScore(total);
  };
  
  const getSeverity = (score) => {
    if (score >= 20) return "Severe depression";
    if (score >= 15) return "Moderately severe depression";
    if (score >= 10) return "Moderate depression";
    if (score >= 5) return "Mild depression";
    return "Minimal depression";
  };
  
  return (
    <div className="questionnaire">
      <div className="questionnaire-header">
        <h4>PHQ-9 Depression Questionnaire</h4>
        <p>Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>
      </div>
      
      <div className="questions-container">
        {questions.map((question, index) => (
          <div key={index} className="question">
            <p>{question}</p>
            <div className="options">
              {[0, 1, 2, 3].map((value) => (
                <label key={value}>
                  <input
                    type="radio"
                    name={`phq9-${index}`}
                    value={value}
                    checked={answers[index] === value}
                    onChange={() => handleAnswerChange(index, value)}
                  />
                  <span>
                    {value === 0 && "Not at all"}
                    {value === 1 && "Several days"}
                    {value === 2 && "More than half the days"}
                    {value === 3 && "Nearly every day"}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <button className="calculate-btn" onClick={calculateScore}>
        Calculate Score
      </button>
      
      {score !== null && (
        <div className="results">
          <h4>Your PHQ-9 Score: {score}</h4>
          <p>Severity: {getSeverity(score)}</p>
          <div className="score-interpretation">
            <p><strong>Interpretation:</strong></p>
            <ul>
              <li>0-4: Minimal depression</li>
              <li>5-9: Mild depression</li>
              <li>10-14: Moderate depression</li>
              <li>15-19: Moderately severe depression</li>
              <li>20-27: Severe depression</li>
            </ul>
            <p className="disclaimer">
              This is a screening tool only and not a diagnostic instrument. 
              Please consult with a mental health professional for a complete assessment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default PHQ9Questionnaire;