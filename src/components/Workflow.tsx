const STEPS = [
  { title: 'מעלים PDF', body: 'פותחים את תוכנית העבודה בדפדפן.' },
  { title: 'מכיילים', body: 'מסמנים מרחק ידוע ומגדירים את האורך האמיתי.' },
  { title: 'מסמנים', body: 'מודדים ומסמנים חדרים, שטחים או אלמנטים על התוכנית.' },
  { title: 'מחשבים', body: 'מגדירים את פרטי העבודה ובודקים את הכמויות ואת סיכומי הפרויקט.' },
  { title: 'מפיקים דוח', body: 'מייצאים דוחות PDF וכמויות ל־Excel.' },
]

export function Workflow() {
  return (
    <section className="landing-section workflow" id="takeoff" aria-labelledby="workflow-title">
      <div className="section-heading">
        <p className="section-kicker">מהתוכנית לכמויות</p>
        <h2 id="workflow-title">חמישה צעדים. תוכנית שאפשר לעבוד איתה.</h2>
        <p>התוכנית נשארת במרכז: מודדים, מוסיפים סימונים, מחשבים כמויות ומרכזים את העבודה בפרויקט.</p>
      </div>
      <ol className="workflow-steps">
        {STEPS.map((step, i) => <li key={step.title}><span className="step-number" dir="ltr">0{i + 1}</span><h3>{step.title}</h3><p>{step.body}</p></li>)}
      </ol>
    </section>
  )
}
