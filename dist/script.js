/* ============================================================================
   DATA — edit this block to change the map. Everything below it is rendering.
   ========================================================================= */

const FAMILIES = [
  { key: "human",      label: "Human",       shape: "circle"   },
  { key: "animal",     label: "Animal",      shape: "triangle" },
  { key: "classic_ai", label: "Classical AI",shape: "square"   },
  { key: "current_ai", label: "Current AI",  shape: "diamond"  }
];

const POINTS = [
  { id:"newborn-face-bias", short:"Newborn face bias", label:"Newborn face preference", family:"human", prior:"built",
    age:"Hours after birth", ageShort:"birth",
    task:"Preferentially tracking a face-like pattern",
    what:"Babies less than an hour old were shown a face-like pattern and scrambled versions of the same features, moved slowly across their field of view. They turned their head and eyes to follow the face-like one further than the others.",
    unit:"there is no learning episode — the bias is present before any faces have been seen", needed:"0",
    to:"Nothing. It is a bias, not a skill",
    notTo:"Anything; and it fades within months as the cortical face system takes over",
    lifetime:{e:10,t:0}, total:{e:0,t:0},
    source:"Goren, Sarty & Wu 1975 (40 newborns, median age 9 minutes); Johnson, Dziurawiec, Ellis & Morton 1991. Mechanism disputed — see Simion and Turati on non-face-specific biases", confidence:"medium",
    note:"Zero examples is not fast learning. It is no learning at all — the prior came pre-installed. That makes this the edge of the efficiency axis rather than a point on it, and every other point here is paying for something this one got free. One caveat: the behaviour is solid, but the explanation is argued over. Some researchers think the preference comes from general biases toward top-heavy patterns rather than from a face template." },

  { id:"infant-segmentation", short:"Infant segmentation", label:"Infant statistical learning", family:"human", prior:"built",
    age:"8 months", ageShort:"8mo",
    task:"Finding word boundaries in a continuous speech stream that contains no pauses",
    what:"Eight-month-olds heard two minutes of an invented language: a continuous stream of syllables with no pauses, no stress and nothing marking where one word ended. Afterwards they reliably told the stream's 'words' apart from syllable strings that straddled a boundary. The only clue available was how often one syllable followed another.",
    unit:"one minute of exposure", needed:"2 minutes",
    to:"Tone sequences, visual sequences, non-linguistic streams — the mechanism is unusually general",
    notTo:"Open question; how far statistical learning reaches is actively researched",
    lifetime:{e:9,t:6}, total:{e:6,t:6},
    source:"Saffran, Aslin & Newport 1996, Science. Breadth: Saffran et al. 1999 for tone sequences, Kirkham, Slemmer & Johnson 2002 for visual sequences", confidence:"high",
    note:"Two minutes of speech with no pauses, no feedback and no instruction, and an eight-month-old has found the word boundaries. It is one of the fastest results on this map, and an unusually broad one — the same machinery works on tones and on visual sequences. A strong counterexample to the idea that speed always costs breadth." },

  { id:"perceptual-narrowing", short:"Perceptual narrowing", label:"Phonetic perceptual narrowing", family:"human", prior:"built",
    age:"6 to 12 months", ageShort:"6–12mo",
    task:"Losing the ability to hear contrasts the native language does not use",
    what:"The same infants were tested twice on a sound contrast their own language does not use — Hindi retroflex versus dental consonants, for babies growing up around English. At six to eight months they could hear the difference. By ten to twelve months they no longer could.",
    unit:"one month of ordinary native-language exposure", needed:"about six months",
    to:"Native-language processing, which gets faster and more robust",
    notTo:"The discarded contrast itself. Japanese-learning infants stop distinguishing English /r/ from /l/ between 8 and 10 months while English-learning infants improve, and adults find it very hard to recover",
    lifetime:{e:8,t:1}, total:{e:5,t:1},
    source:"Werker & Tees 1984 (English-learning infants on Hindi and Salish contrasts); Kuhl et al. 2006 for the Japanese /r/–/l/ decline", confidence:"high", keystone:true,
    note:"**The tradeoff, caught in the act.** At six months an infant can hear contrasts it will have lost by twelve. Nothing was added. A general ability was *spent* to get better at one language. Everywhere else on this map the prior has to be inferred from a finished system; here you can watch it being installed. Narrowing is contrast-specific rather than total, and the original study followed only six infants." },

  { id:"toddler-fast-mapping", short:"Fast mapping", label:"Toddler fast mapping", family:"human", prior:"built",
    age:"3 to 4 years", ageShort:"3–4y",
    task:"Learning a new colour word ('chromium') from a handful of incidental exposures",
    what:"Preschoolers were shown two trays and told to fetch 'the chromium one, not the red one'. Nobody explained what chromium meant. Weeks later, about half still reached for the olive-coloured tray when asked for chromium.",
    unit:"one incidental introducing event", needed:"a few events across about five weeks",
    to:"Any new word; the mechanism is general across vocabulary",
    notTo:"Non-linguistic categories; depends on word-learning constraints already in place",
    lifetime:{e:8,t:7}, total:{e:6,t:7},
    source:"Carey & Bartlett 1978 — 14 children, aged 3 and 4", confidence:"high",
    note:"The popular version of this result is stronger than the paper. Carey and Bartlett tested 3- and 4-year-olds, the word appeared across several moments over about five weeks rather than once, and only about half the children remembered it later. Still remarkable, still not one-shot." },

  { id:"child-second-language", short:"Child L2", label:"Child second-language learning", family:"human", prior:"built",
    age:"First exposure before about 7", ageShort:"<7y",
    task:"Reaching native-like fluency in a second language as a child",
    what:"Immigrants to the US who had all lived there a similar number of years were tested on English grammar. What predicted their scores was not how long they had spoken English but how old they were when they arrived. Those who arrived before about seven scored like native speakers.",
    unit:"one hour of immersion", needed:"a few years of ordinary immersion, with no instruction",
    to:"Full native competence, grammar and accent included",
    notTo:"Still one language — the child's advantage is in attainment, not in breadth",
    lifetime:{e:7,t:4}, total:{e:4,t:4},
    source:"Johnson & Newport 1989, age of arrival and grammatical attainment (one study, n=46). Challenged by Vanhove 2013 on the statistics and Hartshorne, Tenenbaum & Pinker 2018, which puts the sharp drop nearer 17–18", confidence:"medium", keystone:true,
    note:"Set this against adult second-language learning and the map argues with itself. Same task, same species, and the child reaches native-like grammar and accent while the adult almost never does — without lessons, effort or strategy. Whatever the child has, it is not general intelligence, because the adult has more of that." },

  { id:"absolute-pitch", short:"Absolute pitch", label:"Absolute pitch", family:"human", prior:"built",
    age:"Acquired before about 6, or not at all", ageShort:"<6y",
    task:"Naming a pitch with no reference tone",
    what:"A musician with absolute pitch can name a note played on its own, with no reference tone, the way most people name a colour. Surveys of when they started training find nearly all began before about six. Adults who train for it deliberately rarely get there.",
    unit:"one hour of early musical training", needed:"early training, inside a developmental window",
    to:"Nothing beyond naming pitches",
    notTo:"General musical ability. Adults who train deliberately rarely acquire it, though 'never' is too strong — some adult learners do",
    lifetime:{e:6,t:0}, total:{e:2,t:0},
    source:"Takeuchi & Hulse 1993 for the age-6 window; Van Hedger et al. 2019 for adult acquisition; Deutsch on prevalence and tone-language effects", confidence:"medium",
    note:"Close to now-or-never, though the strict version is disputed: a few adults do acquire it with training. What holds is that the *amount* of practice is not what decides it. Adults who train for years usually fail where a child picking up an instrument succeeds. When the experience arrives matters more than how much of it there is." },

  { id:"omniglot-human", short:"Human one-shot", label:"Adult one-shot character learning", family:"human", prior:"built",
    age:"Adult", ageShort:"adult",
    task:"Reproducing and generalising a handwritten character after seeing one example",
    what:"People were shown one handwritten character from an alphabet they had never seen, then asked to pick out other examples of it from a set, and to write new ones themselves. They got it wrong on about 4.5% of trials.",
    unit:"one character exemplar", needed:"1",
    to:"Unfamiliar alphabets never seen before",
    notTo:"Outside visual-symbolic structure",
    lifetime:{e:9,t:5}, total:{e:5,t:5},
    source:"Lake, Salakhutdinov & Tenenbaum 2015 (human baseline)", confidence:"high",
    note:"The same task and the same one-shot accuracy as Bayesian Program Learning, reached a completely different way. Comparing the two is the cleanest evidence on the map." },

  { id:"riding-a-bike", short:"Riding a bike", label:"Riding a bike", family:"human", prior:"built",
    age:"Typically learned around 5 to 7", ageShort:"~5y",
    task:"Balancing and steering a two-wheeled bicycle",
    what:"Two findings sit behind this point. People who learned as children can still ride after decades off a bike. And competent cyclists put on a bicycle whose handlebars steer backwards cannot ride it at all — it takes days of practice to relearn, after which riding a normal bike becomes hard again.",
    unit:"one practice session", needed:"a few hours, once",
    to:"Almost nothing — other bicycles, and that is close to the whole list",
    notTo:"A bicycle with reversed steering, which competent adult cyclists cannot ride until they relearn it — and relearning then interferes with riding a normal bicycle",
    lifetime:{e:6,t:1}, total:{e:3,t:1},
    source:"Motor retention: Fleishman & Parker 1962 (a tracking task over 24 months, not decades of cycling). Reversed steering: 'Initial development of skill with a reversed bicycle', Scientific Reports 14, 2024", confidence:"medium",
    note:"Learned in an afternoon and kept for years, and it buys almost nothing — not even a bicycle whose handlebars turn the other way. Two details make it sharper. Retention across decades is folklore; the measured study runs to 24 months. And riders *can* learn the reversed bicycle, over about four days, after which it interferes with riding a normal one. Two skills that differ by one sign get in each other's way." },

  { id:"learning-to-drive", short:"Learning to drive", label:"Learning to drive", family:"human", prior:"built",
    age:"Typically 16 to 18", ageShort:"~17y",
    task:"Operating a car safely on public roads",
    what:"When Sweden lowered the minimum age for learner drivers, those who took advantage of it averaged around 118 hours of supervised practice before licensing, against 40 to 50 hours before. The extra practice cut their crash risk by roughly 40%.",
    unit:"one hour of supervised practice", needed:"roughly 40 to 120 hours of supervised practice",
    to:"Unfamiliar cars, unfamiliar cities, roads never seen before — genuine within-domain generalisation",
    notTo:"Anything outside vehicle control; driving skill does not make you a better pilot or cyclist",
    lifetime:{e:4,t:3}, total:{e:2,t:3},
    source:"Gregersen et al. 2000 on Sweden's lowered learner age — learners averaged about 118 hours of supervised practice against 41–48 before, with roughly 40% lower crash risk; Bates et al. 2010 on the Australian 120-hour requirement", confidence:"medium",
    note:"The middle of the map, and the point most readers have lived. Look at what the transfer covers: a driver handles an unfamiliar car in a foreign city on the first try. That is real generalisation across a wide range of new situations — but all of it inside one domain." },

  { id:"adult-second-language", short:"Adult L2", label:"Adult second-language learning", family:"human", prior:"built",
    age:"Adult", ageShort:"adult",
    task:"Reaching fluency in a second language as an adult",
    what:"The other end of the same study as the child point. Immigrants who arrived after puberty, with the same years of exposure as those who arrived young, scored well below native speakers on English grammar — and did not catch up with more time.",
    unit:"one hour of study or immersion", needed:"thousands of hours, and usually without native attainment",
    to:"Reading, travel, related languages in the same family",
    notTo:"Native-like grammar and accent, which stay out of reach for most adult learners",
    lifetime:{e:1,t:4}, total:{e:1,t:4},
    source:"Johnson & Newport 1989, critical-period effects in second-language acquisition — see Vanhove 2013 and Hartshorne et al. 2018 for challenges to the linear-decline reading", confidence:"medium",
    note:"The adult has strategies, motivation and reasoning the child lacks, and is still thousands of times slower, and still does not arrive. Whatever buys the child's speed is not general intelligence, and it expires." },

  { id:"late-first-language", short:"Late first language", label:"Late first-language acquisition", family:"human", prior:"built",
    age:"First language encountered after childhood", ageShort:"late",
    task:"Acquiring a first language after the usual window has closed",
    what:"Deaf adults who first encountered sign language at different ages were tested after decades of fluent daily use. Those exposed from birth outperformed those first exposed in late childhood on grammar, even though both groups had been signing for forty years or more.",
    unit:"one year of daily use", needed:"decades, and native competence is still not reached",
    to:"Substantial everyday communicative ability",
    notTo:"Native-like grammar, which stays out of reach however many years follow",
    lifetime:{e:0,t:3}, total:{e:0,t:3},
    source:"Newport 1990; Mayberry & Eichen 1991 on late first-language acquisition in deaf signers", confidence:"high",
    note:"The far end of the age series, and the hardest point for any account that only counts examples. Deaf signers who meet their first language in late childhood do not reach native competence after decades of daily use. They have the experience. The window is what they lack." },

  { id:"one-shot-faces", short:"One-shot faces", label:"Recognising a face after one meeting", family:"human", prior:"built",
    age:"Adult", ageShort:"adult",
    task:"Recognising a person met once, against recognising a familiar face",
    what:"Two findings in tension. People recognise faces they know across lighting, angle, age and haircut, almost perfectly. But asked whether two photographs show the same stranger, they are close to guessing — and viewers handed a pile of photos of one unfamiliar person routinely sort them into two different people.",
    unit:"one encounter", needed:"1 for the familiar-face intuition; far more for it to actually be true",
    to:"Familiar faces, which are recognised near-perfectly across lighting, angle, age and hairstyle",
    notTo:"Unfamiliar faces from a single encounter — people routinely judge two photographs of the same unfamiliar person to be two different people. Plus a reliable, moderate other-race decrement",
    lifetime:{e:5,t:2}, total:{e:2,t:2},
    source:"Unfamiliar-face failure: Jenkins, White, Van Montfort & Burton 2011; Burton et al. 1999. Other-race effect: Meissner & Brigham 2001", confidence:"medium",
    note:"**Here because the intuition is wrong.** Almost everyone believes they can recognise a face after meeting someone once. The research says otherwise: matching two photographs of a stranger is close to guessing. What is near-perfect is recognising a *familiar* face, and familiarity takes many encounters. So the face system is not a one-shot learner with a strong prior. It is a system whose prior only pays off once it has been fed." },

  { id:"chess-expertise", short:"Chess expertise", label:"Human chess expertise", family:"human", prior:"built",
    age:"Adult, after a decade of practice", ageShort:"adult",
    task:"Reaching master-level play",
    what:"Studies of chess masters find roughly a decade of serious study behind the title. Tested outside chess, masters show no general advantage: the skill does not carry into reasoning, into memory for anything but chess positions, or into other games.",
    unit:"hours of deliberate practice; positions studied", needed:"roughly a decade of sustained practice",
    to:"Very little beyond chess",
    notTo:"General reasoning, other games, academic performance",
    lifetime:{e:2,t:2}, total:{e:2,t:2},
    source:"Ten-year rule: Simon & Chase 1973 (Ericsson et al. 1993 studied violinists, not chess). Practice-variance dispute: Macnamara, Hambrick & Oswald 2014. Far-transfer failures: Sala & Gobet 2017", confidence:"medium",
    note:"A useful corrective: the spread on this map exists inside a single species, so it is not a story about humans beating machines. Two details to get right. The ten-year figure is Simon and Chase's rule, not Ericsson's violin study. And the practice account is contested — one meta-analysis puts practice at about a quarter of the variance in games. The part this point rests on, that chess skill goes nowhere else, is the solid part." },

  { id:"digger-wasp", short:"Digger wasp", label:"Digger wasp landmark learning", family:"animal", prior:"built",
    task:"Memorising nest location from a single orientation flight",
    what:"A female wasp leaves her burrow and circles it once before flying off to hunt. Move the ring of landmarks around the burrow while she is away, and on return she searches where the landmarks are rather than where the hole is.",
    unit:"one orientation flight", needed:"1",
    to:"Nothing — the mechanism is dedicated to nest relocation",
    notTo:"Any other spatial or associative problem",
    lifetime:{e:10,t:0}, total:{e:1,t:0},
    source:"Single orientation flight: Zeil 1993 on solitary wasp learning flights. Landmark displacement: Tinbergen & Kruyt 1938 (not Tinbergen 1932, which is Part I and shows neither)", confidence:"high",
    note:"The cleanest version of the pattern: one flight is enough, the skill goes nowhere, and under total accounting the efficiency disappears because evolution paid for it." },

  { id:"nutcracker-caching", short:"Nutcracker caching", label:"Clark's nutcracker cache recovery", family:"animal", prior:"built",
    task:"Recovering thousands of seed caches months later",
    what:"Clark's nutcrackers bury thousands of pine seeds across a wide area in autumn and dig them up through the winter. In the lab, birds tested 285 days after caching found them about as accurately as birds tested after ten days.",
    unit:"one caching event per location", needed:"1 per cache; thousands of caches in the field, tens in the lab studies",
    to:"Spatial memory tasks in the lab, to a limited degree",
    notTo:"Non-spatial problems",
    lifetime:{e:7,t:1}, total:{e:1,t:1},
    ecological:"Mixed. The long-retention finding comes from a lab room with tens of caches, not the forest floor with thousands.",
    source:"Balda & Kamil 1992, long-term spatial memory in Clark's nutcracker", confidence:"medium",
    note:"A memory far better than a human's, in exactly one domain. Two separate figures are often blurred together: the thousands of caches is a field estimate, while the finding that accuracy after 285 days matches accuracy after 10 comes from lab work with a few dozen caches." },

  { id:"honeybee-sameness", short:"Honeybee same/diff", label:"Honeybee same/different concept", family:"animal", prior:"built",
    task:"Learning an abstract sameness rule in a Y-maze",
    what:"Bees were trained in a Y-maze to fly toward whichever arm was marked like the sample at the entrance. Once trained, they applied 'same' to patterns they had never seen — and then to smells, a sense they had never been trained in.",
    unit:"one training trial", needed:"tens of trials",
    to:"Novel stimuli and across sensory modalities — visual rule transferred to odour",
    notTo:"Open question; the tested range is narrow",
    lifetime:{e:5,t:7}, total:{e:1,t:7},
    ecological:"Very well, and deliberately: the rule was tested in vision and then in smell, so the transfer claim does not rest on one sense.",
    source:"Giurfa et al. 2001, Nature", confidence:"medium",
    note:"The strongest counterexample here. A brain of about a million neurons learns an abstract sameness rule and carries it from vision to smell, in the 2001 paper itself, after roughly 60 trials. That breaks any simple story about bigger brains meaning broader minds. Samples are small, and simpler explanations have been proposed since." },

  { id:"taste-aversion", short:"Taste aversion", label:"Conditioned taste aversion", family:"animal", prior:"built",
    task:"Avoiding a food after a single pairing with nausea",
    what:"Rats drank flavoured water and were made ill hours later. One pairing was enough for them to avoid the flavour afterwards. The control condition is the important half: pair the same illness with a flashing light instead of a taste and the rats barely learn it, while a taste paired with electric shock is just as hard.",
    unit:"one taste-illness pairing", needed:"1, even with hours between the meal and the sickness",
    to:"Nothing — and it barely forms between the wrong pair of cues",
    notTo:"Light or sound paired with nausea, which rats learn only poorly, while taste paired with electric shock is equally hard. The pairing has to be one evolution expected",
    lifetime:{e:10,t:0}, total:{e:1,t:0},
    ecological:"Very well. Taste paired with illness is exactly the contingency this animal evolved to detect, which is why one trial is enough.",
    source:"Cue-consequence dissociation: Garcia & Koelling 1966. Hours-long delay: Garcia, Ervin & Koelling 1966. 'Preparedness': Seligman 1970", confidence:"high", keystone:true,
    note:"**The most relatable result on the map.** One trial, hours between the meal and the sickness, and a memory that lasts — anyone who has been ill after a restaurant has this. Then the control condition: pair nausea with a flashing light instead of a taste, and the same rat barely learns it. The speed is not a general ability. It is a built-in expectation about which things cause which. Biologists call it preparedness." },

  { id:"pavlov-dogs", short:"Pavlov's dogs", label:"Pavlovian conditioning", family:"animal", prior:"built",
    task:"Salivating to a tone that predicts food",
    what:"A tone sounds, food follows. After enough pairings the dog salivates at the tone alone. It will also salivate to tones near that pitch, and less so the further away they get.",
    unit:"one tone-food pairing", needed:"tens of pairings",
    to:"Tones close to the trained one, and nothing further",
    notTo:"Anything requiring the relationship to be understood rather than registered",
    lifetime:{e:4,t:2}, total:{e:1,t:2},
    ecological:"Poorly. The dog is tested through hearing, when smell is its main channel. A scent-based version might well show more.",
    source:"Pavlov 1927", confidence:"high",
    note:"The most famous learning experiment there is, and worth including because it is ordinary on both axes. Middling speed, almost no breadth. Most of what gets called learning looks like this." },

  { id:"dog-learns-sit", short:"Dog learns sit", label:"Dog learning a command", family:"animal", prior:"built",
    task:"Learning to sit on cue",
    what:"Tens of repetitions with a treat produce a reliable 'sit' — in the room where it was trained. Owners routinely find the same command falls apart outdoors, where the smells, sights and distractions are all different.",
    unit:"one training trial", needed:"tens of trials",
    to:"New handlers and new rooms, partially",
    notTo:"Often fails outdoors after being trained indoors — owners rediscover this constantly",
    lifetime:{e:5,t:2}, total:{e:2,t:2},
    ecological:"Poorly. Sight and sound again, for an animal that reads the world by nose. The low transfer score may be partly the study's.",
    source:"Dogs' sensitivity to human social cues: Hare et al. 2002. Context-specificity is generalisation decrement — see Bouton on renewal — rather than anything in that paper", confidence:"medium",
    note:"The failure is the interesting part. A command learned in the kitchen often does not survive the move to a park. What looked like learning 'sit' was learning 'sit, here, with these smells'. The context was quietly part of what got stored — the same brittleness people complain about in machine learning." },

  { id:"birdsong-learning", short:"Birdsong learning", label:"Songbird tutor learning", family:"animal", prior:"built",
    task:"Acquiring the species song from a tutor during a critical period",
    what:"A young songbird hears adult males of its species singing during a fixed window in its first months, then practises for weeks until its own song matches what it heard. Outside the window it does not learn. Played another species' song inside the window, it largely ignores it.",
    unit:"one exposure to tutor song", needed:"tens of exposures, inside a fixed developmental window",
    to:"Nothing — and the window closes permanently",
    notTo:"Songs of other species, which a bird will not learn even when that is the only song it hears",
    lifetime:{e:7,t:0}, total:{e:1,t:0},
    source:"Marler 1970", confidence:"high",
    note:"An innate template plus a little experience, and only inside a window. The bird is not working out what to sing from scratch; it is picking which of a pre-specified family of songs its neighbours use. The same shape as adult language learning: a prior with an expiry date." },

  { id:"crow-trap-tube", short:"Crow trap-tube", label:"New Caledonian crow, trap-tube", family:"animal", prior:"built",
    task:"Extracting food without losing it to a trap",
    what:"Food sits in a horizontal tube with a hole partway along. Push it the wrong way and the food drops into the trap. Some New Caledonian crows learned to pull it out the safe side and kept succeeding when the tube was modified — though whether they grasped the physics or learned a visual rule about which end to use is disputed.",
    unit:"one trial", needed:"tens of trials, with individual variation",
    to:"Structurally similar physical problems after transfer testing",
    notTo:"Contested — whether crows grasp causal structure or learn perceptual cues is actively disputed",
    lifetime:{e:4,t:3}, total:{e:2,t:3},
    source:"Taylor et al. 2009", confidence:"low",
    note:"Whether crows understand the physics or have learned which pictures predict food is genuinely disputed, which is why this point carries a low-confidence ring rather than a confident placement. On how a small brain manages it at all: corvid and parrot forebrains pack neurons very densely, so brain volume is the wrong thing to measure." },

  { id:"rats-beat-humans", short:"Rats beat humans", label:"Rats outperforming humans at generalisation", family:"animal", prior:"built",
    task:"Sorting things into a category that no simple rule describes",
    what:"Rats and humans were given the same sorting task, built so that no verbal rule describes the boundary — you have to combine several features at once. Both learned it, then both were tested on examples they had not seen. The rats generalised better. The humans kept hunting for a rule that was not there.",
    unit:"one training trial", needed:"many trials",
    to:"Novel exemplars of the category — and better than the humans tested on the same task",
    notTo:"Rule-based categories, where humans win easily",
    lifetime:{e:3,t:3}, total:{e:1,t:3},
    source:"Vermaercke et al. 2014, reviewed in Bräuer et al. 2020", confidence:"medium",
    note:"**A transfer result where the rat wins, because the human has a prior.** The category here has no verbal rule behind it. Humans kept looking for one, and generalised worse for it. The rats, with no such habit, just integrated the evidence. The prior does not merely fail to help — it gets in the way. It also breaks any neat ordering by family or brain size." },

  { id:"rat-latent-learning", short:"Rat latent learning", label:"Rat latent learning", family:"animal", prior:"built",
    task:"Navigating a maze after unrewarded exploration",
    what:"Rats were allowed to wander a maze for ten days with no food in it, and appeared to learn nothing. When food was then placed at the end, they went almost straight to it — faster than rats that had been rewarded from the start. They had been building a map while apparently doing nothing.",
    unit:"one maze run", needed:"ten days of unrewarded exploration",
    to:"Novel routes and shortcuts within the environment",
    notTo:"Other environments or problem types",
    lifetime:{e:5,t:4}, total:{e:2,t:4},
    ecological:"Mixed. A maze suits a rat, but the task is scored visually for an animal that navigates largely by whisker and smell.",
    source:"Tolman & Honzik 1930 for latent learning; Tolman, Ritchie & Kalish 1946 and Tolman 1948 for shortcuts and the cognitive map", confidence:"high",
    note:"Historically important: evidence that the rat built a map of the maze rather than a chain of habits. A good anchor for the animal cluster." },

  { id:"alphazero", short:"AlphaZero", label:"AlphaZero (chess)", family:"classic_ai", prior:"learned",
    task:"Superhuman chess from self-play",
    what:"Given only the rules of chess, the system played 44 million games against itself and then beat the strongest existing engine. It had no opening book, no human games, and no hand-written sense of what a good position looks like.",
    unit:"one self-play game", needed:"tens of millions",
    to:"Nothing — a separately trained instance is needed per game",
    notTo:"Any task outside its game",
    lifetime:{e:0,t:0}, total:{e:0,t:0},
    source:"Silver et al. 2018", confidence:"high",
    note:"Superhuman skill, and almost no intelligence by Chollet's definition — which is a useful provocation. It also shows something this map's transfer axis cannot. When DQN learned 49 Atari games, the same architecture and settings worked for all of them, while a separate network was trained per game on 50 million frames, roughly 38 days of play each. The architecture transferred completely; the weights transferred not at all. This axis only measures the second." },

  { id:"deep-blue", short:"Deep Blue", label:"Deep Blue", family:"classic_ai", prior:"built",
    task:"Beating the world chess champion with search and a hand-structured evaluation",
    what:"The machine that beat Kasparov in 1997 searched around 200 million positions a second, scoring them with an evaluation function whose terms were written by chess experts, whose weights were tuned against a database of master games, and whose opening book was drawn from over 700,000 grandmaster games.",
    unit:"one grandmaster game in the tuning corpus and opening book", needed:"over 700,000 grandmaster games, plus hand-written evaluation structure",
    to:"Nothing",
    notTo:"Any task outside chess; the evaluation function is chess, written out longhand",
    lifetime:{e:2,t:0}, total:{e:0,t:0},
    source:"Campbell, Hoane & Hsu 2002, Artificial Intelligence 134:57–83", confidence:"high",
    note:"**A correction worth making out loud.** Deep Blue is usually described as needing no training data, because grandmasters wrote its knowledge down by hand. Its own paper says otherwise: the evaluation weights were tuned against a database of master games, and the opening book came from over 700,000 grandmaster games. What was hand-built was the shape of the knowledge, not the numbers. The contrast with AlphaZero survives and is sharper for being true — 700,000 human games plus a designed form, against 44 million self-play games and no form at all." },

  { id:"mnist", short:"MNIST", label:"MNIST digit classifier", family:"classic_ai", prior:"learned",
    task:"Recognising handwritten digits 0 to 9",
    what:"Sixty thousand labelled images of handwritten digits, used to train a classifier to tell 0 through 9 apart. Modern networks get over 99% of the held-out test set right.",
    unit:"one labelled digit image", needed:"tens of thousands",
    to:"Almost nothing — accuracy falls off on digits written in a different style or collected by a different process",
    notTo:"Any other visual category; a model at 99% on MNIST knows nothing about letters",
    lifetime:{e:2,t:1}, total:{e:2,t:1},
    source:"LeCun et al. 1998", confidence:"high",
    note:"The 'hello world' of machine learning, and a clean contrast with the one-shot character points to its right. Sixty thousand examples for ten categories, against one example per category for a person or for Bayesian Program Learning. Same kind of task, four orders of magnitude apart." },

  { id:"alexnet", short:"AlexNet", label:"AlexNet / ImageNet", family:"classic_ai", prior:"learned",
    task:"Large-scale image classification",
    what:"A network trained on 1.2 million labelled photographs across a thousand categories, which halved the error rate on the ImageNet benchmark in 2012. Its features turned out to be reusable: the early layers transfer to other vision tasks, the late ones do not.",
    unit:"one labelled image", needed:"over a million",
    to:"Other vision tasks via feature reuse — the origin of transfer learning as standard practice",
    notTo:"Non-visual domains",
    lifetime:{e:1,t:4}, total:{e:1,t:4},
    source:"Krizhevsky, Sutskever & Hinton 2012; transfer analysed in Yosinski et al. 2014", confidence:"high",
    note:"Transfer is not all-or-nothing. The early layers move to new vision tasks; the late ones do not." },

  { id:"bayesian-program-learning", short:"Bayesian programs", label:"Bayesian Program Learning", family:"classic_ai", prior:"built",
    task:"One-shot handwritten character learning",
    what:"The model treats a character as a set of pen strokes and rules for joining them. Shown one example of a character it has never seen, it works out the strokes that would have drawn it, then produces new versions. On one-shot classification it erred on 3.3% of trials, against a human 4.5%.",
    unit:"one character exemplar", needed:"1",
    to:"New alphabets within the same stroke-based generative framework",
    notTo:"Anything outside handwritten characters — the generative structure is domain-specific by construction",
    lifetime:{e:9,t:2}, total:{e:3,t:2},
    source:"Lake, Salakhutdinov & Tenenbaum 2015, Science", confidence:"high", keystone:true,
    note:"**The clearest case on the map.** One-shot performance at human level — 3.3% error against a human 4.5% — from a hand-designed story about strokes, sub-strokes and how they join. Be precise about what was designed: the structure was, while the stroke primitives were fit to 30 background alphabets, so 'entirely hand-built' overstates it. Even so, this is the one point where you can read the domain assumption straight off the model's definition." },

  { id:"act-r", short:"ACT-R", label:"ACT-R cognitive model", family:"classic_ai", prior:"built",
    task:"Modelling human performance in a specified domain",
    what:"A cognitive architecture in which a researcher hand-specifies the knowledge and rules for a task, after which the model predicts human reaction times and error patterns on it. Every new domain has to be modelled by hand first.",
    unit:"one training instance", needed:"few, given hand-built task knowledge",
    to:"Nothing automatically — each domain is modelled by hand",
    notTo:"Any unmodelled domain",
    lifetime:{e:8,t:1}, total:{e:1,t:1},
    source:"Anderson, Bothell, Byrne, Douglass, Lebiere & Qin 2004, 'An integrated theory of the mind'", confidence:"medium",
    note:"The same shape as Bayesian Program Learning: the efficiency comes from knowledge the modeller supplied. Under total accounting, the hidden cost is the human effort of building the model." },

  { id:"llm-pretraining", short:"LLM pretraining", label:"LLM pretraining", family:"current_ai", prior:"learned",
    task:"Acquiring general language and world knowledge",
    what:"A model is trained to predict the next piece of text, across trillions of words. Nothing in the process targets any particular task, and yet what comes out can translate, summarise, write code and answer questions.",
    unit:"one token", needed:"trillions",
    to:"An unusually wide range of downstream tasks",
    notTo:"Tasks requiring genuinely novel abstraction — see ARC",
    lifetime:{e:0,t:8}, total:{e:0,t:8},
    source:"Brown et al. 2020 and successors", confidence:"high",
    note:"**The point the narrow thesis is built on.** Enormous data bought breadth rather than narrowness, which rules out a universal tradeoff. A prior learned from data does not seem to charge the narrowing tax that a designed or evolved prior charges. Whether that is because the training data covers most of what we think to ask, or because learned priors are a different kind of thing, is the open question. This map can pose it but not settle it." },

  { id:"llm-in-context", short:"LLM in-context", label:"LLM in-context learning", family:"current_ai", prior:"learned",
    task:"Performing a new task from a few examples in the prompt",
    what:"The same pretrained model is shown a few examples of a task inside the prompt and does it immediately — no training, no change to the model itself, no gradient step. The task can be one nobody designed it for.",
    unit:"one example in the prompt", needed:"a handful",
    to:"Many task types, immediately",
    notTo:"Tasks unlike anything in pretraining",
    lifetime:{e:8,t:8}, total:{e:0,t:8},
    source:"Brown et al. 2020", confidence:"high", keystone:true,
    note:"**The point that makes the toggle worth having.** Under lifetime accounting it sits alone in the upper-right corner. Under total accounting it slides left onto pretraining. Same system, opposite conclusions, depending only on what you agree to count. Notice what the toggle does not do, though: it moves efficiency and leaves transfer untouched, here and everywhere else. Moving the cost does not take the breadth away." },

  { id:"fine-tuning", short:"Fine-tuning", label:"Fine-tuning a pretrained model", family:"current_ai", prior:"learned",
    task:"Adapting a pretrained model to a specific task with a small labelled set",
    what:"A pretrained model is adjusted with a few hundred to a few thousand labelled examples for one specific job. It is how most applied machine learning is actually built.",
    unit:"one labelled example", needed:"hundreds to a few thousand",
    to:"Whatever the pretrained base already covered — the breadth is inherited, not learned here",
    notTo:"Domains the base model never saw; and fine-tuning can erase capabilities the base had",
    lifetime:{e:6,t:5}, total:{e:0,t:5},
    source:"Howard & Ruder 2018 (ULMFiT); Devlin et al. 2018 (BERT)", confidence:"high",
    note:"The same move as in-context learning, one scale down, and it is how most applied machine learning actually works. A few hundred examples looks miraculous until you count the pretraining run underneath. Three points make this move when the accounting changes, but that is one observation rather than three, because the accounting rule guarantees it." },

  { id:"self-driving", short:"Self-driving", label:"Self-driving cars", family:"current_ai", prior:"learned",
    task:"Driving autonomously on public roads",
    what:"Waymo's vehicles have driven several hundred million miles on public roads with nobody in the driver's seat, on top of tens of billions more in simulation. Each new city still takes substantial mapping and engineering before the cars run there.",
    unit:"one mile of driving", needed:"hundreds of millions of driverless miles, on top of tens of billions simulated",
    to:"New cities, with substantial per-city engineering",
    notTo:"Genuinely novel road situations — the long tail is the engineering problem, though whether humans handle it better is now contested",
    lifetime:{e:0,t:2}, total:{e:0,t:2},
    source:"Waymo safety reporting: roughly 220 million rider-only miles through early 2026, plus 20+ billion simulated. Mileage figures date quickly", confidence:"medium",
    note:"Compare it with the human driver a few points to the right: tens of hours of practice against hundreds of millions of miles, for the same task. Do not overclaim the second half, though. The obvious follow-on — that the human still handles the rare cases better — is what the fleet safety data disputes. The efficiency gap is the defensible claim. The competence gap is not." },

  { id:"alphafold", short:"AlphaFold", label:"AlphaFold", family:"current_ai", prior:"learned",
    task:"Predicting protein structure from sequence",
    what:"Trained on roughly 170,000 experimentally determined protein structures, the model predicts the three-dimensional shape a protein sequence folds into — at accuracy close to experiment, including for proteins unlike anything it was trained on.",
    unit:"one structure in the training set", needed:"roughly 170,000 experimental structures, plus about 350,000 self-distilled predictions",
    to:"Proteins unlike anything in its training set — real generalisation across a vast space",
    notTo:"Anything that is not protein folding",
    lifetime:{e:1,t:2}, total:{e:1,t:2},
    source:"Jumper et al. 2021", confidence:"high",
    note:"A useful complication. Narrow by any reading of this axis, and yet it generalises well inside its domain, to proteins unlike anything it trained on. That suggests the transfer axis is hiding a distinction: breadth of domain is not the same as reach within one, and this map currently scores only the first." },

  { id:"recommenders", short:"Recommenders", label:"Recommender systems", family:"current_ai", prior:"learned",
    task:"Predicting what someone will watch, buy or listen to next",
    what:"Systems trained on millions of ratings or clicks to predict what someone will want next. They work well for people and items they have seen plenty of, and badly for new ones — the cold-start problem.",
    unit:"one interaction event", needed:"millions",
    to:"Nothing — a model built for one catalogue does not move to another",
    notTo:"New users and new items, the cold-start problem, which is the sample-efficiency problem under a different name",
    lifetime:{e:0,t:1}, total:{e:0,t:1},
    source:"Netflix Prize; Bell & Koren 2007", confidence:"medium",
    note:"The AI most people touch every day, sitting in the same corner as AlphaZero. The systems with the biggest real-world footprint are mostly down here — and cold start, the most expensive open problem in the industry, is this map's x-axis asked in production." },

  { id:"arc-agi", short:"ARC-AGI", label:"ARC-AGI", family:"current_ai", prior:"learned",
    task:"Abstract reasoning puzzles designed to resist memorisation",
    what:"A benchmark of puzzles in which each task shows two or three worked examples of some transformation on a grid of coloured squares, and the solver has to apply it to a new grid. Every task is different, and they are built so that having seen similar puzzles does not help.",
    unit:"two or three demonstration pairs per task", needed:"2–3",
    to:"By design, each task is novel — the benchmark tests acquisition itself",
    notTo:"Not applicable",
    lifetime:{e:9,t:9}, total:null,
    source:"Chollet 2019; leaderboard figures contested as of September 2026", confidence:"low", target:true,
    note:"A target region rather than a data point: it marks where the corner would be if something reached it. There is no honest total-accounting position for an aspiration, so it drops out when the accounting changes. The leaderboard numbers below are contested, and the disagreement between them says more than any single figure." }
];

/* the three region captions drawn on the chart itself */
const ZONES = [
  { id:"fast-and-broad", at:{e:9,t:9}, label:"Fast and broad",
    text:"Nothing built on a hand-designed or evolved prior reaches this corner, in either accounting. The only candidates that get near it — in-context learning, and ARC as an aspiration — did it on priors learned from data. That is the asymmetry the map is about, and it is a narrower claim than 'the corner is empty'." },
  { id:"specialist-edge", at:{e:9,t:1}, label:"Adaptive specialisation",
    text:"One-shot learning is common in nature, but almost always dedicated to a single problem. Shettleworth's adaptive specialisation of learning is the biological version of the priors-versus-breadth tradeoff." },
  { id:"brute-force", at:{e:1,t:1}, label:"Skill without acquisition",
    text:"High performance reached through overwhelming experience on a fixed task. Chollet's argument is that skill measured this way tells you almost nothing about intelligence." }
];

/* ============================================================================
   RENDERING
   ========================================================================= */

const SVGNS = "http://www.w3.org/2000/svg";
const W = 740, H = 656, M = { l: 58, r: 26, t: 26, b: 66 };
const PW = W - M.l - M.r, PH = H - M.t - M.b;
const PL = M.l, PR = M.l + PW, PT = M.t, PB = M.t + PH;

/* The domain is padded half a unit at each end, so a mark at 0 or 10 sits inside the
   plot rather than straddling an axis line. That also means a spread group at a corner
   stays in bounds on its own, with no clamping to squash it flat. */
const X = v => PL + ((v + 0.5) / 11) * PW;
const Y = v => PT + (1 - (v + 0.5) / 11) * PH;

const famColor = k => `var(--fam-${k})`;
const famOf = k => FAMILIES.find(f => f.key === k);

const compactQuery = window.matchMedia("(max-width: 700px)");

const state = {
  mode: "lifetime",
  shift: true,
  ages: false,
  view: "map",
  hidden: new Set(),
  hiddenPrior: new Set(),
  /* opens on a point any reader already understands, rather than the keystone */
  selected: "chess-expertise",
  pinned: "chess-expertise",  /* what the reader chose, survives filtering */
  hover: null,
  compact: compactQuery.matches
};

function el(tag, attrs, parent) {
  const n = document.createElementNS(SVGNS, tag);
  for (const k in attrs) if (attrs[k] != null) n.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(n);
  return n;
}

/* glyph path generators, all centred on 0,0 */
function glyph(shape, r) {
  switch (shape) {
    case "circle":   return { tag: "circle", attrs: { r } };
    case "square":   return { tag: "rect", attrs: { x: -r * 0.88, y: -r * 0.88, width: r * 1.76, height: r * 1.76, rx: 1.4 } };
    case "diamond":  return { tag: "path", attrs: { d: `M0 ${-r * 1.24}L${r * 1.24} 0L0 ${r * 1.24}L${-r * 1.24} 0Z` } };
    case "triangle": return { tag: "path", attrs: { d: `M0 ${-r * 1.24}L${r * 1.14} ${r * 0.78}L${-r * 1.14} ${r * 0.78}Z` } };
  }
}
function drawGlyph(shape, r, attrs, parent) {
  const g = glyph(shape, r);
  return el(g.tag, { ...g.attrs, ...attrs }, parent);
}

const plot = document.getElementById("plot");

/* Estimating label width from character count under-measured by up to 20%, which let
   the router call overlapping labels clean. Measure the real thing once per string. */
const measurer = el("text", { class: "pt-label", x: -9999, y: -9999, visibility: "hidden" }, plot);
const widthCache = new Map();
function textWidth(t, bold) {
  const k = (bold ? "b\u0000" : "n\u0000") + t;
  if (widthCache.has(k)) return widthCache.get(k);
  measurer.setAttribute("font-weight", bold ? 600 : 500);
  measurer.textContent = t;
  let w = 0;
  try { w = measurer.getComputedTextLength(); } catch (e) { w = 0; }
  if (!w) w = t.length * 6;
  widthCache.set(k, w);
  return w;
}

/* `cost` is what overlapping this box adds to a candidate's score. A label landing on
   another label or on axis furniture is unreadable (3); grazing a mark is survivable (1). */
function labelBox(x, y, anchor, text, cost = 3, bold = false) {
  const w = textWidth(text, bold) + 3;
  const x0 = anchor === "start" ? x - 2 : anchor === "end" ? x - w + 2 : x - w / 2;
  return { x0, x1: x0 + w, y0: y - 9, y1: y + 3, cost };
}
const hits = (a, b) => !(a.x1 < b.x0 || b.x1 < a.x0 || a.y1 < b.y0 || b.y1 < a.y0);

const gGrid    = el("g", {}, plot);
const gZones   = el("g", {}, plot);
const gAxes    = el("g", {}, plot);
const gShift   = el("g", { class: "fader" }, plot);
const gAnchor  = el("g", {}, plot);
const gTarget  = el("g", { class: "fader" }, plot);
const gMarks   = el("g", { role: "listbox", "aria-label": "Learners on the map" }, plot);
const gSelHalo = el("g", { "pointer-events": "none" }, plot);

/* quadrant wash on the upper-right, plus a dashed boundary — the wash alone
   composites to about 1.07:1, which is below the threshold of perception */
el("rect", { x: X(5), y: Y(10), width: X(10) - X(5), height: Y(5) - Y(10), fill: "var(--surface-sunk)" }, gGrid);
el("path", {
  d: `M${X(5)} ${Y(10)}L${X(5)} ${Y(5)}L${X(10)} ${Y(5)}`,
  fill: "none", stroke: "var(--axis)", "stroke-width": 1.2, "stroke-dasharray": "5 4"
}, gGrid);

for (let v = 0; v <= 10; v++) {
  el("line", { x1: X(v), y1: Y(0), x2: X(v), y2: Y(10), stroke: "var(--grid)", "stroke-width": v % 5 === 0 ? 1 : 0.6 }, gGrid);
  el("line", { x1: X(0), y1: Y(v), x2: X(10), y2: Y(v), stroke: "var(--grid)", "stroke-width": v % 5 === 0 ? 1 : 0.6 }, gGrid);
}

/* zone captions sit in the corner each region occupies, and are seeded into the
   label router below so no point label ever lands on one */
const ZONE_PLACEMENT = {
  "fast-and-broad": { x: X(10),   y: Y(10) + 14, anchor: "end"   },
  "specialist-edge":{ x: X(10),   y: Y(0) + 21,  anchor: "end"   },
  "brute-force":    { x: X(0) - 6, y: Y(0) + 21, anchor: "start" }
};
ZONES.forEach(z => {
  const pl = ZONE_PLACEMENT[z.id];
  const tx = el("text", { x: pl.x, y: pl.y, "text-anchor": pl.anchor, class: "zone-label" }, gZones);
  tx.textContent = z.label;
});
/* Rebuilt per render: measured once at setup these came out too narrow, because the
   webfont had not loaded yet, and point labels were landing on the captions. The axis
   furniture is off limits too — the left gutter holds the rotated y-axis column and
   its ticks, the bottom band the tick row and the x-axis row. */
function buildStaticBoxes() {
  const b = ZONES.map(z => {
    const pl = ZONE_PLACEMENT[z.id];
    return labelBox(pl.x, pl.y, pl.anchor, z.label);
  });
  b.push({ x0: -9999, x1: PL - 6, y0: -9999, y1: 9999, cost: 3 });
  b.push({ x0: -9999, x1: 9999, y0: PB + 6, y1: 9999, cost: 3 });
  return b;
}

/* axes */
el("line", { x1: PL, y1: PB, x2: PR, y2: PB, stroke: "var(--axis)", "stroke-width": 1 }, gAxes);
el("line", { x1: PL, y1: PT, x2: PL, y2: PB, stroke: "var(--axis)", "stroke-width": 1 }, gAxes);

for (let v = 0; v <= 10; v += 2) {
  const xt = el("text", { x: X(v), y: PB + 17, "text-anchor": "middle", class: "ax-tick" }, gAxes);
  xt.textContent = v;
  const yt = el("text", { x: PL - 10, y: Y(v) + 3.5, "text-anchor": "end", class: "ax-tick" }, gAxes);
  yt.textContent = v;
}

/* title and both poles share one baseline per axis: pole, title, pole */
const AXB = PB + 34;
const axX = el("text", { x: (PL + PR) / 2, y: AXB, "text-anchor": "middle", class: "ax-title" }, gAxes);
axX.textContent = "Sample efficiency";
const axXlo = el("text", { x: PL, y: AXB, class: "ax-pole" }, gAxes);
axXlo.textContent = "needs enormous experience";
const axXhi = el("text", { x: PR, y: AXB, "text-anchor": "end", class: "ax-pole" }, gAxes);
axXhi.textContent = "learns from one example";

const AYB = 22;
const axY = el("text", { class: "ax-title", "text-anchor": "middle", transform: `translate(${AYB} ${(PT + PB) / 2}) rotate(-90)` }, gAxes);
axY.textContent = "Transfer breadth";
const axYlo = el("text", { class: "ax-pole", transform: `translate(${AYB} ${PB}) rotate(-90)` }, gAxes);
axYlo.textContent = "trained task only";
const axYhi = el("text", { class: "ax-pole", "text-anchor": "end", transform: `translate(${AYB} ${PT}) rotate(-90)` }, gAxes);
axYhi.textContent = "applies across domains";

/* ---- ARC target zone ---- */
const arc = POINTS.find(p => p.target);
el("circle", { cx: X(arc.lifetime.e), cy: Y(arc.lifetime.t), r: 30, fill: "none", stroke: "var(--ink-muted)", "stroke-width": 1.4, "stroke-dasharray": "4 4" }, gTarget);
el("circle", { cx: X(arc.lifetime.e), cy: Y(arc.lifetime.t), r: 17, fill: "none", stroke: "var(--ink-muted)", "stroke-width": 1, "stroke-dasharray": "3 4", opacity: 0.6 }, gTarget);

/* ---- shift vectors ---- */
const defs = el("defs", {}, plot);
FAMILIES.forEach(f => {
  const m = el("marker", { id: `arw-${f.key}`, viewBox: "0 0 8 8", refX: 6.4, refY: 4, markerWidth: 5, markerHeight: 5, orient: "auto-start-reverse" }, defs);
  el("path", { d: "M0 0.8L7 4L0 7.2Z", fill: famColor(f.key) }, m);
});

const shiftLines = new Map();
POINTS.forEach(p => {
  if (!p.total) return;
  if (p.total.e === p.lifetime.e && p.total.t === p.lifetime.t) return;
  shiftLines.set(p.id, el("line", {
    stroke: famColor(p.family), "stroke-width": 1.4, opacity: 0.14, "marker-end": `url(#arw-${p.family})`
  }, gShift));
});

/* ---- marks ---- */

const marks = new Map();

POINTS.forEach(p => {
  const fam = famOf(p.family);
  const g = el("g", { class: "mark mover", tabindex: 0, role: "option", "aria-selected": "false", "aria-label": `${p.label}, ${fam.label}` }, gMarks);

  /* the focus ring is its own shape in ink, not the family hue, so it is visible
     on every family — and dashed, so focus never looks like selection */
  drawGlyph(fam.shape, 16, { class: "halo-focus" }, g);
  drawGlyph(fam.shape, 6.6, { class: "glyph", fill: famColor(p.family), stroke: "var(--surface)", "stroke-width": 2 }, g);
  if (p.confidence === "low") {
    drawGlyph(fam.shape, 10.5, { class: "glyph", fill: "none", stroke: famColor(p.family), "stroke-width": 1.2, "stroke-dasharray": "2.5 2.5" }, g);
  }
  drawGlyph(fam.shape, 14, { class: "hit", fill: "transparent" }, g);

  const lab = el("text", { class: "pt-label" }, g);

  const act = () => select(p.id);
  g.addEventListener("click", act);
  g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); act(); } });
  g.addEventListener("mouseenter", () => setHover(p.id));
  g.addEventListener("mouseleave", () => setHover(null));
  g.addEventListener("focus", () => setHover(p.id));
  g.addEventListener("blur", () => setHover(null));

  marks.set(p.id, { g, lab, p });
});

function setHover(id) {
  state.hover = id;
  shiftLines.forEach((ln, lid) => ln.setAttribute("opacity", lid === id ? 0.85 : 0.14));
}

/* ---- label placement ---- */

const CANDIDATES = [
  [13, 3.5, "start"], [-13, 3.5, "end"],
  [0, -12, "middle"], [0, 18, "middle"],
  [11, -8, "start"], [-11, -8, "end"],
  [11, 15, "start"], [-11, 15, "end"]
];


/* the age series is the point of the human family, so ages ride in the label rather
   than in a second text run that would double the clutter at this density */
const labelText = p => (state.ages && p.ageShort) ? `${p.short} · ${p.ageShort}` : p.short;

function placeLabels(positions, visible) {
  const taken = buildStaticBoxes();
  visible.forEach(id => {
    const [x, y] = positions.get(id);
    taken.push({ x0: x - 8, x1: x + 8, y0: y - 8, y1: y + 8, cost: 1 });
  });

  /* the selected point and the five keystones the prose argues from are placed first
     and never dropped; everything else competes for what is left */
  const rank = id => (id === state.selected ? 0 : marks.get(id).p.keystone ? 1 : 2);
  const order = [...visible].sort((a, b) => {
    const r = rank(a) - rank(b);
    if (r) return r;
    const [ax, ay] = positions.get(a), [bx, by] = positions.get(b);
    return (bx - by) - (ax - ay);
  });

  let dropped = 0;

  order.forEach(id => {
    const m = marks.get(id);
    const [x, y] = positions.get(id);
    const text = labelText(m.p);
    const bold = id === state.selected;
    m.lab.textContent = text;

    let best = null, bestScore = Infinity;
    for (const [dx, dy, anchor] of CANDIDATES) {
      const box = labelBox(x + dx, y + dy, anchor, text, 3, bold);
      let score = 0;
      if (box.x0 < 4) score += 6;
      if (box.x1 > W - 4) score += 6;
      if (box.y0 < 4) score += 6;
      for (const t of taken) if (hits(box, t)) score += t.cost;
      if (score === 0) { best = [dx, dy, anchor, box]; bestScore = 0; break; }
      if (score < bestScore) { bestScore = score; best = [dx, dy, anchor, box]; }
    }

    /* a label that cannot be placed cleanly is worse than no label: it lands on a
       neighbour and both become unreadable. Drop it — the mark still hovers, focuses
       and opens the panel, and the table view carries every row */
    const keep = rank(id) < 2 || bestScore === 0;
    m.lab.setAttribute("visibility", keep ? "visible" : "hidden");
    if (!keep) { dropped++; return; }

    m.lab.setAttribute("x", best[0]);
    m.lab.setAttribute("y", best[1]);
    m.lab.setAttribute("text-anchor", best[2]);
    taken.push(best[3]);
  });

  return dropped;
}

/* ---- position resolution, shared by the marks and the shift vectors ---- */

function resolvePositions(lifetime) {
  const byCoord = new Map();
  POINTS.forEach(p => {
    const c = lifetime ? p.lifetime : p.total;
    if (!c || state.hidden.has(p.family) || state.hiddenPrior.has(p.prior)) return;
    const k = `${c.e},${c.t}`;
    if (!byCoord.has(k)) byCoord.set(k, []);
    byCoord.get(k).push(p);
  });

  const pos = new Map(), piles = [];
  byCoord.forEach((group, k) => {
    const [ce, ct] = k.split(",").map(Number);
    const r = group.length > 1 ? 7 + group.length * 2.1 : 0;
    if (r) piles.push([X(ce), Y(ct), group.map(p => p.id)]);
    group.forEach((p, i) => {
      let x = X(ce), y = Y(ct);
      if (r) {
        const a = (i / group.length) * Math.PI * 2 - Math.PI / 2;
        x += Math.cos(a) * r;
        y += Math.sin(a) * r;
      }
      pos.set(p.id, [x, y]);
    });
  });
  return { pos, piles };
}

/* ---- the main render pass ---- */

function render() {
  const lifetime = state.mode === "lifetime";
  const { pos: positions, piles } = resolvePositions(lifetime);
  const other = resolvePositions(!lifetime).pos;
  const visible = [...positions.keys()];

  marks.forEach(({ g, lab }, id) => {
    const on = positions.has(id);
    /* a point filtered out by family is dimmed, because the context is worth keeping.
       A point with no position in this accounting is gone — ARC-AGI has no honest total
       coordinate, and a ghost of it in the corner contradicts the thesis sentence. */
    const placeable = !!(state.mode === "lifetime" ? marks.get(id).p.lifetime : marks.get(id).p.total);
    g.setAttribute("visibility", placeable ? "visible" : "hidden");
    g.classList.toggle("is-dim", !on);
    g.setAttribute("aria-hidden", on ? "false" : "true");
    g.setAttribute("tabindex", on ? "0" : "-1");
    g.setAttribute("aria-selected", id === state.selected && on ? "true" : "false");
    /* a filtered-out mark must drop its label too, or stale text stays on the chart */
    if (!on) lab.setAttribute("visibility", "hidden");
    if (on) g.setAttribute("transform", `translate(${positions.get(id)[0].toFixed(1)} ${positions.get(id)[1].toFixed(1)})`);
    g.classList.toggle("is-sel", id === state.selected && on);
  });

  syncCompact();
  const dropped = state.compact ? 0 : placeLabels(positions, visible);
  if (state.compact) marks.forEach(({ lab }) => lab.setAttribute("visibility", "hidden"));

  /* selection halo lives in its own layer above the marks, so the selected mark is
     never re-parented — re-parenting blurs it and scrambles the tab order */
  gSelHalo.textContent = "";
  const sel = marks.get(state.selected);
  if (sel && positions.has(state.selected)) {
    const [sx, sy] = positions.get(state.selected);
    const shape = famOf(sel.p.family).shape;
    const hg = el("g", { transform: `translate(${sx.toFixed(1)} ${sy.toFixed(1)})` }, gSelHalo);
    drawGlyph(shape, 12.5, { fill: "none", stroke: "var(--surface)", "stroke-width": 5 }, hg);
    drawGlyph(shape, 12.5, { fill: "none", stroke: "var(--ink)", "stroke-width": 2 }, hg);
  }

  /* shift vectors are redrawn from the resolved positions, so an arrowhead lands on
     the mark it points at even when a pile-up has spread both ends */
  gShift.setAttribute("opacity", state.shift ? 1 : 0);
  shiftLines.forEach((ln, id) => {
    const a = lifetime ? positions.get(id) : other.get(id);
    const b = lifetime ? other.get(id) : positions.get(id);
    const show = state.shift && a && b;
    ln.setAttribute("visibility", show ? "visible" : "hidden");
    if (show) {
      ln.setAttribute("x1", a[0].toFixed(1)); ln.setAttribute("y1", a[1].toFixed(1));
      ln.setAttribute("x2", b[0].toFixed(1)); ln.setAttribute("y2", b[1].toFixed(1));
    }
    ln.setAttribute("opacity", id === state.hover ? 0.85 : 0.14);
  });

  /* the ring spread moves marks off their true coordinate, so say where it is —
     otherwise a reader takes the displaced position off the gridlines */
  gAnchor.textContent = "";
  piles.forEach(([ax, ay, ids]) => {
    ids.forEach(id => {
      const [x, y] = positions.get(id);
      el("line", { x1: ax, y1: ay, x2: x, y2: y, stroke: "var(--ink-muted)", "stroke-width": 0.7, opacity: 0.4 }, gAnchor);
    });
    el("circle", { cx: ax, cy: ay, r: 1.6, fill: "var(--ink-muted)", opacity: 0.75 }, gAnchor);
  });

  /* the thesis says nothing sits in this corner under total accounting, so nothing may */
  /* derive this from the point rather than restating filter logic: the Prior filter
     used to leave the ring up, in the very corner the thesis says must go empty */
  gTarget.setAttribute("opacity", lifetime && positions.has(arc.id) ? 1 : 0);

  document.getElementById("foot-mode").textContent = lifetime
    ? "Lifetime accounting · evolution and pretraining counted as free"
    : "Total accounting · the whole experience budget counted";
  document.getElementById("foot-count").textContent =
    state.compact ? `${visible.length} shown · labels off at this width — use the table`
    : dropped ? `${visible.length} shown · ${dropped} label${dropped === 1 ? "" : "s"} crowded out — click any mark`
    : `${visible.length} of ${POINTS.length} shown`;

  renderDossier(visible.length === 0);
}

/* fonts arrive after first paint, so the first measurements are wrong — redo them */
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => { widthCache.clear(); render(); });
}
compactQuery.addEventListener("change", e => { state.compact = e.matches; render(); });
function syncCompact() { plot.classList.toggle("compact", state.compact); }

/* ---- dossier panel ---- */

function confTicks(level) {
  const n = { low: 1, medium: 2, high: 3 }[level] || 0;
  return `<span class="conf">
    <span class="conf-ticks" aria-hidden="true">${[1,2,3].map(i => `<i class="${i <= n ? "on" : ""}"></i>`).join("")}</span>
    <span class="conf-text">${level} confidence</span>
  </span>`;
}

function famMark(key, size) {
  const f = famOf(key);
  const r = size / 2.6;
  const g = glyph(f.shape, r);
  const attrs = Object.entries(g.attrs).map(([k, v]) => `${k}="${v}"`).join(" ");
  return `<svg width="${size}" height="${size}" viewBox="${-size/2} ${-size/2} ${size} ${size}" aria-hidden="true"><${g.tag} ${attrs} fill="var(--fam-${key})"></${g.tag}></svg>`;
}

const esc = s => String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const bold = s => esc(s)
  .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  .replace(/(?<![*\w])\*([^*\n]+?)\*(?![*\w])/g, "<em>$1</em>");

function renderDossier(empty) {
  const live = document.getElementById("dossier-live");
  if (empty) {
    document.getElementById("dossier").innerHTML =
      `<div class="dos-head"><h2 class="dos-title">Nothing shown</h2>` +
      `<p class="dos-task">Everything is filtered out. Turn a chip back on to read a point.</p></div>`;
    live.textContent = "No families shown.";
    return;
  }
  const p = POINTS.find(x => x.id === state.selected);
  const fam = famOf(p.family);
  const lifetime = state.mode === "lifetime";

  document.getElementById("dossier").innerHTML = `
    <div class="dos-head">
      <span class="dos-fam">${famMark(p.family, 12)} ${fam.label}${p.target ? " · target zone" : ""}</span>
      <h2 class="dos-title">${esc(p.label)}</h2>
      <p class="dos-task">${esc(p.task)}</p>
    </div>

    <p class="dos-what">${esc(p.what)}</p>

    <div>
      <div class="coords">
        <table>
          <thead>
            <tr>
              <th></th>
              <th class="${lifetime ? "is-active" : ""}">Lifetime</th>
              <th class="${!lifetime ? "is-active" : ""}">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Efficiency</th>
              <td class="${lifetime ? "is-active" : ""}">${p.lifetime.e}</td>
              <td class="${!lifetime ? "is-active" : ""}${p.total ? "" : " none"}">${p.total ? p.total.e : "—"}</td>
            </tr>
            <tr>
              <th scope="row">Transfer</th>
              <td class="${lifetime ? "is-active" : ""}">${p.lifetime.t}</td>
              <td class="${!lifetime ? "is-active" : ""}${p.total ? "" : " none"}">${p.total ? p.total.t : "—"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="coords-note">Each out of 10. Lifetime counts this learning episode only; total counts the whole experience budget.${p.total ? "" : " This point has no honest total position."}</p>
    </div>

    <div class="rows">
      ${p.age ? `<div class="row"><span class="k">Age</span><span class="v">${esc(p.age)}</span></div>` : ""}
      <div class="row"><span class="k">Where the prior came from</span><span class="v">${p.prior === "built" ? "Built by a designer, or shaped by evolution" : "Learned from data the system consumed"}</span></div>
      ${p.ecological ? `<div class="row"><span class="k">Did the test suit the animal?</span><span class="v">${esc(p.ecological)}</span></div>` : ""}
      <div class="row"><span class="k">Examples needed</span><span class="v mono">${esc(p.needed)}</span></div>
      <div class="row"><span class="k">One example is</span><span class="v">${esc(p.unit)}</span></div>
      <div class="row"><span class="k">Transfers to</span><span class="v">${esc(p.to)}</span></div>
      <div class="row"><span class="k">Does not transfer to</span><span class="v">${esc(p.notTo)}</span></div>
    </div>

    <p class="dos-note">${bold(p.note)}</p>

    <div class="row">
      <span class="k">Anchored to</span>
      <p class="src"><cite>${esc(p.source)}</cite></p>
    </div>
    ${confTicks(p.confidence)}
  `;

  document.getElementById("dossier-live").textContent =
    `${p.label}. ${fam.label}. Lifetime ${p.lifetime.e} of 10 efficiency, ${p.lifetime.t} of 10 transfer.` +
    (p.total ? ` Total ${p.total.e} and ${p.total.t}.` : " No total-accounting position.");
}

function select(id) {
  state.selected = id;
  state.pinned = id;
  render();
}

/* ---- legend, controls ---- */

const legend = document.getElementById("legend");
FAMILIES.forEach(f => {
  const b = document.createElement("button");
  b.type = "button";
  b.setAttribute("aria-pressed", "true");
  b.innerHTML = `<span class="swatch">${famMark(f.key, 13)}</span>${f.label}`;
  b.addEventListener("click", () => {
    const on = b.getAttribute("aria-pressed") === "true";
    b.setAttribute("aria-pressed", on ? "false" : "true");
    if (on) state.hidden.add(f.key); else state.hidden.delete(f.key);
    /* restore the reader's own pick as soon as its family is visible again, rather
       than stranding them on whichever point happened to come first in the data */
    const pinnedVisible = !state.hidden.has(POINTS.find(p => p.id === state.pinned).family);
    if (pinnedVisible) state.selected = state.pinned;
    else if (state.hidden.has(POINTS.find(p => p.id === state.selected).family)) {
      const next = POINTS.find(p => !state.hidden.has(p.family));
      if (next) state.selected = next.id;
    }
    render();
  });
  legend.appendChild(b);
});

/* the built/learned split is what the correlation finding rests on, so the reader
   has to be able to see it, not take it on trust */
const PRIORS = [
  { key: "built",   label: "Built or evolved" },
  { key: "learned", label: "Learned from data" }
];
const priorLegend = document.getElementById("prior-legend");
PRIORS.forEach(pr => {
  const b = document.createElement("button");
  b.type = "button";
  b.setAttribute("aria-pressed", "true");
  b.textContent = pr.label;
  b.addEventListener("click", () => {
    const on = b.getAttribute("aria-pressed") === "true";
    b.setAttribute("aria-pressed", on ? "false" : "true");
    if (on) state.hiddenPrior.add(pr.key); else state.hiddenPrior.delete(pr.key);
    const sel = POINTS.find(x => x.id === state.selected);
    if (sel && state.hiddenPrior.has(sel.prior)) {
      const next = POINTS.find(x => !state.hidden.has(x.family) && !state.hiddenPrior.has(x.prior));
      if (next) state.selected = next.id;
    }
    render();
  });
  priorLegend.appendChild(b);
});

["lifetime", "total"].forEach(m => {
  document.getElementById(`mode-${m}`).addEventListener("click", () => {
    state.mode = m;
    document.getElementById("mode-lifetime").setAttribute("aria-pressed", String(m === "lifetime"));
    document.getElementById("mode-total").setAttribute("aria-pressed", String(m === "total"));
    render();
  });
});

document.getElementById("shift-toggle").addEventListener("change", e => {
  state.shift = e.target.checked;
  render();
});

document.getElementById("age-toggle").addEventListener("change", e => {
  state.ages = e.target.checked;
  render();
});

["map", "table"].forEach(v => {
  document.getElementById(`view-${v}`).addEventListener("click", () => {
    state.view = v;
    document.getElementById("view-map").setAttribute("aria-pressed", String(v === "map"));
    document.getElementById("view-table").setAttribute("aria-pressed", String(v === "table"));
    document.getElementById("stage-map").hidden = v !== "map";
    document.getElementById("stage-table").hidden = v !== "table";
  });
});

/* ---- zones + table ---- */

document.querySelector("#data-table tbody").innerHTML = POINTS.map(p => `
  <tr>
    <td class="name"><span class="dot" style="background:var(--fam-${p.family})"></span>${esc(p.label)}</td>
    <td>${famOf(p.family).label}</td>
    <td>${p.prior === "built" ? "built or evolved" : "learned"}</td>
    <td>${p.age ? esc(p.age) : "—"}</td>
    <td>${esc(p.needed)}</td>
    <td class="num">${p.lifetime.e}</td>
    <td class="num">${p.lifetime.t}</td>
    <td class="num">${p.total ? p.total.e : "—"}</td>
    <td class="num">${p.total ? p.total.t : "—"}</td>
    <td>${p.confidence}</td>
    <td>${esc(p.source)}</td>
  </tr>
`).join("");

render();
