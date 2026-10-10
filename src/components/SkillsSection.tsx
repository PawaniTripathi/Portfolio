import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Layers, Wrench, Heart } from 'lucide-react';

const categories = [
  { icon: Code,   name: 'Languages',             items: ['C++','Python','JavaScript','TypeScript','HTML','CSS','Java','C'] },
  { icon: Layers, name: 'Frameworks & Libraries', items: ['Node.js','Express.js','React.js','Socket.IO','Next.js','Tailwind CSS'] },
  { icon: Wrench, name: 'Tools & Platforms',      items: ['PostgreSQL','MongoDB','Git/GitHub','Postman','Vercel','Render','Docker'] },
  { icon: Heart,  name: 'Soft Skills',            items: ['Problem-Solving','Time Management','Adaptability','Communication'] },
];

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <section id="skills" className="skills section-py" ref={ref} aria-labelledby="skills-heading">
      <div className="container">
        <div className="section-header">
          <p className="section-label">Skills</p>
          <h2 id="skills-heading" className="section-title">Tools I work with.</h2>
        </div>
        <div className="skills__grid">
          {categories.map(({ icon: Icon, name, items }, i) => (
            <motion.div
              key={name}
              className="skills__cat"
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="skills__cat-hdr">
                <div className="skills__cat-icon" aria-hidden="true"><Icon size={14} /></div>
                <h3 className="skills__cat-name">{name}</h3>
              </div>
              <div className="skills__items" role="list">
                {items.map((item) => (
                  <span key={item} className="skill-item" role="listitem">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
