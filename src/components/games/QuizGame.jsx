import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const questions = [
  {
    question: 'When was JAXA (Japan Aerospace Exploration Agency) founded?',
    options: ['1969', '1998', '2003', '2010'],
    correct: 2,
    explanation: 'JAXA was founded on October 1, 2003, by merging three organizations: NASDA (National Space Development Agency), ISAS (Institute of Space and Astronautical Science), and NAL (National Aerospace Laboratory).',
  },
  {
    question: 'What is the name of Japan\'s space-based solar power initiative?',
    options: ['Project SUNRISE', 'Project SOLARIS', 'Project HELIOS', 'Project AURORA'],
    correct: 1,
    explanation: 'Project SOLARIS is JAXA\'s initiative to develop Space-Based Solar Power (SBSP) technology for large-scale clean energy production.',
  },
  {
    question: 'At what altitude would the SOLARIS satellite orbit Earth?',
    options: ['400 km (ISS orbit)', '2,000 km', '36,000 km', '384,000 km'],
    correct: 2,
    explanation: 'The satellite would be in geostationary orbit at approximately 36,000 km above Earth. At this altitude, it stays fixed over one location, allowing continuous energy beaming to a ground station.',
  },
  {
    question: 'How is energy transmitted from space to Earth in the SOLARIS concept?',
    options: ['Physical cables', 'Microwave or laser beams', 'Radio waves at AM frequency', 'Gravity-assisted tubes'],
    correct: 1,
    explanation: 'The energy is converted to microwave radiation (at 5.8 GHz) or laser beams and wirelessly transmitted to ground-based receiving stations called rectennas.',
  },
  {
    question: 'How many hours per day can a space solar panel collect sunlight?',
    options: ['8 hours', '12 hours', '18 hours', '24 hours'],
    correct: 3,
    explanation: 'In geostationary orbit, solar panels receive direct, uninterrupted sunlight 24 hours a day — there\'s no night, clouds, or atmosphere to block the sun.',
  },
  {
    question: 'What is the target year for SOLARIS operational deployment?',
    options: ['2025', '2030', '2040–2050', '2100'],
    correct: 2,
    explanation: 'JAXA\'s roadmap targets an operational space-based solar power station by 2040–2050, capable of powering hundreds of thousands of homes.',
  },
  {
    question: 'What is a "rectenna"?',
    options: ['A type of rocket engine', 'A receiving antenna that converts microwaves to electricity', 'A Japanese satellite model', 'A solar panel cleaning robot'],
    correct: 1,
    explanation: 'A rectenna (rectifying antenna) is a ground-based receiving station that captures the microwave beam from space and converts it back into usable electricity.',
  },
  {
    question: 'Where is Japan\'s main rocket launch facility located?',
    options: ['Hokkaido', 'Tokyo Bay', 'Tanegashima Island', 'Mount Fuji'],
    correct: 2,
    explanation: 'Tanegashima Space Center, located on Tanegashima Island in southern Japan, is JAXA\'s primary launch facility for orbital rockets including H-IIA, H-IIB, and H3.',
  },
  {
    question: 'How much stronger is solar intensity in space compared to Earth\'s surface?',
    options: ['About the same', '2x stronger', '5–10x stronger', '100x stronger'],
    correct: 2,
    explanation: 'Solar intensity in space is approximately 5 to 10 times stronger than average ground-level irradiance because there\'s no atmosphere absorbing or scattering the sunlight.',
  },
  {
    question: 'What was Japan\'s Hayabusa mission famous for?',
    options: ['First Moon landing', 'First asteroid sample return', 'First Mars rover', 'First space station'],
    correct: 1,
    explanation: 'The Hayabusa spacecraft (2003–2010) successfully returned samples from asteroid Itokawa to Earth — the world\'s first asteroid sample return mission.',
  },
];

export default function QuizGame() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const handleSelect = (index) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
    if (index === q.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel rounded-xl p-10 text-center border border-primary/20"
      >
        <Trophy className="w-16 h-16 text-primary mx-auto mb-6" />
        <h2 className="font-heading text-3xl font-bold mb-2">Mission Complete!</h2>
        <p className="text-muted-foreground mb-6">
          You scored <span className="text-primary font-bold">{score}/{questions.length}</span> ({pct}%)
        </p>
        <div className="text-sm text-muted-foreground mb-8">
          {pct >= 80 ? 'Outstanding! You\'re ready for JAXA officer certification.' :
           pct >= 50 ? 'Good work! Review the material and try again for a perfect score.' :
           'Keep studying! Check out the Fun Facts and About pages for more information.'}
        </div>
        <Button onClick={restart} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
          <RotateCcw className="w-4 h-4" /> Retry Mission
        </Button>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-xs text-accent tracking-widest">
          QUESTION {current + 1} / {questions.length}
        </span>
        <span className="font-mono text-xs text-primary tracking-widest">
          SCORE: {score}
        </span>
      </div>
      <div className="w-full h-1 bg-secondary rounded-full mb-8">
        <div
          className="h-1 bg-primary rounded-full transition-all duration-500"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="font-heading text-xl sm:text-2xl font-semibold mb-8">{q.question}</h3>
          <div className="grid gap-3">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correct;
              const isSelected = i === selected;
              let classes = 'glass-panel rounded-lg p-4 text-left transition-all duration-300 cursor-pointer border';
              if (showResult) {
                if (isCorrect) classes += ' border-green-500/50 bg-green-500/10';
                else if (isSelected && !isCorrect) classes += ' border-red-500/50 bg-red-500/10';
                else classes += ' border-border/30 opacity-50';
              } else {
                classes += ' border-border/30 hover:border-accent/40 hover:bg-accent/5';
              }

              return (
                <button key={i} onClick={() => handleSelect(i)} className={classes}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted-foreground w-6">{String.fromCharCode(65 + i)}.</span>
                      <span className="text-sm">{opt}</span>
                    </div>
                    {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                    {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 glass-panel-gold rounded-lg p-5 border border-primary/20"
            >
              <span className="font-mono text-[10px] text-primary tracking-widest block mb-2">EXPLANATION</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{q.explanation}</p>
            </motion.div>
          )}

          {showResult && (
            <div className="mt-6 flex justify-end">
              <Button onClick={handleNext} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                {current + 1 >= questions.length ? 'See Results' : 'Next Question'} <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}