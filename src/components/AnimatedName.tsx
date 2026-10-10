const PHRASES = [
  'Building useful products.',
  'Turning ideas into real-world applications.',
  'Exploring scalable systems.',
  'Always learning something new.',
];

interface PhraseListProps {
  activeIndex: number;
  reducedMotion: boolean;
}

export default function PhraseList({ activeIndex, reducedMotion }: PhraseListProps) {
  return (
    <div className="hero__phrases" role="list" aria-label="What I do">
      {PHRASES.map((phrase, i) => (
        <div
          key={phrase}
          className={`hero__phrase${i === activeIndex ? ' active' : ''}`}
          role="listitem"
          aria-current={i === activeIndex ? 'true' : undefined}
        >
          <span className="phrase-bracket">[</span>
          <span className="phrase-text">{phrase}</span>
          <span className="phrase-bracket">]</span>
        </div>
      ))}
    </div>
  );
}

export { PHRASES };
