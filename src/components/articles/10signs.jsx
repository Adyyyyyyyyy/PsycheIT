// src/components/articles/10Signs.jsx
import React from "react";

const TenSigns = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ color: "#003366" }}>
        10 Signs You Might Be Struggling with Depression or Stress
      </h1>
      <p>
        It’s normal to feel tired or low sometimes. But when these feelings last
        for weeks and start affecting your daily life, it might be a sign of
        depression, burnout, or stress. Knowing the signs early can help you
        take steps toward feeling better.
      </p>

      {/* Sign 1 */}
      <h2>1. Persistent Sadness</h2>
      <p>
        Waking up feeling low or empty most days for over two weeks.
        <br />
        <strong>Example:</strong> Once excited to start the day, now you feel
        weighed down each morning.
        <br />
        <strong>Tip:</strong> Keep a mood diary to track patterns.
      </p>

      {/* Sign 2 */}
      <h2>2. Loss of Interest or Pleasure</h2>
      <p>
        Activities you once loved now feel dull or meaningless.
        <br />
        <strong>Example:</strong> A music lover no longer picks up their guitar.
        <br />
        <strong>Tip:</strong> Try reintroducing small joys — even for a few
        minutes a day.
      </p>

      {/* Sign 3 */}
      <h2>3. Extreme Fatigue</h2>
      <p>
        Feeling drained even after rest.
        <br />
        <strong>Example:</strong> Sitting in your car outside a store because
        you can’t find the energy to go in.
        <br />
        <strong>Tip:</strong> Break tasks into smaller steps.
      </p>

      {/* Sign 4 */}
      <h2>4. Difficulty Functioning in Daily Life</h2>
      <p>
        Struggling with work, school, or personal care.
        <br />
        <strong>Example:</strong> Missing deadlines or avoiding house chores.
        <br />
        <strong>Tip:</strong> Use to-do lists for small wins.
      </p>

      {/* Sign 5 */}
      <h2>5. Thoughts of Self-Harm or Suicide</h2>
      <p>
        Feeling hopeless or believing others are better off without you.
        <br />
        <strong>Tip:</strong> <span style={{ color: "red" }}>
          Seek immediate help
        </span>{" "}
        — call a helpline or speak to someone you trust.
      </p>

      {/* Sign 6 */}
      <h2>6. Withdrawal from Friends and Family</h2>
      <p>
        Avoiding calls, canceling plans.
        <br />
        <strong>Example:</strong> Saying “too busy” but actually feeling
        emotionally drained.
        <br />
        <strong>Tip:</strong> Start with a simple text or call.
      </p>

      {/* Sign 7 */}
      <h2>7. Changes in Sleep or Appetite</h2>
      <p>
        Sleeping too much or too little, eating far more or less than usual.
        <br />
        <strong>Example:</strong> Staying in bed all weekend or skipping meals.
      </p>

      {/* Sign 8 */}
      <h2>8. Feeling Worthless or Guilty</h2>
      <p>
        Blaming yourself for everything.
        <br />
        <strong>Example:</strong> Believing you “ruin everything” after a small
        mistake.
        <br />
        <strong>Tip:</strong> Ask yourself, “Would I say this to a friend?”
      </p>

      {/* Sign 9 */}
      <h2>9. Trouble Concentrating</h2>
      <p>
        Losing focus easily.
        <br />
        <strong>Example:</strong> Rereading the same paragraph multiple times.
      </p>

      {/* Sign 10 */}
      <h2>10. Physical Signs of Stress</h2>
      <p>
        Headaches, stomach issues, tense muscles, or frequent illnesses.
      </p>

      {/* Key Takeaway */}
      <div
        style={{
          background: "#C6F2EC",
          padding: "15px",
          borderRadius: "8px",
          marginTop: "30px",
        }}
      >
        <h3>Key Takeaway</h3>
        <p>
          If several of these signs sound familiar, you’re not alone — and help
          is available. Talking to a counselor or loved one can be the first
          step to feeling better.
        </p>
      </div>

      {/* Visual Suggestions */}
      <div
        style={{
          background: "#FBEFF5",
          padding: "15px",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      >
        <h3>Visual Suggestions</h3>
        <ul>
          <li>Infographic: 10 Signs of Burnout & Depression</li>
          <li>Diagram: Traffic light chart (mild → moderate → severe)</li>
          <li>Vector image: Person with thought clouds above head</li>
        </ul>
      </div>
    </div>
  );
};

export default TenSigns;
