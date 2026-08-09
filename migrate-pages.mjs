import { createClient } from "@sanity/client";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_WRITE_TOKEN env var. Set it the same way you did before.");
  process.exit(1);
}

const client = createClient({
  projectId: "ngfau3ce",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const newHomePage = {
  _id: "home-page",
  _type: "homePage",
  eyebrow: "Nigerian Author | Exploring Belief, Culture, Identity, and Human Freedom",
  heading: "The Stories We Inherit. The Truths We Choose.",
  subheading:
    "Through fiction and nonfiction, I explore the forces that shape human lives: belief, fear, culture, memory, suffering, resilience, and the courage required to think for oneself.\n\nI am Solomon B. Ibe, a Nigerian writer whose work draws deeply from Igbo culture, African oral storytelling traditions, philosophy, and the enduring questions of human existence.",
  intro:
    "Solomon B. Ibe is an Interior Architect and author based in Lagos, Nigeria.\nHe built his practice over more than a decade of work on residential and commercial projects, earning a reputation for spaces that combine technical precision with a quality of intentionality that clients describe as rare.\n\nHe approaches every project with the same question he has spent his adult life learning to ask honestly: what are you actually trying to create?\nHis first book, The Architecture of Belief, examined how societies construct the minds of the people inside them, and how authority is normalized, how questioning becomes dangerous, and how the assumptions we inherit can quietly become the walls of a life we never chose. It found readers across Nigeria and beyond, and it began a conversation that his second book continues from the inside.\n\nNo Enemy but Fear is his most personal work, a true account of a journey from Abuja to Enugu to Lagos, from borrowed beliefs to hard-won clarity, from survival to the slow, unglamorous work of building a life from the inside out.\nHe lives in Lagos with his wife and two children. And his most recent work. The Evolution of Man is a story about transformation, not the comfortable kind that happens in favorable conditions, but the radical kind that happens when a person has been stripped of everything and discovers, in the stripping, what cannot be stripped.",
  quote: "The greatest battles are often fought within ourselves.\nSolomon B. Ibe",
  authorPhoto: {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: "image-3718aae8dc5a7842863ac8eaaf6b4d705277711a-416x405-jpg",
    },
  },
};

const newAboutPage = {
  _id: "about-page",
  _type: "aboutPage",
  heading:
    "Solomon B. Ibe is a Nigerian author, interior architect, and independent thinker whose work explores the intersection of human experience, belief, identity, and personal transformation. With more than a decade of experience designing residential and commercial spaces, he has developed a deep appreciation for the structures that shape human lives not only the buildings people inhabit, but also the ideas, values, and stories that influence how they see themselves and the world around them. Through his writing, Solomon invites readers to reflect more deeply, question honestly, and pursue a clearer understanding of both them and society.",
  subheading:
    "Designing Spaces. Exploring Ideas. Inspiring Intentional Living.  Through architecture, writing, and reflection, Solomon B. Ibe helps people create environments, beliefs, and lives that are built with purpose.",
  photo: {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: "image-ba21963305bcd2e50110a2a36a123793fd6a7f94-1040x992-jpg",
    },
  },
  bio1:
    "Solomon B. Ibe is an Interior Architect, entrepreneur, and author based in Lagos, Nigeria. With more than a decade of experience delivering residential, commercial, and institutional projects, he has built a reputation for creating spaces that combine technical excellence, functionality, and thoughtful design. His work is guided by the belief that every environment should serve a purpose beyond aesthetics; it should improve the way people live, work, and experience the world around them.\nThroughout his career, Solomon has approached design as both a practical discipline and a deeply human endeavor. Whether developing a residential interior, coordinating a commercial fit-out, or managing complex construction projects, he is known for his attention to detail, problem-solving ability, and commitment to delivering solutions that align with his clients' goals and aspirations.",
  bio2:
    "Beyond architecture and design, Solomon is a writer driven by a lifelong fascination with human behavior, belief systems, personal growth, and the forces that shape individual and collective identity. His writing explores the intersection of experience, culture, faith, psychology, and self-discovery, inviting readers to examine the assumptions that influence how they think, act, and navigate life's challenges.\nAt the heart of both his design work and his writing is a question that has guided much of his adult life: What are you actually trying to create?\nFor Solomon, that question applies not only to buildings and spaces, but also to beliefs, relationships, careers, communities, and the lives people build for themselves. Whether designing environments or writing books, his goal remains the same: to help people think more clearly, live more intentionally, and create something meaningful that endures.",
  pullQuote:
    '"The architecture of belief need not be dismantled. It can be renovated, made more open to light and air, so that future generations inherit not only certainty, but the wisdom to examine what they have received."',
  whyIWrite1:
    "I write because there are truths that deserve to be remembered and questions that deserve to be asked. Long before I became an author, I was a young man trying to understand life, people, faith, purpose, success, failure, loyalty, and betrayal. Some of the most defining moments of my life did not come through victory but through pain. I have watched dreams rise and collapse, friendships flourish and fracture, and hopes tested by circumstances beyond my control. Those experiences left me with questions that refused to go away, and writing became the place where I searched for answers.\n\nFor many years, writing gave me a voice when shyness held me back. There were things I found easier to express on paper than in conversation. Through writing, I discovered a way to preserve lessons that might otherwise be forgotten and to examine ideas without hostility or confrontation. What began as a personal outlet gradually became a lifelong pursuit. I realized that stories and ideas have the power to reach places that arguments often cannot. They invite reflection rather than resistance, understanding rather than division.",
  whyIWrite2:
    "My journey has taught me that not everyone who walks beside you shares your vision, that loyalty is rarer than we often assume, and that betrayal can leave wounds deeper than words can describe. Yet it has also taught me that bitterness is not the answer. Faith, forgiveness, resilience, and personal growth are far greater responses than revenge. Some of the experiences that hurt me most also sharpened my understanding of human nature and strengthened my desire to write about the realities we often avoid discussing. They taught me that fear, pride, deception, and unchecked beliefs can quietly shape the course of a life.",
  whyIWrite3:
    "At the heart of my writing is a simple conviction: when people truly understand themselves, they are better equipped to understand others and to discover their purpose. I believe many of the problems we see in society begin with a lack of self-awareness and a reluctance to question the assumptions we inherit. That is why my work continually explores identity, belief, courage, truth, and the human condition. I am less interested in telling people what to think than in encouraging them to think deeply for themselves.\n\nIf a reader finishes one of my books with a greater understanding of who they are, a stronger courage to face the truth, a deeper compassion for others, and a willingness to question accepted beliefs, then I have achieved what I set out to do. More than anything, I hope my writing reminds people that truth should never be feared, purpose should never be abandoned, and that the journey to understand ourselves may be the most important journey we ever undertake.",
  influences: [
    "Chinua Achebe",
    "Chimamanda Adichie",
    "Ben Okri",
    "James Baldwin",
    "Frantz Fanon",
    "Toni Morrison",
    "Albert Camus",
  ],
  awards: [
    { _key: "ff1ac725c865", year: "2025", title: "Featured Essayist, Lagos Literary Review" },
    { _key: "9c2d647ae74b", year: "2026", title: "Published - The Evolution of Man: My Good Deed Will Not Kill Me" },
    { _key: "22e044fc0bf1", year: "2024", title: "Published - The Architecture of Belief" },
    { _key: "40532c261afe", year: "2025", title: "Published - No Enemy But Fear" },
  ],
};

const newContactPage = {
  _id: "contact-page",
  _type: "contactPage",
  email: "sibe8725@gmail.com",
  location: "Lagos, Nigeria",
  responseTime: "Within 2-3 business days",
  instagram: "https://www.instagram.com/isob008",
  twitter: "https://x.com/hanetglobal",
  facebook: "https://www.facebook.com/share/1az2QAevjT",
};

const newDocs = [newHomePage, newAboutPage, newContactPage];

for (const doc of newDocs) {
  await client.delete(doc._id);
  await client.delete(`drafts.${doc._id}`);
  const result = await client.create(doc);
  console.log(`Migrated: ${result._id} -> ${result._type}`);
}

console.log("Done. Refresh /studio - Home, About, and Contact pages should now open normally.");
