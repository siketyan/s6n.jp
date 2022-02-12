import React from 'react';

import {
  Education, LifeStoryChapter, LifeStoryChapterSection,
  WorkExperience,
} from '@siketyan/wantedly-profile/esm/model';
import Experience from '../atoms/experience';

import styles from './history.module.scss';
import Divider from '../atoms/divider';

const Section: React.VFC<{ section: LifeStoryChapterSection }> = ({ section }) => {
  if (section.experienceType === 'EDUCATION') {
    const experience = section.experience as Education<typeof section.experienceUuid>;

    return (
      <Experience
        className={styles.experience}
        name={experience.schoolName}
        position={experience.major}
        duration={experience.duration}
        description={experience.description}
      />
    );
  } else if (section.experienceType === 'WORK_EXPERIENCE') {
    const experience = section.experience as WorkExperience<typeof section.experienceUuid>;

    return (
      <Experience
        className={styles.experience}
        name={experience.companyName}
        position={experience.position}
        duration={experience.duration}
        description={experience.description}
        type={experience.employmentType}
      />
    );
  }

  throw new Error(`Invalid experience type found: ${section.experienceType}.`);
};

type Props = {
  chapters: LifeStoryChapter[],
};

const History: React.VFC<Props> = props => {
  const sections = props.chapters.flatMap(chapter => chapter.sections);
  const present = sections.filter(section => !section.experience.duration.end);
  const past = sections.filter(section => !present.includes(section));

  return (
    <>
      {present.map(section => <Section key={section.experienceUuid} section={section} />)}
      <Divider label="Past Experiences" />
      {past.map(section => <Section key={section.experienceUuid} section={section} />)}
    </>
  );
};

export default History;