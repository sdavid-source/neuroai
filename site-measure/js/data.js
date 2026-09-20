/* =============================================================================
   WHAT THE NUMBER DOES — data model
   -----------------------------------------------------------------------------
   The argument: ethical failure in intelligence measurement is not a property of
   bad tests. It is what happens when a measure reaches the ALLOCATION stage
   before its CONSTRUCT VALIDITY is settled. Human psychometrics made that
   journey between 1905 and 1927. We are running the identical pipeline on
   machines now, and it has just reached stage six.

   So the spine of the map is the pipeline, not a list of harms. Each case is a
   track running left to right; each marker says where in the process something
   entered, and whether it was a failure, a contested claim, a correction, or a
   deliberate design choice that is worth seeing.
   ========================================================================== */

/* ---------------------------------------------------------------- STAGES -- */

const STAGES = [
  {
    id: "construct",
    n: 1,
    label: "Construct",
    question: "What are we claiming intelligence is?",
    detail:
      "Before anything can be measured, something has to be posited as the thing being measured. This is where reification lives: Spearman's g is a factor extracted from the correlations among test scores, and treating it as a quantity located in a head is an inference the mathematics does not supply. It is also where the newest machine constructs sit — 'dangerous capability', 'general intelligence', 'reasoning' — defined recently, and much less settled than the decisions now resting on them.",
    failure: "Reification: mistaking a statistical summary for a thing in the world."
  },
  {
    id: "operationalisation",
    n: 2,
    label: "Operationalisation",
    question: "What task stands in for it?",
    detail:
      "The construct is abstract; the test is concrete. The gap between them is construct validity, and it is almost never zero. Every task smuggles in requirements the construct never mentioned — literacy, familiarity with test conventions, a shared cultural reference frame, a particular prompt format. Those requirements then get scored as though they were the construct.",
    failure: "The task measures its own prerequisites."
  },
  {
    id: "norming",
    n: 3,
    label: "Norming",
    question: "Who is the reference population?",
    detail:
      "A raw score means nothing; it becomes a number by comparison to a reference group. If that group does not match the population being tested — or the population where the system will be deployed — the score is precise and meaningless. This is the stage where a measure can be entirely accurate about a population that does not exist.",
    failure: "The reference population and the measured population are not the same population."
  },
  {
    id: "aggregation",
    n: 4,
    label: "Aggregation",
    question: "How do many things become one number?",
    detail:
      "Collapsing a profile into a scalar is what makes ranking possible, and ranking is what makes allocation possible. The collapse always discards structure, and the choice of how to collapse is a value judgement wearing arithmetic. It is also where a formal impossibility bites: once you are scoring people and the base rates differ between groups, some fairness criteria cannot be satisfied together at all.",
    failure: "A value judgement disguised as arithmetic."
  },
  {
    id: "interpretation",
    n: 5,
    label: "Interpretation",
    question: "What is the number taken to mean?",
    detail:
      "Scores acquire meanings their construction never licensed: that the quantity is fixed, that it is innate, that a within-group heritability estimate says something about a between-group gap, that a passed evaluation is evidence of safety. Most of the damage on this map happens here rather than in the test itself.",
    failure: "Claims that the instrument's construction does not support."
  },
  {
    id: "allocation",
    n: 6,
    label: "Allocation",
    question: "What does the number do to someone?",
    detail:
      "The stage where a measurement stops being a description and becomes a decision: a school track, a military rank, an immigration quota, a sterilisation order, a bail determination, a deployment. Everything upstream is an academic dispute until it reaches here. This is the stage the human column reached in 1917 and the machine column is reaching now.",
    failure: "An irreversible decision resting on an unsettled construct."
  },
  {
    id: "feedback",
    n: 7,
    label: "Feedback",
    question: "How does the measure change what it measures?",
    detail:
      "Once a score carries consequences, effort reorganises around the score. Coaching industries appear; research agendas bend toward the benchmark; evaluation sets leak into training corpora. Goodhart's law is not a warning about bad measures — it is a description of what happens to good ones once they matter.",
    failure: "The measure becomes a target and stops being a measure."
  }
];

/* ----------------------------------------------------------- MARKER KINDS -- */
/* Palette validated with the dataviz validator (all-pairs, dark surface
   #141922): lightness band, chroma floor, CVD separation, normal-vision floor
   and contrast all PASS. Shape doubles every colour, so identity is never
   carried by hue alone. */

const KINDS = {
  failure: {
    label: "Documented failure",
    color: "#d03b3b",
    shape: "circle",
    gloss: "Something went wrong at this stage, and there is a record of it."
  },
  contested: {
    label: "Contested",
    color: "#c98500",
    shape: "ring",
    gloss:
      "A claim that is disputed on the evidence. The map marks the dispute rather than picking a side."
  },
  correction: {
    label: "Correction",
    color: "#3987e5",
    shape: "diamond",
    gloss:
      "The instrument, or the field, caught and fixed something. Measurement is also how measurement gets corrected."
  },
  design: {
    label: "Design choice",
    color: "#7c8798",
    shape: "square",
    gloss:
      "A deliberate decision worth seeing — neither a failure nor a fix. Often the moment a later failure became possible."
  },
  constraint: {
    label: "Formal constraint",
    color: "#9085e9",
    shape: "star",
    gloss:
      "Not an event but a proof: a limit that applies to every case on this map, whatever anyone intends."
  }
};

/* ----------------------------------------------------------------- CASES -- */

const CASES = [
  /* ============================ HUMAN PSYCHOMETRICS ======================= */
  {
    id: "binet",
    domain: "human",
    label: "The Binet–Simon scale",
    who: "Binet & Simon",
    years: "1905",
    summary: "Built to find children who needed help. Read, within a decade, as a measure of fixed worth.",
    detail:
      "Commissioned by the French ministry of education to identify children who were not benefiting from ordinary instruction so that they could be given something else. Binet stated the limits of his own instrument unusually clearly: the scale was a practical device, not a measure of a fixed quantity, and he attacked what he called the 'brutal pessimism' of treating intelligence as unalterable, proposing remedial 'mental orthopaedics' instead. The test that opens the history of intelligence measurement arrived with its own caveats attached.",
    cite:
      "Binet, A. & Simon, T. (1905). Méthodes nouvelles pour le diagnostic du niveau intellectuel des anormaux. L'Année Psychologique 11, 191–244. • Binet, A. (1909). Les idées modernes sur les enfants.",
    markers: [
      {
        stage: "construct",
        kind: "design",
        title: "An instrument shipped with its own limits",
        what:
          "Binet defined the scale as a practical sorting device for a specific administrative purpose, explicitly denied that it measured a fixed or unitary quantity, and argued that the children it identified could be taught to improve.",
        evidence:
          "The 1909 writings are direct about it: he calls the view that a child's intelligence is a fixed quantity a 'brutal pessimism' and proposes remedial training against it.",
        stake:
          "This is the counterfactual the rest of the map is measured against. The caveats existed, were published, and were in the instrument's own documentation."
      },
      {
        stage: "interpretation",
        kind: "failure",
        title: "The test travelled; the caveat did not",
        what:
          "Translated and adapted abroad — most influentially by Goddard and then in Terman's Stanford–Binet — the scale was read as measuring innate, fixed capacity, which is precisely the reading Binet had ruled out.",
        evidence:
          "Within roughly a decade the same instrument was being used to argue for permanent classification of children and adults, in a framework its author had rejected in print.",
        stake:
          "The most reliably transmitted part of a measurement instrument is the number. The epistemics stay behind."
      }
    ]
  },
  {
    id: "goddard",
    domain: "human",
    label: "Goddard at Ellis Island",
    who: "H. H. Goddard",
    years: "1913",
    summary: "Testing new arrivals, in English, on material assuming American familiarity.",
    detail:
      "Goddard brought Binet-derived testing to newly arrived immigrants at Ellis Island, reporting extraordinary rates of 'feeble-mindedness' among Jewish, Hungarian, Italian and Russian arrivals. The tests were administered in English or through interpreters, often within hours of a transatlantic crossing, using material that assumed familiarity with American objects and conventions.",
    cite:
      "Goddard, H. H. (1917). Mental tests and the immigrant. Journal of Delinquency 2, 243–277. • Gould, S. J. (1981). The Mismeasure of Man.",
    markers: [
      {
        stage: "norming",
        kind: "failure",
        title: "The reference population was not the tested population",
        what:
          "The scales had been standardised on American schoolchildren. They were then administered to exhausted non-English-speaking adults and the resulting scores were read against the original norms.",
        evidence:
          "Goddard's own reports describe administration through interpreters and on material requiring American cultural knowledge, while the classification thresholds were carried over unchanged.",
        stake:
          "The most basic norming failure there is, and it produced numbers precise enough to act on."
      },
      {
        stage: "allocation",
        kind: "failure",
        title: "From score to deportation",
        what:
          "Results were used to support exclusion, and Goddard reported a substantial rise in deportations for mental deficiency in the period following the introduction of testing, which he credited to the tests.",
        evidence: "Goddard (1917) reports the deportation increases and attributes them to the testing programme.",
        stake:
          "Stage six, reached eight years after stage one, on an instrument whose author had said it did not measure a fixed quantity."
      }
    ]
  },
  {
    id: "army",
    domain: "human",
    label: "Army Alpha & Beta → Brigham",
    who: "Yerkes; Brigham",
    years: "1917–1930",
    summary: "1.75 million men tested. A racial hierarchy inferred, published, acted on — and retracted.",
    detail:
      "The largest testing programme ever attempted at that point: Alpha for literate recruits, Beta for those who could not read. The data were then used by Carl Brigham in A Study of American Intelligence (1923) to argue for an innate racial and national hierarchy of intelligence. Brigham went on to help design the SAT in 1926. In 1930 he published a retraction of the 1923 conclusions.",
    cite:
      "Yerkes, R. M. (ed.) (1921). Psychological Examining in the United States Army. Memoirs NAS 15. • Brigham, C. C. (1923). A Study of American Intelligence. • Brigham, C. C. (1930). Intelligence tests of immigrant groups. Psychological Review 37, 158–165. • Snyderman, M. & Herrnstein, R. J. (1983). Intelligence tests and the Immigration Act of 1924. American Psychologist 38, 986–995.",
    markers: [
      {
        stage: "operationalisation",
        kind: "failure",
        title: "The test measured its own prerequisites",
        what:
          "Alpha assumed literacy and familiarity with timed written examinations. Beta, intended for non-readers, still assumed pencils, forms and test-taking conventions. Assignment between the two was badly managed under field conditions, and many recruits with no English sat Alpha and scored near zero.",
        evidence:
          "The programme's own administrative records describe the assignment problems; scores correlated strongly with years of residence in the United States.",
        stake:
          "A score of zero from a man who could not read the instructions was entered as a measurement of his intelligence."
      },
      {
        stage: "aggregation",
        kind: "failure",
        title: "1.75 million people, one letter grade each",
        what:
          "Results were collapsed into letter grades used to inform rank assignment and officer-training recommendations.",
        evidence: "Yerkes (1921) documents the grading scheme and its use in assignment.",
        stake: "The collapse is what made the data usable for allocation, and what made the caveats invisible."
      },
      {
        stage: "interpretation",
        kind: "failure",
        title: "Residence time read as race",
        what:
          "Brigham (1923) interpreted the group score differences as evidence of innate racial and national hierarchy.",
        evidence:
          "The same dataset showed score rising with years of residence in the US — a pattern straightforwardly consistent with language and cultural familiarity, which the innate reading had to set aside.",
        stake: "The inference that the map's whole interpretation stage exists to mark."
      },
      {
        stage: "allocation",
        kind: "contested",
        title: "The Immigration Act of 1924",
        what:
          "How much the Army data actually drove the national-origins quotas of the 1924 Act is disputed.",
        evidence:
          "Gould (1981) argued the testing results were central to the case for the quotas. Snyderman & Herrnstein (1983) reviewed the congressional record and found intelligence testing was barely invoked in the debates. The dispute has not been resolved.",
        stake:
          "Marked contested rather than resolved. A map about the ethics of evidence does not get to be careless with evidence.",
        contested: true
      },
      {
        stage: "interpretation",
        kind: "correction",
        title: "Brigham retracts, 1930",
        what:
          "Brigham published a repudiation of his own 1923 conclusions, arguing that the group comparisons had been invalid and that the study was, in his words, without foundation.",
        evidence: "Brigham, C. C. (1930). Intelligence tests of immigrant groups. Psychological Review 37, 158–165.",
        stake:
          "Self-correction is real and it happened here. It also arrived seven years, one immigration act and an unknown number of lives late. Retraction does not run backwards."
      }
    ]
  },
  {
    id: "buck",
    domain: "human",
    label: "Buck v. Bell",
    who: "US Supreme Court",
    years: "1927",
    summary: "Compulsory sterilisation upheld 8–1. The measurement underneath it barely existed.",
    detail:
      "The Supreme Court upheld Virginia's compulsory sterilisation of Carrie Buck, with Holmes writing for the majority that 'three generations of imbeciles are enough'. The decision provided constitutional cover for eugenic sterilisation statutes under which an estimated 60,000 or more people were sterilised in the United States, with some laws surviving into the 1970s. Buck v. Bell has never been formally overruled.",
    cite:
      "Buck v. Bell, 274 U.S. 200 (1927). • Lombardo, P. A. (2008). Three Generations, No Imbeciles: Eugenics, the Supreme Court, and Buck v. Bell.",
    markers: [
      {
        stage: "operationalisation",
        kind: "failure",
        title: "There was no measurement",
        what:
          "The evidence of hereditary feeble-mindedness was thin and in part fabricated. The 'third generation' was Carrie Buck's infant daughter Vivian, assessed at around seven months old; Vivian later made her school's honour roll before dying at eight.",
        evidence:
          "Lombardo's archival work established that the case was substantially arranged, with Buck's own counsel cooperating with the outcome.",
        stake:
          "The stage-two failure and the stage-six decision are the same event here. An irreversible act rested on an assessment that would not survive a first-year methods seminar."
      },
      {
        stage: "allocation",
        kind: "failure",
        title: "Liberty, on a score",
        what:
          "A classification of mental capacity was made sufficient grounds for compulsory, irreversible surgery.",
        evidence:
          "274 U.S. 200 (1927); subsequent state statutes and sterilisation records, with estimates upward of 60,000 procedures.",
        stake:
          "The high-water mark of the pipeline. This is what stage six looks like when stages one through five are unsettled and nobody waits."
      }
    ]
  },
  {
    id: "elevenplus",
    domain: "human",
    label: "The eleven-plus",
    who: "England & Wales",
    years: "1944–",
    summary: "One exam at eleven, sorting a cohort into educational tracks — and a coaching industry in response.",
    detail:
      "Under the tripartite system created by the 1944 Education Act, an examination taken at about age eleven allocated children to grammar, technical or secondary modern schools, in practice setting their educational ceiling. Most of England abandoned it from the 1960s; it survives in a minority of areas.",
    cite:
      "Education Act 1944 (7 & 8 Geo. 6 c. 31). • Gillard, D. (2018). Education in England: a history. • Crook, D., Power, S. & Whitty, G. (1999). The Grammar School Question.",
    markers: [
      {
        stage: "norming",
        kind: "contested",
        title: "Pass marks adjusted by sex",
        what:
          "Girls outscored boys, and a number of local authorities set different pass marks by sex in order to keep grammar-school intakes roughly balanced.",
        evidence:
          "Documented in several authorities, though practice varied and records are uneven across the country.",
        stake:
          "A quiet admission that the scale was not a neutral instrument: where the ranking produced an unwanted allocation, the ranking was adjusted rather than the allocation.",
        contested: true
      },
      {
        stage: "allocation",
        kind: "failure",
        title: "A ceiling set at eleven",
        what:
          "A single examination determined which of three school types a child entered, with very limited transfer between them afterwards.",
        evidence:
          "The tripartite structure and the low rates of subsequent transfer between school types are well documented.",
        stake: "Stage six applied to an entire national cohort, annually, on one morning's testing."
      },
      {
        stage: "feedback",
        kind: "failure",
        title: "The coaching industry",
        what:
          "Preparation for the examination became a market, so the score came to reflect preparation — and therefore family resources — alongside whatever else it measured.",
        evidence:
          "The persistence of the coaching market in remaining selective areas, and the socioeconomic composition of grammar-school intakes.",
        stake:
          "Goodhart, in its cleanest form: the measure acquired consequences, effort reorganised around it, and it stopped measuring what it had measured."
      }
    ]
  },
  {
    id: "larryp",
    domain: "human",
    label: "Larry P. v. Riles / PASE v. Hannon",
    who: "US federal courts",
    years: "1979–1980",
    summary: "Two courts, nearly the same question about the same tests, opposite answers.",
    detail:
      "In Larry P., a California federal court enjoined the state from using standardised IQ tests to place Black children in classes for the 'educable mentally retarded', finding the tests culturally biased and the resulting placements grossly disproportionate. One year later, in PASE, an Illinois federal court walked through the test items itself and concluded they were not culturally biased.",
    cite:
      "Larry P. v. Riles, 495 F. Supp. 926 (N.D. Cal. 1979), aff'd 793 F.2d 969 (9th Cir. 1984). • PASE v. Hannon, 506 F. Supp. 831 (N.D. Ill. 1980).",
    markers: [
      {
        stage: "allocation",
        kind: "correction",
        title: "The allocation is severed from the score",
        what:
          "California was barred from using IQ tests for this placement decision. The instrument was not abolished; its authority to allocate was removed.",
        evidence: "495 F. Supp. 926, affirmed 793 F.2d 969.",
        stake:
          "The most transferable correction on the map. You do not have to settle whether a measure is valid to decide what it is allowed to decide."
      },
      {
        stage: "operationalisation",
        kind: "contested",
        title: "Item bias is not visible by inspection",
        what:
          "PASE reached the opposite conclusion about the same instruments, with the judge examining individual items and finding only a handful objectionable.",
        evidence: "506 F. Supp. 831, decided within a year of Larry P., on substantially overlapping questions.",
        stake:
          "Two courts, both reasoning carefully, reached opposite findings of fact. Whatever item bias is, it is not something reading the items reveals.",
        contested: true
      }
    ]
  },
  {
    id: "flynn",
    domain: "human",
    label: "The Flynn effect",
    who: "J. R. Flynn",
    years: "1984–",
    summary: "Scores rose ~3 points a decade. The instrument produced the data that undercut its strongest claims.",
    detail:
      "Flynn showed that raw performance on unchanged tests rose steadily through the twentieth century across dozens of countries — on the order of three IQ points per decade, far too fast for genetic change. Because tests are re-normed to a mean of 100 each generation, none of this appears in anyone's reported score.",
    cite:
      "Flynn, J. R. (1984). The mean IQ of Americans: massive gains 1932 to 1978. Psychological Bulletin 95, 29–51. • Flynn, J. R. (1987). Massive IQ gains in 14 nations. Psychological Bulletin 101, 171–191. • Bratsberg, B. & Rogeberg, O. (2018). Flynn effect and its reversal are both environmentally caused. PNAS 115, 6674–6678.",
    markers: [
      {
        stage: "aggregation",
        kind: "design",
        title: "Re-norming hides the most interesting fact",
        what:
          "The scale is re-standardised to a mean of 100 for each new cohort, so the reported score is a rank within a generation rather than a quantity.",
        evidence: "Standard practice in test construction, and the reason the gains were not noticed for decades.",
        stake:
          "The aggregation rule made the instrument's single most important empirical finding invisible in its own output for fifty years."
      },
      {
        stage: "interpretation",
        kind: "correction",
        title: "Too fast to be genetic",
        what:
          "Gains of roughly three points per decade, sustained across many countries, are incompatible with genetic change on that timescale. Whatever the tests track moves with environment.",
        evidence: "Flynn (1984, 1987), replicated across dozens of national datasets.",
        stake:
          "The strongest correction on the map, and it came from inside: the same instruments, administered carefully over time, refuted the strongest claims that had been made for them."
      },
      {
        stage: "interpretation",
        kind: "contested",
        title: "The reversal",
        what:
          "Gains have stalled or reversed in several Nordic countries since the 1990s. The causes of both the rise and the reversal remain unsettled.",
        evidence: "Bratsberg & Rogeberg (2018) use within-family comparisons to argue the reversal is environmental.",
        stake:
          "Honest bookkeeping: the correction is solid, the explanation of it is not, and the map should not borrow certainty it does not have.",
        contested: true
      }
    ]
  },
  {
    id: "gould",
    domain: "human",
    label: "The Mismeasure of Man, re-measured",
    who: "Gould; Lewis et al.",
    years: "1981–2011",
    summary: "The critic of biased measurement was measured, and accused of bias.",
    detail:
      "Gould's book is the canonical critique of intelligence measurement, and its central charge — reification — is a claim about the mathematics rather than the politics. Thirty years later, a team re-measured the Morton skull collection Gould had used as his showpiece and reported that Morton's original figures were largely accurate while Gould's re-analysis contained errors. Subsequent replies disputed that in turn.",
    cite:
      "Gould, S. J. (1981, rev. 1996). The Mismeasure of Man. • Lewis, J. E. et al. (2011). The mismeasure of science: Stephen Jay Gould versus Samuel George Morton. PLoS Biology 9, e1001071. • Kaplan, J. M., Pigliucci, M. & Banta, J. A. (2015). Gould on Morton, redux. Stud. Hist. Phil. Biol. Biomed. Sci. 52, 22–31.",
    markers: [
      {
        stage: "construct",
        kind: "failure",
        title: "Reification",
        what:
          "Factor analysis of correlated test scores yields a first principal component. Naming it g and then treating it as a physical quantity in the head is an inference the procedure does not supply — the factor is a property of the correlation matrix, and rotating the solution differently gives different factors.",
        evidence: "Gould's core methodological argument, restated in the 1996 revision against The Bell Curve.",
        stake:
          "The stage-one failure that everything downstream inherits. If the construct is an artefact, the validity of every measure of it is undefined rather than low."
      },
      {
        stage: "norming",
        kind: "contested",
        title: "Gould v. Morton v. Lewis",
        what:
          "Gould argued Morton had unconsciously biased his nineteenth-century skull measurements. Lewis et al. re-measured and reported Morton was broadly accurate and Gould was not. Kaplan et al. then argued Lewis et al. had misread what Gould claimed.",
        evidence: "All three papers are in print and the dispute is live.",
        stake:
          "Either a devastating irony or the system working exactly as intended. The map declines to choose, and includes it because a project on the ethics of measurement that exempted its own favourite critic would be doing the thing it criticises.",
        contested: true
      }
    ]
  },
  {
    id: "bellcurve",
    domain: "human",
    label: "The Bell Curve → the APA task force",
    who: "Herrnstein & Murray; Neisser et al.",
    years: "1994–1996",
    summary: "A heritability inference the statistic does not license — and a discipline publishing its own uncertainty.",
    detail:
      "The Bell Curve moved from within-group heritability estimates toward claims about between-group differences. The American Psychological Association convened a task force in response, which set out in unusually plain language what was established and what was not.",
    cite:
      "Herrnstein, R. J. & Murray, C. (1994). The Bell Curve. • Neisser, U. et al. (1996). Intelligence: knowns and unknowns. American Psychologist 51, 77–101. • Lewontin, R. C. (1970). Race and intelligence. Bulletin of the Atomic Scientists 26, 2–8.",
    markers: [
      {
        stage: "interpretation",
        kind: "failure",
        title: "Heritability is not what it sounds like",
        what:
          "Heritability is the proportion of variance in a trait within a particular population and environment attributable to genetic variance. It is not a measure of how fixed a trait is, and it licenses no inference about the cause of a difference between two populations.",
        evidence:
          "Lewontin's seedlings argument makes the point exactly: identical seed stock split between rich and poor soil gives high within-group heritability in each and an entirely environmental between-group difference.",
        stake:
          "A statistical term whose ordinary-language meaning is wrong in a way that happens to support the conclusion people want from it."
      },
      {
        stage: "interpretation",
        kind: "correction",
        title: "Knowns and unknowns",
        what:
          "The APA task force stated what the evidence supported and, more usefully, what it did not — including that there was no adequate explanation of the Black–White score gap and no direct evidence for a genetic one.",
        evidence: "Neisser, U. et al. (1996). Intelligence: knowns and unknowns. American Psychologist 51, 77–101.",
        stake:
          "A field publishing its own uncertainty under public pressure. The model for what the machine-evaluation literature will need and does not yet have."
      }
    ]
  },

  /* ============================= MACHINE BENCHMARKS ======================= */
  {
    id: "turing",
    domain: "machine",
    label: "The imitation game",
    who: "Turing; Weizenbaum; Loebner",
    years: "1950–2019",
    summary: "A deliberate substitute question that stopped being treated as a substitute.",
    detail:
      "Turing proposed replacing 'can machines think?' — which he considered too meaningless to deserve discussion — with an operational test of indistinguishability in conversation. This is the founding operationalisation of machine intelligence, and it was offered explicitly as a replacement question rather than a definition.",
    cite:
      "Turing, A. M. (1950). Computing machinery and intelligence. Mind 59, 433–460. • Weizenbaum, J. (1966). ELIZA. Communications of the ACM 9, 36–45.",
    markers: [
      {
        stage: "construct",
        kind: "design",
        title: "Substitute the question, and say so",
        what:
          "Turing replaces an unanswerable question with a decidable one and states that this is what he is doing.",
        evidence: "Turing (1950) is explicit that the original question is being set aside rather than answered.",
        stake:
          "Compare Binet. Both founders stated their limits. Both were read past within a generation. The pattern is the finding."
      },
      {
        stage: "operationalisation",
        kind: "failure",
        title: "Measuring the judge",
        what:
          "Indistinguishability rewards imitation of human conversational behaviour, including hesitation, error and evasion. ELIZA, with no model of anything, drew sincere belief from users in 1966. Loebner Prize entrants optimised for deflection and simulated typing delays.",
        evidence: "Weizenbaum's own account of users' reactions to ELIZA; the strategies of competitive Loebner entries.",
        stake:
          "The score is a joint measurement of the system and the judge's credulity, and nothing in the protocol separates them."
      }
    ]
  },
  {
    id: "imagenet",
    domain: "machine",
    label: "ImageNet and its person categories",
    who: "Deng et al.; Crawford & Paglen; Yang et al.",
    years: "2009–2020",
    summary: "A benchmark inherits a taxonomy nobody examined, defines a decade of research, and is then audited.",
    detail:
      "ImageNet built its label set from WordNet's noun hierarchy, including a 'person' subtree of thousands of categories, and populated it with scraped images labelled by crowdworkers. It became the benchmark that organised computer vision research for a decade.",
    cite:
      "Deng, J. et al. (2009). ImageNet: a large-scale hierarchical image database. CVPR. • Crawford, K. & Paglen, T. (2019). Excavating AI. • Yang, K. et al. (2020). Towards fairer datasets. FAccT. • Shankar, S. et al. (2017). No classification without representation.",
    markers: [
      {
        stage: "norming",
        kind: "failure",
        title: "An inherited taxonomy, and a skewed sample",
        what:
          "The person subtree carried categories that were slurs, and others — judgements of character, criminality or attractiveness — that are not inferable from a photograph at all. Geographic sampling skewed heavily toward North America and Western Europe.",
        evidence:
          "Crawford & Paglen's audit of the person categories; Shankar et al. (2017) on the geographic distribution of images.",
        stake:
          "The categories were adopted from a lexical database built for an unrelated purpose, and nobody checked whether they were things a photograph could be evidence of."
      },
      {
        stage: "norming",
        kind: "correction",
        title: "The person subtree is filtered",
        what:
          "After the audit and the ImageNet Roulette demonstration made the categories publicly legible in 2019, the maintainers removed the large majority of person synsets and their associated images.",
        evidence: "Yang, K. et al. (2020). Towards fairer datasets. FAccT.",
        stake:
          "A benchmark was audited from outside and changed. It took ten years and an art installation, but the mechanism exists."
      },
      {
        stage: "feedback",
        kind: "failure",
        title: "The benchmark set the agenda",
        what:
          "Architectures, loss functions and evaluation practice across computer vision were shaped to move a number on this dataset.",
        evidence: "The post-2012 research trajectory is organised around ImageNet top-1 and top-5 accuracy.",
        stake:
          "A field's research priorities became downstream of a label set assembled from a lexical database in 2009."
      }
    ]
  },
  {
    id: "gendershades",
    domain: "machine",
    label: "Gender Shades",
    who: "Buolamwini & Gebru",
    years: "2018",
    summary: "The instrument that exposed the harm was itself a benchmark. This is the case that saves the map from being anti-measurement.",
    detail:
      "Commercial gender-classification systems reported high aggregate accuracy on benchmarks that were overwhelmingly light-skinned and male. Buolamwini and Gebru constructed a deliberately balanced benchmark and evaluated the same systems against it.",
    cite:
      "Buolamwini, J. & Gebru, T. (2018). Gender Shades: intersectional accuracy disparities in commercial gender classification. PMLR 81, 77–91. • Raji, I. D. & Buolamwini, J. (2019). Actionable auditing. AIES.",
    markers: [
      {
        stage: "norming",
        kind: "failure",
        title: "Accurate about a population that wasn't the deployed one",
        what:
          "The evaluation sets in standard use were heavily skewed by skin type and sex. The reported accuracy figures were not wrong; they described a population that did not match where the systems were being used.",
        evidence: "The composition of the then-standard face benchmarks, documented in the paper.",
        stake:
          "A norming failure produces numbers that are correct and useless — the hardest kind to notice from inside."
      },
      {
        stage: "norming",
        kind: "correction",
        title: "Build a better benchmark, publish the gap",
        what:
          "A new balanced benchmark showed error rates up to roughly 34.7% for darker-skinned women against roughly 0.8% for lighter-skinned men on the same commercial systems. Several vendors revised their systems; follow-up auditing tracked whether they had.",
        evidence: "Buolamwini & Gebru (2018); Raji & Buolamwini (2019) on the vendors' responses.",
        stake:
          "The single most important marker on this map. Measurement is not only the mechanism of harm — it is the only instrument that made this harm legible, and the fix was a better measurement rather than less measurement."
      }
    ]
  },
  {
    id: "compas",
    domain: "machine",
    label: "COMPAS, and a proof about fairness",
    who: "ProPublica; Northpointe; Kleinberg et al.",
    years: "2016–2017",
    summary: "Both sides of the fairness argument were right, and a theorem explains why they had to be.",
    detail:
      "Risk scores used to inform bail, sentencing and parole decisions. ProPublica reported that Black defendants who did not go on to reoffend were roughly twice as likely to have been labelled high risk. Northpointe replied that the instrument was equally calibrated across groups: a given score carried the same reoffence rate regardless of race. Both claims were accurate.\n\nCOMPAS is not an intelligence test. It is on this map because it is the purest modern instance of the pipeline reaching allocation, and because the result attached to it constrains every other case here.",
    cite:
      "Angwin, J., Larson, J., Mattu, S. & Kirchner, L. (2016). Machine bias. ProPublica. • Dieterich, W., Mendoza, C. & Brennan, T. (2016). COMPAS risk scales. Northpointe. • Kleinberg, J., Mullainathan, S. & Raghavan, M. (2017). Inherent trade-offs in the fair determination of risk scores. ITCS. • Chouldechova, A. (2017). Fair prediction with disparate impact. Big Data 5, 153–163.",
    markers: [
      {
        stage: "aggregation",
        kind: "constraint",
        title: "You cannot have both. This is a theorem.",
        what:
          "Kleinberg, Mullainathan & Raghavan proved that, except in degenerate cases, no scoring rule can simultaneously be calibrated within groups and equalise false-positive and false-negative rates across them when the base rates differ. Chouldechova established the same incompatibility for the COMPAS setting specifically.",
        evidence:
          "Kleinberg et al. (2017), ITCS; Chouldechova (2017), Big Data 5, 153–163. Both are proofs, not empirical findings.",
        stake:
          "'Just make the test fair' is not an available instruction. Which fairness criterion an instrument satisfies is a normative choice that someone makes, and the choice cannot be avoided by building a better model. This is the load-bearing element of the whole map: it means the ethics of measurement is not a solvable engineering problem at stage four, and therefore has to be handled at stage six."
      },
      {
        stage: "allocation",
        kind: "failure",
        title: "Scores attached to liberty",
        what:
          "Risk scores informed pretrial detention, sentencing and parole decisions across multiple US jurisdictions.",
        evidence: "ProPublica's analysis of Broward County data and the deployment record.",
        stake:
          "Stage six, reached with stage four provably unresolvable. The eugenic-era comparison is not rhetorical — it is the same structure with better statistics."
      }
    ]
  },
  {
    id: "arc",
    domain: "machine",
    label: "On the Measure of Intelligence / ARC",
    who: "F. Chollet",
    years: "2019–",
    summary: "An explicit attempt to fix stage one — now being Goodharted, which is evidence for its own thesis.",
    detail:
      "Chollet argues that benchmarks measuring task skill measure the wrong thing, because skill can always be bought with more training data and stronger priors. He proposes defining intelligence as skill-acquisition efficiency — competence gained per unit of experience — and built ARC to operationalise it with tasks designed so that no training corpus contains them.",
    cite:
      "Chollet, F. (2019). On the measure of intelligence. arXiv:1911.01547. • Chollet, F. et al. (2024–2025). ARC Prize technical reports.",
    markers: [
      {
        stage: "construct",
        kind: "design",
        title: "Redefine the construct, then build to it",
        what:
          "Intelligence defined as skill-acquisition efficiency relative to stated priors and experience, rather than as performance on any fixed task distribution.",
        evidence: "Chollet (2019), which gives a formal definition before proposing the benchmark.",
        stake:
          "The only case on this map where someone identified the stage-one failure and rebuilt the instrument to address it, in public, before the allocation stakes arrived."
      },
      {
        stage: "feedback",
        kind: "contested",
        title: "The anti-Goodhart benchmark is being Goodharted",
        what:
          "Competition pipelines have targeted ARC with program search and, later, large models with very heavy test-time compute. Whether high scores now indicate what the construct intended is disputed.",
        evidence: "The ARC Prize results and the surrounding methodological debate about test-time compute budgets.",
        stake:
          "Evidence for Chollet's thesis and against his instrument at the same time. If stage seven catches even the benchmark built specifically to resist it, stage seven may be a property of measurement rather than of bad measures.",
        contested: true
      }
    ]
  },
  {
    id: "contamination",
    domain: "machine",
    label: "Training on the test set",
    who: "contamination literature",
    years: "2020–",
    summary: "The evaluation sets are in the training corpus, and the corpora are not public.",
    detail:
      "Web-scale pretraining ingests the public internet, which contains the benchmark sets. A score may then reflect memorisation rather than the capability the benchmark names — and because the corpora are generally not published, contamination is often undetectable from outside.",
    cite:
      "Brown, T. et al. (2020). Language models are few-shot learners, §4 (contamination analysis). • Sainz, O. et al. (2023). NLP evaluation in trouble. EMNLP Findings. • Zhou, K. et al. (2023). Don't make your LLM an evaluation benchmark cheater. arXiv:2311.01964.",
    markers: [
      {
        stage: "feedback",
        kind: "failure",
        title: "The measure ingested itself",
        what:
          "Benchmark items appear in pretraining data, so reported performance conflates capability with recall of the evaluation set.",
        evidence:
          "Contamination analyses have been reported by the model developers themselves since GPT-3, and systematically since 2023.",
        stake:
          "Stage seven with no human in the loop deciding to cheat. Nobody has to teach to the test; the test is simply in the corpus."
      },
      {
        stage: "operationalisation",
        kind: "contested",
        title: "The fix costs verifiability",
        what:
          "The standard remedy — private, held-out or continuously refreshed evaluation sets — restores validity by moving the evaluation behind a wall that outsiders cannot inspect.",
        evidence: "The design of current private-holdout leaderboards and refreshed benchmark suites.",
        stake:
          "A real trade-off with no clean answer: you can have a benchmark that is uncontaminated or one that is independently checkable, and currently not both.",
        contested: true
      }
    ]
  },
  {
    id: "evals",
    domain: "machine",
    label: "Evaluations as deployment gates",
    who: "frontier developers; AI Safety Institutes",
    years: "2023–",
    summary: "Machine measurement arrives at stage six. This is the point of the map.",
    detail:
      "Frontier developers now condition release decisions on evaluation results: capability thresholds that trigger required safeguards or hold a deployment. National AI Safety and Security Institutes conduct external testing. The pipeline that took human psychometrics from 1905 to 1927 has taken machine evaluation from 1950 to now, and it has just reached the stage where the score decides something.",
    cite:
      "Anthropic (2023–). Responsible Scaling Policy. • OpenAI (2023). Preparedness Framework. • Google DeepMind (2024). Frontier Safety Framework. • Shevlane, T. et al. (2023). Model evaluation for extreme risks. arXiv:2305.15324.",
    markers: [
      {
        stage: "allocation",
        kind: "design",
        title: "The score now holds the release",
        what:
          "Evaluation results are formally tied to deployment decisions and to which safeguards are required, under published frameworks.",
        evidence: "The published scaling and preparedness frameworks, and the external testing arrangements with national institutes.",
        stake:
          "Stage six, deliberately and in public, with the frameworks written down in advance. That last part is genuinely better than 1917 — and it is also the only thing standing where Buck v. Bell stood."
      },
      {
        stage: "construct",
        kind: "contested",
        title: "New constructs, old problem",
        what:
          "'Dangerous capability', 'autonomous replication', 'uplift' — the constructs are recent, their validity is far less settled than the decisions resting on them, and the thresholds are largely set by the organisations being measured.",
        evidence:
          "The frameworks define their own thresholds; external institutes test against them but do not generally set them.",
        stake:
          "The exact configuration this map was built to mark: high-stakes allocation running ahead of settled construct validity, which is the condition every failure in the human column shares.",
        contested: true
      },
      {
        stage: "interpretation",
        kind: "failure",
        title: "A passed eval is not a safety result",
        what:
          "A negative result means this elicitation, under this budget, did not surface the capability. It is routinely summarised as evidence that the capability is absent.",
        evidence:
          "The caveat appears in the evaluation reports themselves — elicitation is a lower bound on capability — and is regularly dropped in the surrounding communication.",
        stake:
          "The same move as reading a Binet score as a fixed quantity: a bounded, conditional measurement promoted to a general claim, by the people relaying it rather than the people making it."
      }
    ]
  }
];

/* ------------------------------------------------- STAKES × VALIDITY VIEW -- */

const STAKE_LEVELS = [
  { v: 1, label: "Nothing external", gloss: "A research signal. Being wrong costs a paper." },
  { v: 2, label: "Feedback", gloss: "Guidance to the person or team measured. Reversible, and they can argue with it." },
  { v: 3, label: "Opportunity", gloss: "A school track, a rank, a job, a funding decision, a release date." },
  { v: 4, label: "Liberty", gloss: "Detention, sentencing, compulsory surgery — or a deployment that removes options from people who were never measured." }
];

const VALIDITY_RUBRIC = [
  "Is the construct defined independently of the test that measures it?",
  "Does the score predict the outcomes claimed for it, out of sample and across populations?",
  "Is there published evidence about what the instrument fails to capture?",
  "Has it been audited by people who did not build it?",
  "Does movement in the score correspond to movement in the construct, or is it Goodhartable?"
];

const POINTS = [
  { id: "binet-designed", domain: "human", label: "Binet–Simon, as designed", stakes: 2, validity: 45, lx: -14, ly: -18, anchor: "end",
    note: "Identifying children for remedial support, with the author's caveats attached. Low validity by modern standards, but the stakes were matched to it and the limits were published." },
  { id: "army-p", domain: "human", label: "Army Alpha / Beta", stakes: 3, validity: 20, lx: 12, ly: -16,
    note: "Rank and officer-training assignment on an instrument that scored literacy and residence time. Nothing in the rubric is satisfied, and the allocation was immediate." },
  { id: "sterilisation", domain: "human", label: "Eugenic sterilisation assessment", stakes: 4, validity: 10, lx: 12, ly: -18,
    note: "The worst point on the plot and the most consequential: essentially no construct validity, and an irreversible decision about bodily autonomy. Stage six with stage one empty." },
  { id: "elevenplus-p", domain: "human", label: "The eleven-plus", stakes: 3, validity: 35, lx: 12, ly: 24,
    note: "Better-constructed than the Army tests and still setting an educational ceiling at eleven, on a score that partly measured coaching." },
  { id: "wais", domain: "human", label: "Modern clinical IQ (WAIS/WISC)", stakes: 3, validity: 70, lx: 12, ly: -16,
    note: "The best-validated instrument on this plot: standardised, extensively normed, predictive of several outcomes, and used by trained clinicians who are taught its limits. Still used for consequential placement — which is why it sits at stakes 3 rather than 2." },
  { id: "compas-p", domain: "machine", label: "COMPAS risk scores", stakes: 4, validity: 33, lx: 12, ly: 24,
    note: "Liberty decisions on a scored instrument whose fairness criteria are provably incompatible. The modern occupant of the eugenic-era quadrant." },
  { id: "turing-p", domain: "machine", label: "Turing test / Loebner", stakes: 1, validity: 15, lx: 12, ly: 24,
    note: "Very low validity, and it never mattered: the score decided nothing, so the low validity cost nobody anything. Low validity is only dangerous with stakes attached." },
  { id: "imagenet-p", domain: "machine", label: "ImageNet top-1", stakes: 2, validity: 40, lx: 12, ly: 42,
    note: "Genuinely valid for its narrow construct — object recognition on this label set — and routinely read as a measure of vision, or of progress toward something more general." },
  { id: "mmlu", domain: "machine", label: "Knowledge benchmarks (MMLU-style)", stakes: 2, validity: 35, lx: -14, ly: 24, anchor: "end",
    note: "Contamination-vulnerable, aggregated across heterogeneous subjects, and used to support broad claims about model capability in public communication." },
  { id: "arc-p", domain: "machine", label: "ARC", stakes: 1, validity: 55, lx: 12, ly: -16,
    note: "The most carefully constructed construct on the plot, deliberately kept at low stakes while it is worked out. This is the quadrant you want a new instrument to start in." },
  { id: "gendershades-p", domain: "machine", label: "Gender Shades / PPB audit", stakes: 2, validity: 65, lx: 12, ly: -18,
    note: "An instrument built specifically to be valid about a population that existing benchmarks were not. Measurement used as the corrective." },
  { id: "frontier", domain: "machine", label: "Frontier capability evals", stakes: 4, validity: 27, lx: 12, ly: 44,
    note: "The newest point and the argument of the map: the constructs are years old, the elicitation is a lower bound, the thresholds are largely set by the parties being measured — and the results now gate deployment. It plots in the same quadrant as the Army tests and the sterilisation assessments." }
];

const SCATTER_VERDICT = {
  headline: "The danger is never low validity. It is low validity with stakes attached.",
  body:
    "The Turing test has almost no construct validity and cost nobody anything, because nothing was ever allocated on it. The eugenic sterilisation assessments were barely worse as instruments and they ended tens of thousands of reproductive lives, because they sat at stage six. That contrast is the whole argument: the ethical question is not 'is this measure good?' but 'is this measure good enough for what we are about to do with it?' — and those are answered by different people, at different times, usually in that order. The top-left quadrant is not populated by careless work. It is populated by instruments whose stakes rose faster than their validity did, which is the normal direction of travel. Frontier capability evaluations are the newest entry, and they got there in about two years."
};

/* ---- honest note about the axes, surfaced in the UI rather than buried ---- */
const SCATTER_CAVEAT =
  "Both coordinates are my judgements against the rubric below, not measurements. The vertical axis is reasonably objective — it asks what the score decides. The horizontal axis is an assessment, and reasonable people would move several of these points. The argument survives quite large disagreements about any individual placement, because it is about the shape of the occupied region rather than about where any one instrument sits.";
