import React, { useState } from 'react'

type Question = {
  text: string
  yes: string
  no: string
  illustration: React.ReactNode
  eliminateOnYes: string[]
  eliminateOnNo: string[]
}

const RotationSymmetry = ({ order = 6 }) => (
  <svg width="200" height="200" viewBox="0 0 200 200">
    <defs>
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0 100 100"
        to={`${360 / order} 100 100`}
        dur="4s"
        repeatCount="indefinite"
      />
    </defs>
    <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" />
    {[...Array(order)].map((_, i) => (
      <g key={i} transform={`rotate(${(360 / order) * i} 100 100)`}>
        <path d="M100 20L100 60" stroke="currentColor" strokeWidth="2" />
        <path d="M90 50L100 60L110 50" fill="none" stroke="currentColor" strokeWidth="2" />
      </g>
    ))}
  </svg>
)

const ReflectionSymmetry = () => (
  <svg width="200" height="200" viewBox="0 0 200 200">
    <rect x="20" y="20" width="160" height="160" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M100 20L100 180" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
    <path d="M60 60C80 80 80 120 60 140" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M140 60C120 80 120 120 140 140" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
)

const GlideReflection = () => (
  <svg width="200" height="200" viewBox="0 0 200 200">
    <defs>
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="translate"
        values="0,0; 40,0; 0,0"
        dur="4s"
        repeatCount="indefinite"
      />
    </defs>
    <rect x="20" y="20" width="160" height="160" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M20 100L180 100" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
    <g>
      <path d="M60 60L80 80L60 100" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M60 140L80 120L60 100" fill="none" stroke="currentColor" strokeWidth="2" />
    </g>
  </svg>
)

const questions: { [key: string]: Question } = {
  start: {
    text: "Are there 6-fold rotational symmetries (60°)?",
    yes: "reflections6",
    no: "rotation3",
    illustration: <RotationSymmetry order={6} />,
    eliminateOnYes: ["p1", "p2", "pm", "pg", "cm", "pmm", "pmg", "pgg", "cmm", "p3", "p3m1", "p31m", "p4", "p4m", "p4g"],
    eliminateOnNo: ["p6", "p6m"]
  },
  reflections6: {
    text: "Are there reflections?",
    yes: "p6m",
    no: "p6",
    illustration: <ReflectionSymmetry />,
    eliminateOnYes: ["p6"],
    eliminateOnNo: ["p6m"]
  },
  rotation3: {
    text: "Are there 3-fold rotational symmetries (120°)?",
    yes: "reflections3",
    no: "rotation4",
    illustration: <RotationSymmetry order={3} />,
    eliminateOnYes: ["p1", "p2", "pm", "pg", "cm", "pmm", "pmg", "pgg", "cmm", "p4", "p4m", "p4g"],
    eliminateOnNo: ["p3", "p3m1", "p31m"]
  },
  reflections3: {
    text: "Are there reflections?",
    yes: "reflection3centers",
    no: "p3",
    illustration: <ReflectionSymmetry />,
    eliminateOnYes: ["p3"],
    eliminateOnNo: ["p3m1", "p31m"]
  },
  reflection3centers: {
    text: "Does the center of every 3-fold rotational symmetry lie on a line of reflection?",
    yes: "p3m1",
    no: "p31m",
    illustration: <ReflectionSymmetry />,
    eliminateOnYes: ["p31m"],
    eliminateOnNo: ["p3m1"]
  },
  rotation4: {
    text: "Are there 4-fold rotational symmetries (90°)?",
    yes: "reflections4",
    no: "rotation2",
    illustration: <RotationSymmetry order={4} />,
    eliminateOnYes: ["p1", "p2", "pm", "pg", "cm", "pmm", "pmg", "pgg", "cmm"],
    eliminateOnNo: ["p4", "p4m", "p4g"]
  },
  reflections4: {
    text: "Are there reflections?",
    yes: "reflection4centers",
    no: "p4",
    illustration: <ReflectionSymmetry />,
    eliminateOnYes: ["p4"],
    eliminateOnNo: ["p4m", "p4g"]
  },
  reflection4centers: {
    text: "Does the center of every 4-fold rotational symmetry lie on a line of reflection?",
    yes: "p4m",
    no: "p4g",
    illustration: <ReflectionSymmetry />,
    eliminateOnYes: ["p4g"],
    eliminateOnNo: ["p4m"]
  },
  rotation2: {
    text: "Are there half-turn rotational symmetries (180°)?",
    yes: "reflections2",
    no: "reflections0",
    illustration: <RotationSymmetry order={2} />,
    eliminateOnYes: ["p1", "pm", "pg", "cm"],
    eliminateOnNo: ["p2", "pmm", "pmg", "pgg", "cmm"]
  },
  reflections2: {
    text: "Are there reflections?",
    yes: "reflection2centers",
    no: "glideReflections2",
    illustration: <ReflectionSymmetry />,
    eliminateOnYes: ["p2", "pgg"],
    eliminateOnNo: ["pmm", "pmg", "cmm"]
  },
  reflection2centers: {
    text: "Does the center of SOME half-turn symmetry lie on a line of reflection?",
    yes: "reflectionAllCenters",
    no: "pmg",
    illustration: <ReflectionSymmetry />,
    eliminateOnYes: ["pmg"],
    eliminateOnNo: ["pmm", "cmm"]
  },
  reflectionAllCenters: {
    text: "Does the center of EVERY half-turn rotational symmetry lie on a line of reflection?",
    yes: "pmm",
    no: "cmm",
    illustration: <ReflectionSymmetry />,
    eliminateOnYes: ["cmm"],
    eliminateOnNo: ["pmm"]
  },
  glideReflections2: {
    text: "Are there glide reflections?",
    yes: "pgg",
    no: "p2",
    illustration: <GlideReflection />,
    eliminateOnYes: ["p2"],
    eliminateOnNo: ["pgg"]
  },
  reflections0: {
    text: "Are there reflections?",
    yes: "glideReflectionAxis",
    no: "glideReflections0",
    illustration: <ReflectionSymmetry />,
    eliminateOnYes: ["p1", "pg"],
    eliminateOnNo: ["pm", "cm"]
  },
  glideReflectionAxis: {
    text: "Is there a glide reflection whose axis is not a line of reflection?",
    yes: "cm",
    no: "pm",
    illustration: <GlideReflection />,
    eliminateOnYes: ["pm"],
    eliminateOnNo: ["cm"]
  },
  glideReflections0: {
    text: "Are there glide reflections?",
    yes: "pg",
    no: "p1",
    illustration: <GlideReflection />,
    eliminateOnYes: ["p1"],
    eliminateOnNo: ["pg"]
  }
}

const groupDescriptions: { [key: string]: string } = {
  p1: "The simplest wallpaper group, containing only translations.",
  p2: "Has four distinct points of two-fold rotational symmetry.",
  pm: "Has two distinct, simple reflections that are parallel and no rotations.",
  pg: "Has two distinct glide reflections that are all parallel and no simple reflections.",
  cm: "Has one distinct simple reflection parallel to one distinct glide reflection.",
  pmm: "Has simple reflections in perpendicular directions and four distinct two-fold rotation centers.",
  pmg: "Has two distinct centers of two-fold rotation, mirror lines in one direction, and perpendicular glide reflection lines.",
  pgg: "Has two distinct centers of two-fold rotation, no simple reflections, and two perpendicular glide reflection lines.",
  cmm: "Has three distinct centers of two-fold rotation, mirror lines and glide reflection lines in two perpendicular directions.",
  p3: "Has three distinct centers of three-fold rotation, no simple reflections, and no glide reflections.",
  p4: "Has one center of two-fold rotation, two distinct centers of four-fold rotation, no simple reflections, and no glide reflections.",
  p4m: "Has centers of two-fold and four-fold rotation, simple reflections in four directions, and two glide reflections.",
  p4g: "Has centers of two-fold and four-fold rotation, simple reflections in two perpendicular directions, and glide reflections in four directions.",
  p3m1: "Has three distinct centers of three-fold rotation, simple reflections in three directions, and glide reflections.",
  p31m: "Similar to p3m1, but at least one rotation center does not lie on a reflection axis.",
  p6: "Has centers of six-fold, three-fold, and two-fold rotations with no simple reflections or glide reflections.",
  p6m: "Has centers of six-fold, three-fold, and two-fold rotations, simple reflections in six directions, and glide reflections."
}

type CardProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const Card: React.FC<CardProps> = ({ children, style }) => (
  <div className="card" style={style}>
    {children}
  </div>
)

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'outline';
  style?: React.CSSProperties;
};

const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'default', style }) => (
  <button
    onClick={onClick}
    className={`button ${variant === 'outline' ? 'button-outline' : ''}`}
    style={style}
    aria-label={typeof children === 'string' ? children : undefined}
  >
    {children}
  </button>
)

export default function WallpaperGroupIdentifier() {
  const [currentQuestion, setCurrentQuestion] = useState('start')
  const [identified, setIdentified] = useState<string | null>(null)
  const [eliminatedGroups, setEliminatedGroups] = useState<string[]>([])
  const [showRemainingGroups, setShowRemainingGroups] = useState(true)

  const handleAnswer = (answer: 'yes' | 'no') => {
    const nextQuestion = questions[currentQuestion][answer]
    const newEliminatedGroups = [
      ...eliminatedGroups,
      ...(answer === 'yes' ? questions[currentQuestion].eliminateOnYes : questions[currentQuestion].eliminateOnNo)
    ]
    setEliminatedGroups(newEliminatedGroups)

    if (groupDescriptions[nextQuestion]) {
      setIdentified(nextQuestion)
    } else {
      setCurrentQuestion(nextQuestion)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion('start')
    setIdentified(null)
    setEliminatedGroups([])
  }

  const toggleRemainingGroups = () => {
    setShowRemainingGroups(!showRemainingGroups)
  }

  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.027)',
      color: '#2c3e50',
      minHeight: '100vh',
      padding: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Card style={{
        backgroundColor: '#ffffff',
        borderRadius: '15px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        maxWidth: '800px',
        width: '90%'
      }}>
        <div className="header" style={{textAlign: 'center', marginBottom: '2rem'}}>
          <h2 style={{fontSize: '2.5rem', color: '#1a2a3a', marginBottom: '0.5rem'}}>Wallpaper Group Identifier</h2>
          <p style={{color: '#34495e', fontSize: '1.1rem'}}>Answer the questions to identify your wallpaper group</p>
        </div>
        <div className="content" style={{backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '1.5rem'}}>
          {identified ? (
            <div className="result" style={{backgroundColor: '#ffffff', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'}}>
              <h3 style={{fontSize: '1.3rem', fontWeight: 'bold', color: '#2c3e50', marginBottom: '1rem'}}>Your wallpaper group is: {identified}</h3>
              <p style={{color: '#34495e'}}>{groupDescriptions[identified]}</p>
              <div className="illustration">
                <RotationSymmetry order={['p3', 'p3m1', 'p31m'].includes(identified) ? 3 : ['p4', 'p4m', 'p4g'].includes(identified) ? 4 : ['p6', 'p6m'].includes(identified) ? 6 : 2} />
              </div>
            </div>
          ) : (
            <div className="question" style={{backgroundColor: '#ffffff', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'}}>
              <h3 style={{fontSize: '1.3rem', fontWeight: 'bold', color: '#2c3e50', marginBottom: '1rem'}}>{questions[currentQuestion].text}</h3>
              <div className="illustration">
                {questions[currentQuestion].illustration}
              </div>
              <div className="buttons" style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
                <Button onClick={() => handleAnswer('yes')} style={{backgroundColor: '#3498db', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer'}}>Yes</Button>
                <Button onClick={() => handleAnswer('no')} style={{backgroundColor: '#3498db', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer'}}>No</Button>
              </div>
            </div>
          )}
          <div className="remaining-groups" style={{marginTop: '1.5rem'}}>
            <Button 
              onClick={toggleRemainingGroups}
              variant="outline"
              style={{backgroundColor: 'transparent', color: '#3498db', border: '2px solid #3498db', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer'}}
            >
              {showRemainingGroups ? 'Hide' : 'Show'} Remaining Groups
              {showRemainingGroups ? ' ▲' : ' ▼'}
            </Button>
            {showRemainingGroups && (
              <div className="groups-list" style={{backgroundColor: '#ffffff', borderRadius: '8px', padding: '1.5rem', marginTop: '1rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'}}>
                <h4 style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#2c3e50', marginBottom: '1rem'}}>Remaining Wallpaper Groups:</h4>
                <div className="groups" style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                  {Object.keys(groupDescriptions).map((group) => (
                    <span
                      key={group}
                      style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        backgroundColor: eliminatedGroups.includes(group) ? '#ecf0f1' : '#3498db',
                        color: eliminatedGroups.includes(group) ? '#95a5a6' : 'white',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        textDecoration: eliminatedGroups.includes(group) ? 'line-through' : 'none'
                      }}
                    >
                      {group}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="footer" style={{marginTop: '2rem', textAlign: 'center'}}>
          <Button onClick={resetQuiz} style={{backgroundColor: '#3498db', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer'}}>Start Over</Button>
        </div>
      </Card>
    </div>
  );
}
