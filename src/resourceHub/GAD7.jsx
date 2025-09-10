import { useState } from 'react'
import "./ResourcesPage.css";
const GAD7Questionnaire = () => {
  const [answers, setAnswers] = useState(Array(7).fill(0));
  const [score, setScore] = useState(null);
  
  const questions = [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it is hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid as if something awful might happen"
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
    if (score >= 15) return "Severe anxiety";
    if (score >= 10) return "Moderate anxiety";
    if (score >= 5) return "Mild anxiety";
    return "Minimal anxiety";
  };
  
  return (
    <div className="questionnaire">
      <div className="questionnaire-header">
        <h4>GAD-7 Anxiety Questionnaire</h4>
        <p>Over the last 2 weeks, how often have you been bothered by the following problems?</p>
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
                    name={`gad7-${index}`}
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
          <h4>Your GAD-7 Score: {score}</h4>
          <p>Severity: {getSeverity(score)}</p>
          <div className="score-interpretation">
            <p><strong>Interpretation:</strong></p>
            <ul>
              <li>0-4: Minimal anxiety</li>
              <li>5-9: Mild anxiety</li>
              <li>10-14: Moderate anxiety</li>
              <li>15-21: Severe anxiety</li>
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
export default GAD7Questionnaire;