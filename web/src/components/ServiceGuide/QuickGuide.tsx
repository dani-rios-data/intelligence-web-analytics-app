import React from 'react';
import styles from '../../styles/ServiceGuide.module.sass';

interface DecisionCriteria {
  id: string;
  text: string;
}

interface QuickGuideProps {
  decisionGuide: {
    service: string;
    criteria: DecisionCriteria[];
  }[];
}

const QuickGuide: React.FC<QuickGuideProps> = ({ decisionGuide }) => {
  return (
    <section className={styles.quickGuide}>
      <h2 className={styles.quickGuideTitle}>Quick Decision Guide</h2>
      
      {decisionGuide.map((item, index) => (
        <div key={index} className={styles.decisionRow}>
          <p>
            Choose <span className={styles.serviceName}>{item.service}</span> if you need:
          </p>
          <div className={styles.criteriaList}>
            {item.criteria.map((criterion) => (
              <span key={criterion.id} className={styles.criteriaItem}>
                {criterion.text}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default QuickGuide; 