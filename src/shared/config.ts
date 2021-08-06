export const API_ENDPOINT = process.env.BACKEND_ENDPOINT || 'http://localhost:8080';

export const CROWDSOURCING_SITE = 'ランサーズ';

export const preTaskUrl: EnqueteURL = {
  shopping: {
    controled:
      'https://docs.google.com/forms/d/e/1FAIpQLSemQ2tFN2VJ1oTAr1ogVUlVEwNmAO5JDX2rC0w7DeeAUHjUrg/viewform?usp=pp_url&entry.783194538=',
    distribution:
      'https://docs.google.com/forms/d/e/1FAIpQLSemQ2tFN2VJ1oTAr1ogVUlVEwNmAO5JDX2rC0w7DeeAUHjUrg/viewform?usp=pp_url&entry.783194538=',
    icon: 'https://docs.google.com/forms/d/e/1FAIpQLSemQ2tFN2VJ1oTAr1ogVUlVEwNmAO5JDX2rC0w7DeeAUHjUrg/viewform?usp=pp_url&entry.783194538=',
  },
  desease: {
    controled:
      'https://docs.google.com/forms/d/e/1FAIpQLSev9j19FgH1EvEtPBj4O86tDw8zaCEJ3IqBMzlgJ2JbPDay_Q/viewform?usp=pp_url&entry.836057442=',
    distribution:
      'https://docs.google.com/forms/d/e/1FAIpQLSev9j19FgH1EvEtPBj4O86tDw8zaCEJ3IqBMzlgJ2JbPDay_Q/viewform?usp=pp_url&entry.836057442=',
    icon: 'https://docs.google.com/forms/d/e/1FAIpQLSev9j19FgH1EvEtPBj4O86tDw8zaCEJ3IqBMzlgJ2JbPDay_Q/viewform?usp=pp_url&entry.836057442=',
  },
};

export const postTaskUrl: EnqueteURL = {
  shopping: {
    controled:
      'https://docs.google.com/forms/d/e/1FAIpQLSfhxKkP_lC-4cEezCX0nsV18WvAxlmImT_6Aq3w6VrVBF8gLg/viewform?usp=pp_url&entry.845870063=',
    distribution:
      'https://docs.google.com/forms/d/e/1FAIpQLSeaeNMvLB_b3_PW029jYbj6L9PYfBMGbOyYVz91a75czvj8EA/viewform?usp=pp_url&entry.845870063=',
    icon: 'https://docs.google.com/forms/d/e/1FAIpQLScD9NQR729ejkr6x8XwMpEL8_9qJEhXDwwWG2VFZKyzf0FUDg/viewform?usp=pp_url&entry.845870063=',
  },
  desease: {
    controled:
      'https://docs.google.com/forms/d/e/1FAIpQLSduYSRPTfI_dlSSsiQORFseJkvdxCkocsDftQ4u8FzvByKE5w/viewform?usp=pp_url&entry.845870063=',
    distribution:
      'https://docs.google.com/forms/d/e/1FAIpQLSfh3HfQb65TCxBaCZ0yGY3mkHyjm8UIHhLBi17y5Qp2XyBW-w/viewform?usp=pp_url&entry.845870063=',
    icon: 'https://docs.google.com/forms/d/e/1FAIpQLSde6dFqJQbasBGUPz473S5N_mVXY9BWG7c94HorWyaJUjV74g/viewform?usp=pp_url&entry.845870063=',
  },
};

type EnqueteURL = {
  shopping: {
    controled: string;
    distribution: string;
    icon: string;
  };
  desease: {
    controled: string;
    distribution: string;
    icon: string;
  };
};
