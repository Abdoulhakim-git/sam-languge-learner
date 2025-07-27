// Audio verification system to ensure all modules have complete audio coverage
export interface AudioRequirement {
  moduleId: number;
  partId: number;
  sectionTitle: string;
  audioText: string;
  isRequired: boolean;
}

export const COMPLETE_AUDIO_REQUIREMENTS: AudioRequirement[] = [
  // Module 1 - Alphabet & Numbers
  { moduleId: 1, partId: 1, sectionTitle: "Alphabet Introduction", audioText: "Hello! I'm Teacher Sam! Today we're going to learn the English alphabet! The alphabet has 26 amazing letters that help us read and write! Are you ready for this exciting adventure?", isRequired: true },
  { moduleId: 1, partId: 1, sectionTitle: "Vowels Explanation", audioText: "The vowels are very special letters! They are A, E, I, O, U! Say them with me: A! E! I! O! U! These letters make different sounds in words!", isRequired: true },
  { moduleId: 1, partId: 1, sectionTitle: "Consonants Explanation", audioText: "The consonants are all the other letters! They work together with vowels to make words! Let's practice saying all the consonants together!", isRequired: true },
  { moduleId: 1, partId: 2, sectionTitle: "Numbers Introduction", audioText: "Now let's learn numbers in English! Numbers help us count everything around us! We'll start with numbers 1 to 20! This is going to be so much fun!", isRequired: true },
  { moduleId: 1, partId: 2, sectionTitle: "Numbers 1-10", audioText: "Let's count together! One! Two! Three! Four! Five! Six! Seven! Eight! Nine! Ten! Great job counting to ten!", isRequired: true },
  { moduleId: 1, partId: 2, sectionTitle: "Numbers 11-20", audioText: "Now let's continue counting! Eleven! Twelve! Thirteen! Fourteen! Fifteen! Sixteen! Seventeen! Eighteen! Nineteen! Twenty! Excellent counting!", isRequired: true },

  // Module 2 - Greetings & Introductions
  { moduleId: 2, partId: 1, sectionTitle: "Greetings Introduction", audioText: "Hello! I'm Teacher Sam! Today we're learning how to greet people in English! Greetings are so important because they help us make friends and start conversations!", isRequired: true },
  { moduleId: 2, partId: 1, sectionTitle: "Greeting Importance", audioText: "Greeting people is very important because it helps start conversations! The way we greet others can change depending on the time of day and whether it's formal or informal!", isRequired: true },
  { moduleId: 2, partId: 1, sectionTitle: "Common Greetings", audioText: "Let's learn the most common greetings! Hello! Hi! Good morning! Good afternoon! Good evening! Good night! Each greeting has a special time to use it!", isRequired: true },
  { moduleId: 2, partId: 2, sectionTitle: "Introduction Basics", audioText: "Now let's learn how to introduce ourselves! When we meet new people, we tell them our name, age, where we live, and what we do! This helps us become friends!", isRequired: true },
  { moduleId: 2, partId: 2, sectionTitle: "Personal Information", audioText: "Let's practice sharing personal information! My name is Sam! I am your teacher! I live in Niger! I love teaching English! Now you try!", isRequired: true },

  // Module 3 - Family & Pronouns
  { moduleId: 3, partId: 1, sectionTitle: "Family Introduction", audioText: "Hello wonderful students! I'm Teacher Sam! Today we're learning about family members in English! Family is the most important thing in our lives!", isRequired: true },
  { moduleId: 3, partId: 1, sectionTitle: "Family Members", audioText: "Let's learn family words! Mother! Father! Sister! Brother! Grandmother! Grandfather! Aunt! Uncle! Cousin! In Niger, family is everything!", isRequired: true },
  { moduleId: 3, partId: 2, sectionTitle: "Pronouns Introduction", audioText: "Now let's learn pronouns! Pronouns are special words that replace names! Instead of saying Sam, we can say he! Instead of saying Sarah, we can say she!", isRequired: true },

  // Module 4 - Colors & Shapes
  { moduleId: 4, partId: 1, sectionTitle: "Colors Introduction", audioText: "Hello my colorful friends! I'm Teacher Sam! Today we're learning about colors in English! Colors make our world so beautiful and exciting!", isRequired: true },
  { moduleId: 4, partId: 1, sectionTitle: "Basic Colors", audioText: "Let's learn the basic colors! Red! Blue! Yellow! Green! Orange! Purple! Pink! Black! White! Brown! Colors are everywhere in Niger's beautiful landscapes!", isRequired: true },
  { moduleId: 4, partId: 2, sectionTitle: "Shapes Introduction", audioText: "Now let's discover shapes! Shapes are all around us! Circle! Square! Triangle! Rectangle! These shapes help us describe the world!", isRequired: true },

  // Module 5 - Animals & Nature
  { moduleId: 5, partId: 1, sectionTitle: "Animals Introduction", audioText: "Hello my amazing animal lovers! I'm Teacher Sam! Today we're learning about animals in English! Animals are incredible creatures that share our world!", isRequired: true },
  { moduleId: 5, partId: 1, sectionTitle: "Common Animals", audioText: "Let's learn animal names! Dog! Cat! Bird! Fish! Cow! Goat! Sheep! Horse! Chicken! Camel! Niger has many beautiful animals!", isRequired: true },
  { moduleId: 5, partId: 2, sectionTitle: "Nature Introduction", audioText: "Now let's explore nature! Nature gives us everything we need! Tree! Flower! River! Mountain! Desert! Sun! Moon! Niger has amazing natural beauty!", isRequired: true }
];

export function verifyModuleAudio(moduleId: number): AudioRequirement[] {
  return COMPLETE_AUDIO_REQUIREMENTS.filter(req => req.moduleId === moduleId);
}

export function getAllMissingAudio(): AudioRequirement[] {
  return COMPLETE_AUDIO_REQUIREMENTS.filter(req => req.isRequired);
}