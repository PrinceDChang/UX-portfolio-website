export interface DogPhotoSlide {
  src: string
  alt: string
  caption?: string
}

export interface DogFact {
  label: string
  value: string
}

export const dogPage = {
  label: 'My brother and best friend',
  headline: {
    primary: 'Meet',
    accent: 'Wushu',
  },
  bio: {
    lead: '2010 – April 1st, 2026',
    paragraphs: [
      'Wushu was not just a pet to me but an important person in my family. Also happy and full of joy, he was the light in my darkest days.',
      'The long walks, days at the park, shenanigans at home, his silly demeanor and funny faces — he was the best friend a man could ever ask for.',
    ],
  },
  facts: [
    { label: 'Breed', value: 'Golden Retriever' },
    { label: 'Age', value: '16 years old' },
    { label: 'Favorite thing', value: 'Rice and attention' },
    { label: 'Superpower', value: 'Instant mood boost' },
  ] satisfies readonly DogFact[],
  photos: [
    {
      src: '/images/dog/wushu-puppy-sleeping.png',
      alt: 'Wushu as a puppy sleeping curled up on a patterned couch',
      caption: 'Where it all started — 2010.',
    },
    {
      src: '/images/dog/wushu-puppy-held.png',
      alt: 'Wushu as a small puppy held up with a red leash',
      caption: 'Pocket-sized Wushu.',
    },
    {
      src: '/images/dog/wushu-puppy-deck-bandana.png',
      alt: 'Wushu as a puppy on a wooden deck wearing a red bandana',
      caption: 'Head tilt mastered early.',
    },
    {
      src: '/images/dog/wushu-puppy-backyard.png',
      alt: 'Young Oey sitting on the lawn holding puppy Wushu',
      caption: 'Day one with my brother.',
    },
    {
      src: '/images/dog/wushu-looking-up.png',
      alt: 'Wushu looking up at the camera from a hardwood floor',
      caption: 'Those eyes.',
    },
    {
      src: '/images/dog/wushu-shoulder-hug.png',
      alt: 'Wushu resting his head on a shoulder in a hug',
      caption: 'Always close.',
    },
    {
      src: '/images/dog/wushu-wushu-uniform.png',
      alt: 'Wushu sitting next to Oey in a wushu uniform at a competition',
      caption: 'My namesake, my teammate.',
    },
    {
      src: '/images/dog/wushu-crown.png',
      alt: 'Wushu wearing a gold toy crown indoors',
      caption: 'King of the house.',
    },
    {
      src: '/images/dog/wushu-car-petsmart.png',
      alt: 'Wushu in the back of a car wearing a PetSmart grooming bandana',
      caption: 'Fresh from grooming.',
    },
    {
      src: '/images/dog/wushu-championship-medal.png',
      alt: 'Senior Wushu wearing a 2023 all-around championship medal',
      caption: '2023 wushu champion.',
    },
    {
      src: '/images/dog/wushu-under-table.png',
      alt: 'Wushu standing under the dining room table with a curious look',
      caption: 'Hiding under the table, hoping for scraps.',
    },
    {
      src: '/images/dog/wushu-reindeer-hat.png',
      alt: 'Wushu in a grey dog bed wearing a red reindeer hat that says Oh Deer',
      caption: 'Oh deer — holiday Wushu.',
    },
  ] satisfies readonly DogPhotoSlide[],
} as const
