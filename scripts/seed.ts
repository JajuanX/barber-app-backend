/* Seed a minimal set of quiz questions for development */
import "dotenv/config";
import mongoose from "mongoose";
import Question from "../models/Question";
import User from "../models/User";
import bcrypt from "bcrypt";

async function run() {
	const uri =
		process.env.MONGO_URI || "mongodb://localhost:27017/barber-study-app";
	await mongoose.connect(uri);

	const force = process.argv.includes("--force") || process.argv.includes("-f");

	// Ensure admin and student users exist
	const adminEmail = "admin@example.com";
	const studentEmail = "student@example.com";
	const admin =
		(await User.findOne({ email: adminEmail })) ||
		(await User.create({
			email: adminEmail,
			name: "Admin",
			role: "admin",
			passwordHash: await bcrypt.hash("Admin123!", 10),
		}));
	const student =
		(await User.findOne({ email: studentEmail })) ||
		(await User.create({
			email: studentEmail,
			name: "Student",
			role: "student",
			passwordHash: await bcrypt.hash("Student123!", 10),
		}));

	const adminId = admin._id as mongoose.Types.ObjectId;

	const questions = [
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "The portion of the hair that is enclosed within the follicle beneath the skin surface is the _____.",
			options: [
				{ key: "A", text: "dermal papilla" },
				{ key: "B", text: "hair bulb" },
				{ key: "C", text: "hair shaft" },
				{ key: "D", text: "hair root" },
			],
			correctKey: "D",
			explanation:
				"The hair root is that portion of the hair enclosed within the follicle beneath the skin surface.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "The ____ glands secrete sebum.",
			options: [
				{ key: "A", text: "moisture" },
				{ key: "B", text: "sweat" },
				{ key: "C", text: "pili" },
				{ key: "D", text: "sebaceous" },
			],
			correctKey: "D",
			explanation: "The sebaceous glands secrete sebum.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "The hair feels _____ when you move your thumb and fingers from its end to the scalp.",
			options: [
				{ key: "A", text: "smooth" },
				{ key: "B", text: "tacky" },
				{ key: "C", text: "rough" },
				{ key: "D", text: "dry" },
			],
			correctKey: "C",
			explanation:
				"The hair feels rough when moving from end to scalp because you are going against the cuticle layer.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "The cortex is the ____ layer of the hair.",
			options: [
				{ key: "A", text: "outermost" },
				{ key: "B", text: "middle" },
				{ key: "C", text: "innermost" },
				{ key: "D", text: "smallest" },
			],
			correctKey: "B",
			explanation: "The cortex is the middle layer of the hair.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "Hair that is missing the medulla is ____.",
			options: [
				{ key: "A", text: "not dyable" },
				{ key: "B", text: "curly" },
				{ key: "C", text: "coarse" },
				{ key: "D", text: "naturally blond" },
			],
			correctKey: "D",
			explanation:
				"The medulla may be absent in very fine and naturally blond hair.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "The essential elements in human ____ are sulfur, carbon, oxygen, hydrogen, and nitrogen.",
			options: [
				{ key: "A", text: "hair" },
				{ key: "B", text: "teeth" },
				{ key: "C", text: "lungs" },
				{ key: "D", text: "kidneys" },
			],
			correctKey: "A",
			explanation:
				"The essential elements in human hair are carbon, oxygen, hydrogen, nitrogen, and sulfur.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "Disulfide bonds join the sulfur atoms of two neighboring ____ amino acids to create one cystine.",
			options: [
				{ key: "A", text: "lysteine" },
				{ key: "B", text: "cysteine" },
				{ key: "C", text: "sulfide" },
				{ key: "D", text: "bisulfide" },
			],
			correctKey: "B",
			explanation:
				"Disulfide bonds join the sulfur atoms of two neighboring cysteine amino acids to create one cystine.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "Thioglycolate permanent waves and ____ chemical hair relaxers break disulfide bonds.",
			options: [
				{ key: "A", text: "hydrogen peroxide" },
				{ key: "B", text: "nitrogen oxide" },
				{ key: "C", text: "carbon" },
				{ key: "D", text: "hydroxide" },
			],
			correctKey: "D",
			explanation:
				"Thioglycolate permanent waves and hydroxide chemical hair relaxers break disulfide bonds.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "Black and brown hair colors are provided by ____.",
			options: [
				{ key: "A", text: "medulla" },
				{ key: "B", text: "cuticle" },
				{ key: "C", text: "eumelanin" },
				{ key: "D", text: "pheomelanin" },
			],
			correctKey: "C",
			explanation: "Eumelanin provides brown and black color to hair.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "What term can be described as straight, wavy, curly, or extremely curly?",
			options: [
				{ key: "A", text: "Hair pigment" },
				{ key: "B", text: "Hair stream" },
				{ key: "C", text: "Wave growth" },
				{ key: "D", text: "Wave pattern" },
			],
			correctKey: "D",
			explanation:
				"The wave pattern of hair refers to the shape of the hair strand and is described as straight, wavy, curly, or extremely curly.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "Terminal hair is found on ____.",
			options: [
				{ key: "A", text: "the forehead" },
				{ key: "B", text: "the arms" },
				{ key: "C", text: "the eyelids" },
				{ key: "D", text: "a bald scalp" },
			],
			correctKey: "B",
			explanation:
				"Terminal hair is the long, coarse hair found on the scalp, legs, arms, and bodies of males and females.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "The average growth rate of healthy hair on the scalp is about _____.",
			options: [
				{ key: "A", text: "½ inch per month" },
				{ key: "B", text: "inch per week" },
				{ key: "C", text: "inch per year" },
				{ key: "D", text: "foot every 2 years" },
			],
			correctKey: "A",
			explanation:
				"The average growth rate of healthy hair on the scalp is about ½ inch per month.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "Hair growth is not increased by any of the following except ____.",
			options: [
				{ key: "A", text: "shaving" },
				{ key: "B", text: "trimming" },
				{ key: "C", text: "applying ointments" },
				{ key: "D", text: "the time of the year" },
			],
			correctKey: "D",
			explanation:
				"Hair growth is influenced by age, seasons, nutrition, and hormones—not shaving or trimming.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "During the ____ phase, the hair bulb disappears.",
			options: [
				{ key: "A", text: "resting" },
				{ key: "B", text: "anagen" },
				{ key: "C", text: "catagen" },
				{ key: "D", text: "telogen" },
			],
			correctKey: "C",
			explanation:
				"During catagen, the follicle shrinks, the bulb disappears, and the root forms a rounded club.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "During the ____ phase, the hair is either shed or remains in place until it is pushed out by new hair.",
			options: [
				{ key: "A", text: "telogen" },
				{ key: "B", text: "catagen" },
				{ key: "C", text: "anagen" },
				{ key: "D", text: "transition" },
			],
			correctKey: "A",
			explanation:
				"During the telogen phase, hair is shed or remains until replaced by new hair in the next anagen phase.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "The result of follicles being arranged and sloping in a uniform manner is called ____.",
			options: [
				{ key: "A", text: "a hair stream" },
				{ key: "B", text: "hair texture" },
				{ key: "C", text: "a whorl" },
				{ key: "D", text: "a cowlick" },
			],
			correctKey: "A",
			explanation: "Follicles arranged in a uniform slope form a hair stream.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "Alopecia is the technical term for ____.",
			options: [
				{ key: "A", text: "any abnormal hair loss" },
				{ key: "B", text: "complete baldness" },
				{ key: "C", text: "white hair" },
				{ key: "D", text: "gray hair" },
			],
			correctKey: "A",
			explanation: "Abnormal hair loss is called alopecia.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "Androgenic alopecia in men is also called ____.",
			options: [
				{ key: "A", text: "tonsure baldness" },
				{ key: "B", text: "horseshoe baldness" },
				{ key: "C", text: "premature hair loss" },
				{ key: "D", text: "male pattern baldness" },
			],
			correctKey: "D",
			explanation:
				"In men, androgenic alopecia is also known as male pattern baldness.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "Alopecia ____ is characterized by the sudden falling out of hair in round patches.",
			options: [
				{ key: "A", text: "temporalis" },
				{ key: "B", text: "areata" },
				{ key: "C", text: "prematura" },
				{ key: "D", text: "senilis" },
			],
			correctKey: "B",
			explanation:
				"Alopecia areata is characterized by sudden hair loss in round patches.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "____ is abnormal hair growth and can be treated in the barbershop.",
			options: [
				{ key: "A", text: "Tinea" },
				{ key: "B", text: "Sycosis vulgaris" },
				{ key: "C", text: "Hypertrichosis" },
				{ key: "D", text: "Scabies" },
			],
			correctKey: "C",
			explanation:
				"Hypertrichosis is abnormal hair growth on normally hairless areas, treatable in the barbershop.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "Scalp irritation, ____, and an itchy scalp are characteristic of pityriasis capitis simplex.",
			options: [
				{ key: "A", text: "hair falling out in patches" },
				{ key: "B", text: "large flakes" },
				{ key: "C", text: "small lakes" },
				{ key: "D", text: "a red rash" },
			],
			correctKey: "B",
			explanation:
				"Pityriasis capitis simplex (classic dandruff) is characterized by large flakes and an itchy scalp.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "____ on the scalp are symptoms of tinea favosa.",
			options: [
				{ key: "A", text: "Large, white, hairless patches" },
				{ key: "B", text: "Dry scales" },
				{ key: "C", text: "Red itchy patches" },
				{ key: "D", text: "Dry, sulfur-yellow, cup-like crusts" },
			],
			correctKey: "D",
			explanation:
				"Tinea favosa is characterized by dry, sulfur-yellow, cup-like crusts on the scalp.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "Sycosis vulgaris, ____, and pseudofolliculitis barbae are staphylococcal infections involving the follicles.",
			options: [
				{ key: "A", text: "pediculosis capitis" },
				{ key: "B", text: "lanugo" },
				{ key: "C", text: "folliculitis barbae" },
				{ key: "D", text: "medulla" },
			],
			correctKey: "C",
			explanation:
				"Sycosis vulgaris and folliculitis barbae are staphylococcal infections involving hair follicles.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "Hair with a ____ texture has the largest diameter.",
			options: [
				{ key: "A", text: "blonde" },
				{ key: "B", text: "regular" },
				{ key: "C", text: "coarse" },
				{ key: "D", text: "fine" },
			],
			correctKey: "C",
			explanation:
				"Hair with a coarse texture has the largest diameter and tends to be stronger.",
			createdBy: adminId,
		},
		{
			category: "Properties and Disorders of the Hair and Scalp",
			text: "____ may stretch up to 50 percent of its original length and return to that length without breaking.",
			options: [
				{ key: "A", text: "Hair with normal elasticity" },
				{ key: "B", text: "Curly or wavy hair" },
				{ key: "C", text: "Hair with low elasticity" },
				{ key: "D", text: "Straight hair" },
			],
			correctKey: "B",
			explanation:
				"Curly or wavy hair may stretch up to 50% of its length and return without breaking.",
			createdBy: adminId,
		},
		{
			category: "History of Barbering",
			text: "Intricate braiding patterns among the Masai warriors denote ____.",
			options: [
				{ key: "A", text: "status" },
				{ key: "B", text: "age" },
				{ key: "C", text: "religion" },
				{ key: "D", text: "personal preferences" },
			],
			correctKey: "A",
			explanation:
				"The Masai warriors used intricate braiding patterns to denote status within the tribe.",
			createdBy: adminId,
		},
		{
			category: "History of Barbering",
			text: "Ticinius Mena of ____ is credited with having brought shaving and barbering services to Rome in earnest.",
			options: [
				{ key: "A", text: "Milan" },
				{ key: "B", text: "Athens" },
				{ key: "C", text: "Sicily" },
				{ key: "D", text: "Cairo" },
			],
			correctKey: "C",
			explanation:
				"Ticinius Mena of Sicily is credited with bringing shaving and barbering services to Rome.",
			createdBy: adminId,
		},
		{
			category: "History of Barbering",
			text: "For centuries, only ____ performed dentistry.",
			options: [
				{ key: "A", text: "midwives" },
				{ key: "B", text: "doctors" },
				{ key: "C", text: "barbers" },
				{ key: "D", text: "dentists" },
			],
			correctKey: "C",
			explanation:
				"For centuries, dentistry was performed only by barbers, known as barber-surgeons.",
			createdBy: adminId,
		},
		{
			category: "History of Barbering",
			text: "Ambroise Paré was a barber-surgeon who was considered the greatest surgeon of the ____.",
			options: [
				{ key: "A", text: "Roman age" },
				{ key: "B", text: "Renaissance period" },
				{ key: "C", text: "Middle Ages" },
				{ key: "D", text: "modern age" },
			],
			correctKey: "B",
			explanation:
				"Ambroise Paré was a French barber-surgeon, considered the greatest surgeon of the Renaissance period and father of modern surgery.",
			createdBy: adminId,
		},
		{
			category: "History of Barbering",
			text: "The colors of the barber pole are derived from ____.",
			options: [
				{ key: "A", text: "the American flag" },
				{ key: "B", text: "the practice of bloodletting" },
				{ key: "C", text: "the colors of human hair" },
				{ key: "D", text: "the status of barbers" },
			],
			correctKey: "B",
			explanation:
				"The barber pole symbol comes from bloodletting procedures performed by barber-surgeons.",
			createdBy: adminId,
		},
		{
			category: "History of Barbering",
			text: "By the end of the nineteenth century, barbering ____.",
			options: [
				{ key: "A", text: "was looked down upon" },
				{ key: "B", text: "was still linked to dentistry" },
				{ key: "C", text: "began to emerge as an independent profession" },
				{ key: "D", text: "was legally regulated by the states" },
			],
			correctKey: "C",
			explanation:
				"By the end of the 19th century, barbering separated from religion/medicine and became an independent profession.",
			createdBy: adminId,
		},
		{
			category: "History of Barbering",
			text: "In the late ____, members of employee organizations were called journeymen barbers.",
			options: [
				{ key: "A", text: "1600s" },
				{ key: "B", text: "1700s" },
				{ key: "C", text: "1800s" },
				{ key: "D", text: "1900s" },
			],
			correctKey: "C",
			explanation:
				"In the late 1800s, employee barbers were called journeymen barbers.",
			createdBy: adminId,
		},
		{
			category: "History of Barbering",
			text: "The National Educational Council was established in ____ to upgrade and standardize barber training.",
			options: [
				{ key: "A", text: "1915" },
				{ key: "B", text: "1925" },
				{ key: "C", text: "1935" },
				{ key: "D", text: "1945" },
			],
			correctKey: "B",
			explanation:
				"The National Educational Council was established in 1925 to upgrade and standardize barber training.",
			createdBy: adminId,
		},
		{
			category: "Life Skills",
			text: "Which action step for success is to constantly imagine yourself working in your dream job?",
			options: [
				{ key: "A", text: "Visualize success" },
				{ key: "B", text: "Build self-esteem" },
				{ key: "C", text: "Stay true to yourself" },
				{ key: "D", text: "Keep your energy up" },
			],
			correctKey: "A",
			explanation:
				"Visualizing success is a proven step for achieving personal and professional goals.",
			createdBy: adminId,
		},
		{
			category: "Life Skills",
			text: "What is not one of the three bad habits that can keep you from maintaining peak performance?",
			options: [
				{ key: "A", text: "Procrastination" },
				{ key: "B", text: "Low energy" },
				{ key: "C", text: "Perfectionism" },
				{ key: "D", text: "Lack of a game plan" },
			],
			correctKey: "B",
			explanation:
				"The three bad habits are procrastination, perfectionism, and lack of a game plan.",
			createdBy: adminId,
		},
		{
			category: "Life Skills",
			text: "Which part of a business establishes the purpose and values for and by which an individual or institution lives and works?",
			options: [
				{ key: "A", text: "Vision statement" },
				{ key: "B", text: "Mission statement" },
				{ key: "C", text: "Business plan" },
				{ key: "D", text: "Organizational plan" },
			],
			correctKey: "B",
			explanation:
				"A mission statement establishes the purpose and values for an individual or institution.",
			createdBy: adminId,
		},
		{
			category: "Life Skills",
			text: "The identification of long-term and short-term goals is called ____.",
			options: [
				{ key: "A", text: "self-actualization" },
				{ key: "B", text: "organization" },
				{ key: "C", text: "prioritization" },
				{ key: "D", text: "goal setting" },
			],
			correctKey: "D",
			explanation:
				"The process of identifying short-term and long-term goals is known as goal setting.",
			createdBy: adminId,
		},
		{
			category: "Life Skills",
			text: "What is an example of a long-term goal?",
			options: [
				{ key: "A", text: "Writing a personal mission statement" },
				{ key: "B", text: "Completing an exam with a 90 or higher" },
				{ key: "C", text: "Learning how to hold shears and a comb" },
				{ key: "D", text: "Opening your own barbershop" },
			],
			correctKey: "D",
			explanation:
				"Opening a barbershop is a long-term goal, usually requiring years of planning.",
			createdBy: adminId,
		},
		{
			category: "Life Skills",
			text: "What is a device that helps you remember or recall information?",
			options: [
				{ key: "A", text: "Learning tool" },
				{ key: "B", text: "Mind map" },
				{ key: "C", text: "Infographic" },
				{ key: "D", text: "Mnemonic" },
			],
			correctKey: "D",
			explanation:
				"A mnemonic is a memory device such as acronyms, songs, or word associations.",
			createdBy: adminId,
		},
		{
			category: "Life Skills",
			text: "What is the definition of ethics?",
			options: [
				{
					key: "A",
					text: "The guiding principles an individual uses to decide what is right and wrong",
				},
				{ key: "B", text: "The moral principles by which we live and work" },
				{ key: "C", text: "A description for how one leads their life" },
				{
					key: "D",
					text: "The things that you believe are most important in your life",
				},
			],
			correctKey: "B",
			explanation:
				"Ethics are the moral principles by which we live and work, guiding professional behavior.",
			createdBy: adminId,
		},
		{
			category: "Life Skills",
			text: "What is one way to maintain your integrity when working?",
			options: [
				{ key: "A", text: "Do not share your personal issues with clients" },
				{
					key: "B",
					text: "Avoid sharing clients’ private matters with others",
				},
				{ key: "C", text: "Be sincere and courteous to clients" },
				{
					key: "D",
					text: "Do not recommend products that clients do not really need",
				},
			],
			correctKey: "D",
			explanation:
				"Integrity means aligning actions with values, such as not recommending unnecessary products.",
			createdBy: adminId,
		},
		{
			category: "Life Skills",
			text: "What is not one of the characteristics of a healthy, positive attitude?",
			options: [
				{ key: "A", text: "Pleasing tone of voice" },
				{ key: "B", text: "Values and goals" },
				{ key: "C", text: "Being strong willed" },
				{ key: "D", text: "Receptivity" },
			],
			correctKey: "C",
			explanation:
				"Being strong willed is not necessarily a trait of a positive attitude.",
			createdBy: adminId,
		},
		{
			category: "Life Skills",
			text: "What is the ability to deliver truthful, even sometimes critical or difficult, messages in a kind way?",
			options: [
				{ key: "A", text: "Emotional stability" },
				{ key: "B", text: "Receptivity" },
				{ key: "C", text: "Diplomacy" },
				{ key: "D", text: "Sensitivity" },
			],
			correctKey: "C",
			explanation:
				"Diplomacy (tact) is delivering truthful or critical messages kindly.",
			createdBy: adminId,
		},
		{
			category: "Professional Image",
			text: "Your appearance, professional behavior, positive attitude, team camaraderie, proper ergonomics, and good communication skills all contribute to your ____.",
			options: [
				{ key: "A", text: "odds of success" },
				{ key: "B", text: "skill as a barber" },
				{ key: "C", text: "personal image" },
				{ key: "D", text: "professional image" },
			],
			correctKey: "D",
			explanation:
				"Professional image is shaped by appearance, communication, and behavior.",
			createdBy: adminId,
		},
		{
			category: "Professional Image",
			text: "Regular physical activity benefits the body by improving ____.",
			options: [
				{ key: "A", text: "blood circulation and oxygen supply" },
				{ key: "B", text: "organ function and blood circulation" },
				{
					key: "C",
					text: "blood circulation, oxygen supply, and organ function",
				},
				{ key: "D", text: "organ function and oxygen supply" },
			],
			correctKey: "C",
			explanation:
				"Exercise improves blood circulation, oxygen supply, and organ function.",
			createdBy: adminId,
		},
		{
			category: "Professional Image",
			text: "What term describes the inability to cope with a real or imagined threat that results in a series of mental and physical responses or adaptations?",
			options: [
				{ key: "A", text: "Depression" },
				{ key: "B", text: "Stress" },
				{ key: "C", text: "Ergonomics" },
				{ key: "D", text: "Hygiene" },
			],
			correctKey: "B",
			explanation:
				"Stress is the inability to cope with a real or imagined threat, causing mental and physical responses.",
			createdBy: adminId,
		},
		{
			category: "Professional Image",
			text: "While working, your clothes must be pressed and clean, which includes being ____.",
			options: [
				{ key: "A", text: "lint free" },
				{ key: "B", text: "stain free" },
				{ key: "C", text: "free of any smells" },
				{ key: "D", text: "free of dirt" },
			],
			correctKey: "B",
			explanation:
				"Barbers must wear stain-free, pressed, and clean clothes for professionalism.",
			createdBy: adminId,
		},
		{
			category: "Professional Image",
			text: "____ for male barbers is of utmost importance.",
			options: [
				{ key: "A", text: "Skin care" },
				{ key: "B", text: "Eye care" },
				{ key: "C", text: "Dental care" },
				{ key: "D", text: "Facial grooming" },
			],
			correctKey: "D",
			explanation:
				"Facial grooming, like trimming mustaches/beards or shaving daily, is very important for male barbers.",
			createdBy: adminId,
		},
		{
			category: "Professional Image",
			text: "____ involves your posture and the way you walk and move.",
			options: [
				{ key: "A", text: "Your physical presentation" },
				{ key: "B", text: "Proper ergonomics" },
				{ key: "C", text: "Your professional image" },
				{ key: "D", text: "Your personal hygiene" },
			],
			correctKey: "A",
			explanation:
				"Physical presentation includes posture and how you carry yourself.",
			createdBy: adminId,
		},
		{
			category: "Professional Image",
			text: "Standing correctly is not an example of ____.",
			options: [
				{ key: "A", text: "proper ergonomics" },
				{ key: "B", text: "a beneficial habit for a barber" },
				{ key: "C", text: "good posture" },
				{ key: "D", text: "personal hygiene" },
			],
			correctKey: "D",
			explanation: "Standing correctly is related to ergonomics, not hygiene.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "A wide-toothed comb is used ____.",
			options: [
				{ key: "A", text: "for sectioning long hair" },
				{ key: "B", text: "for combing through textured hair" },
				{ key: "C", text: "for combing through curly hair textures" },
				{ key: "D", text: "to achieve a flat-top style" },
			],
			correctKey: "C",
			explanation:
				"Wide-toothed combs are used to control larger amounts of hair or comb through curly textures.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "The abrasive material of hones is harder than ____.",
			options: [
				{ key: "A", text: "leather" },
				{ key: "B", text: "diamond" },
				{ key: "C", text: "steel" },
				{ key: "D", text: "stone" },
			],
			correctKey: "C",
			explanation:
				"Hones are harder than steel and are used to sharpen razors.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "Styling tools create heat that is used to wave, curl, or press hair into another shape or form.",
			options: [
				{ key: "A", text: "French" },
				{ key: "B", text: "German" },
				{ key: "C", text: "Thermal" },
				{ key: "D", text: "Hot" },
			],
			correctKey: "C",
			explanation:
				"Thermal styling tools use heat to curl, wave, or press hair.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "A tail comb is used ____.",
			options: [
				{ key: "A", text: "for sectioning long hair" },
				{ key: "B", text: "for very short hair" },
				{ key: "C", text: "for general purposes" },
				{ key: "D", text: "during blowdrying" },
			],
			correctKey: "A",
			explanation: "Tail combs are best for sectioning and parting long hair.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "What is not one of the structural parts of a straight razor?",
			options: [
				{ key: "A", text: "Foot" },
				{ key: "B", text: "Head" },
				{ key: "C", text: "Shoulder" },
				{ key: "D", text: "Back" },
			],
			correctKey: "A",
			explanation:
				"The foot is not part of a straight razor. Parts include head, back, shoulder, tang, etc.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "A ____ strop means that the Russian method of tanning was used to prepare the leather.",
			options: [
				{ key: "A", text: "Russian" },
				{ key: "B", text: "leather" },
				{ key: "C", text: "broken" },
				{ key: "D", text: "horsehair" },
			],
			correctKey: "A",
			explanation:
				"A Russian strop indicates leather treated using the Russian tanning method.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "What is the difference between a barber chair and a styling chair?",
			options: [
				{ key: "A", text: "Styling chairs are larger than barber chairs" },
				{ key: "B", text: "A styling chair does not usually have a head rest" },
				{
					key: "C",
					text: "There are no differences, the terms are interchangeable",
				},
				{ key: "D", text: "A barber chair cannot fully recline" },
			],
			correctKey: "B",
			explanation:
				"Styling chairs are smaller and typically lack a headrest compared to barber chairs.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "Which task are you performing with a straight razor when the ball of the thumb and first two fingers are positioned on the flat side of the shanks with the handle in a straight position?",
			options: [
				{ key: "A", text: "Trimming" },
				{ key: "B", text: "Honing and stropping" },
				{ key: "C", text: "Shaving" },
				{ key: "D", text: "Haircutting" },
			],
			correctKey: "B",
			explanation: "This grip is used when honing and stropping a razor.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "The ____ step in towel wrapping is to fold down the top third of the towel toward you.",
			options: [
				{ key: "A", text: "eighth" },
				{ key: "B", text: "fourth" },
				{ key: "C", text: "sixth" },
				{ key: "D", text: "second" },
			],
			correctKey: "C",
			explanation: "The sixth step is folding down the top third of the towel.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "The ____ step in towel wrapping is to grasp the towel lengthwise.",
			options: [
				{ key: "A", text: "last" },
				{ key: "B", text: "third" },
				{ key: "C", text: "first" },
				{ key: "D", text: "second" },
			],
			correctKey: "C",
			explanation:
				"The first step in towel wrapping is grasping the towel lengthwise.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "Which position for holding the clipper is usually comfortable for tapering in the nape or side areas of a haircut?",
			options: [
				{ key: "A", text: "Thumb on right side, fingers left" },
				{ key: "B", text: "Thumb on left side, fingers right" },
				{ key: "C", text: "Thumb on bottom, fingers support topside" },
				{ key: "D", text: "Thumb on top, fingers support underside" },
			],
			correctKey: "D",
			explanation:
				"For tapering in nape or side areas, the thumb rests on top of the clipper with fingers supporting underneath.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "The ____ of a razor is measured either in eighths or sixteenths of an inch.",
			options: [
				{ key: "A", text: "blade size" },
				{ key: "B", text: "length" },
				{ key: "C", text: "width" },
				{ key: "D", text: "grind" },
			],
			correctKey: "C",
			explanation:
				"The width of a razor blade is measured in eighths or sixteenths of an inch.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "A ____ brush has a rigid base with vents to facilitate quicker drying.",
			options: [
				{ key: "A", text: "wet" },
				{ key: "B", text: "vented" },
				{ key: "C", text: "round" },
				{ key: "D", text: "paddle" },
			],
			correctKey: "B",
			explanation:
				"A vented brush speeds up drying by allowing air circulation.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "As a barber, what is not one of the principal tools of the trade?",
			options: [
				{ key: "A", text: "Combs" },
				{ key: "B", text: "Gloves" },
				{ key: "C", text: "Shears" },
				{ key: "D", text: "Clippers" },
			],
			correctKey: "B",
			explanation: "Gloves are not considered a principal tool of the trade.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "Which task are you performing with a straight razor when the ball of the thumb and first two fingers are positioned with handle pivoted up to allow the little finger to rest on the tang?",
			options: [
				{ key: "A", text: "Haircutting" },
				{ key: "B", text: "Honing and stropping" },
				{ key: "C", text: "Trimming" },
				{ key: "D", text: "Shaving" },
			],
			correctKey: "D",
			explanation: "This grip with the handle pivoted up is used when shaving.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "What is located between the ride and the base of the finger grip?",
			options: [
				{ key: "A", text: "Shank" },
				{ key: "B", text: "Thumb grip" },
				{ key: "C", text: "Tang" },
				{ key: "D", text: "Tension screw" },
			],
			correctKey: "A",
			explanation: "The shank lies between the ride and the finger grip base.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "A ____ strop is a high-quality strop taken from the muscular rump area of a horse.",
			options: [
				{ key: "A", text: "shell" },
				{ key: "B", text: "rump" },
				{ key: "C", text: "water" },
				{ key: "D", text: "canvas" },
			],
			correctKey: "A",
			explanation:
				"A shell strop comes from the rump area of a horse and is considered high quality.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "Lather mugs and brushes ____.",
			options: [
				{ key: "A", text: "are always used in a barber shop" },
				{ key: "B", text: "have taken the place of electric latherizers" },
				{ key: "C", text: "may not be permitted by the state barbering board" },
				{ key: "D", text: "are more sanitary than electric latherizers" },
			],
			correctKey: "C",
			explanation:
				"Some barber boards prohibit the use of lather mugs and brushes for sanitation reasons.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "A high-frequency machine produces a high rate of oscillation within ____ electrodes for facial and scalp treatments.",
			options: [
				{ key: "A", text: "glass" },
				{ key: "B", text: "metal" },
				{ key: "C", text: "rubber" },
				{ key: "D", text: "canvas" },
			],
			correctKey: "A",
			explanation:
				"Glass electrodes in high-frequency machines produce oscillations for facial/scalp treatments.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "When honing a razor, use a ____ stroking motion.",
			options: [
				{ key: "A", text: "vertical" },
				{ key: "B", text: "circular" },
				{ key: "C", text: "horizontal" },
				{ key: "D", text: "diagonal" },
			],
			correctKey: "D",
			explanation: "The razor is honed using an edge-first diagonal stroke.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "What is not one of the three standard handle designs?",
			options: [
				{ key: "A", text: "Centered grip" },
				{ key: "B", text: "Offset grip" },
				{ key: "C", text: "Crane grip" },
				{ key: "D", text: "Opposing grip" },
			],
			correctKey: "A",
			explanation:
				"The three standard handle designs are opposing, offset, and crane grips.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "Adjusting outliner blades ____ may cut the skin or cause skin irritations and ingrown hairs.",
			options: [
				{ key: "A", text: "less than ¼” apart" },
				{ key: "B", text: "at all" },
				{ key: "C", text: "flush to each other" },
				{ key: "D", text: "less than 1” apart" },
			],
			correctKey: "C",
			explanation:
				"Never adjust outliner blades flush to each other, as this can cut skin.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "Natural hones are cut from ____.",
			options: [
				{ key: "A", text: "steel" },
				{ key: "B", text: "rubber" },
				{ key: "C", text: "leather" },
				{ key: "D", text: "natural rock formations" },
			],
			correctKey: "D",
			explanation: "Natural hones are quarried from rock formations.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "Hard rubber combs are ____.",
			options: [
				{ key: "A", text: "not as popular as metal combs" },
				{ key: "B", text: "impossible to clean" },
				{ key: "C", text: "durable and slightly flexible" },
				{ key: "D", text: "very breakable" },
			],
			correctKey: "C",
			explanation:
				"Hard rubber combs are durable and slightly flexible, but can deteriorate if left in disinfectant.",
			createdBy: adminId,
		},
		{
			category: "Equipment and Supplies",
			text: "A razor with the acquired degree of hardness required for a good cutting edge is called ____.",
			options: [
				{ key: "A", text: "well designed" },
				{ key: "B", text: "properly tempered" },
				{ key: "C", text: "balanced" },
				{ key: "D", text: "a straight razor" },
			],
			correctKey: "B",
			explanation:
				"Properly tempered razors have the hardness needed for effective cutting.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "The spread of bloodborne pathogens can occur in the barbershop whenever ____.",
			options: [
				{ key: "A", text: "a client sneezes" },
				{ key: "B", text: "the skin is broken" },
				{ key: "C", text: "you shake hands with clients" },
				{ key: "D", text: "a client coughs" },
			],
			correctKey: "B",
			explanation:
				"Bloodborne pathogens spread whenever the skin is broken, making careful sanitation essential.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "Hepatitis can damage the ____.",
			options: [
				{ key: "A", text: "brain" },
				{ key: "B", text: "heart" },
				{ key: "C", text: "skin" },
				{ key: "D", text: "liver" },
			],
			correctKey: "D",
			explanation: "Hepatitis is a virus that damages the liver.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "An example of a bloodborne pathogen is ____.",
			options: [
				{ key: "A", text: "hepatitis" },
				{ key: "B", text: "MRSA" },
				{ key: "C", text: "the flu" },
				{ key: "D", text: "scabies" },
			],
			correctKey: "A",
			explanation: "Hepatitis is a common example of a bloodborne pathogen.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "A parasite commonly encountered in the barbering environment is ____.",
			options: [
				{ key: "A", text: "scabies" },
				{ key: "B", text: "asepsis" },
				{ key: "C", text: "asepsis" },
				{ key: "D", text: "yeast infection" },
			],
			correctKey: "A",
			explanation:
				"Scabies and head lice are common parasites encountered in barbering environments.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "Immunity is ____.",
			options: [
				{ key: "A", text: "something people never obtain" },
				{ key: "B", text: "a serious bloodborne pathogen" },
				{ key: "C", text: "the body’s ability to resist pathogens" },
				{ key: "D", text: "given by viruses" },
			],
			correctKey: "C",
			explanation:
				"Immunity is the body’s ability to resist pathogens and recognize infection.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "Inoculations can help give ____ immunity.",
			options: [
				{ key: "A", text: "natural" },
				{ key: "B", text: "acquired" },
				{ key: "C", text: "inherited" },
				{ key: "D", text: "communicable" },
			],
			correctKey: "B",
			explanation:
				"Inoculations, such as flu vaccines, help provide acquired immunity.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "Proper hand cleaning requires rubbing the hands together and using liquid soap, ____, a nailbrush, and a clean towel.",
			options: [
				{ key: "A", text: "hot running water" },
				{ key: "B", text: "antibacterial gel" },
				{ key: "C", text: "warm running water" },
				{ key: "D", text: "nail file" },
			],
			correctKey: "C",
			explanation:
				"Warm running water, along with soap and nailbrushes, ensures effective cleaning.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "All disinfectants should carry a(n) ____.",
			options: [
				{ key: "A", text: "EPA registration number" },
				{ key: "B", text: "OSHA certification" },
				{ key: "C", text: "barbershop identification number" },
				{ key: "D", text: "regional certification" },
			],
			correctKey: "A",
			explanation:
				"All disinfectants should carry an EPA registration number to ensure effectiveness and safety.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "What type of disinfectant contains sophisticated blends of compounds that work together to significantly increase their effectiveness?",
			options: [
				{ key: "A", text: "Phenolic disinfectants" },
				{ key: "B", text: "Bleach" },
				{ key: "C", text: "Quats" },
				{ key: "D", text: "Petroleum distillates" },
			],
			correctKey: "C",
			explanation:
				"Quaternary ammonium compounds, or Quats, are effective disinfectants commonly used in shops.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "Which type of disinfectant is excellent at removing grime and oils from metals?",
			options: [
				{ key: "A", text: "Phenolic disinfectants" },
				{ key: "B", text: "Bleach" },
				{ key: "C", text: "Quats" },
				{ key: "D", text: "Petroleum distillates" },
			],
			correctKey: "D",
			explanation:
				"Petroleum distillates are excellent for removing grime and oils from metals.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "Before you can clean and disinfect clippers and outliners you must ____.",
			options: [
				{
					key: "A",
					text: "remove hair particles from clipper blades with a stiff brush",
				},
				{ key: "B", text: "rinse with water" },
				{ key: "C", text: "use a blow dryer to remove hair particles" },
				{ key: "D", text: "submerge blades in a blade wash" },
			],
			correctKey: "A",
			explanation:
				"Hair particles must first be removed with a stiff brush before disinfecting tools.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "When following the proper hand washing procedure, what is the minimum amount of time you must rub your hands together?",
			options: [
				{ key: "A", text: "10 seconds" },
				{ key: "B", text: "20 seconds" },
				{ key: "C", text: "30 seconds" },
				{ key: "D", text: "40 seconds" },
			],
			correctKey: "B",
			explanation:
				"You must rub your hands together for at least 20 seconds for effective cleaning.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "When handling an exposure incident, all single-use, contaminated objects should be ____.",
			options: [
				{ key: "A", text: "placed in a trash bag" },
				{ key: "B", text: "disinfected to be used on another client" },
				{
					key: "C",
					text: "discarded in a plastic bag and then placed in a trash bag",
				},
				{
					key: "D",
					text: "placed under running water to remove all visible blood",
				},
			],
			correctKey: "C",
			explanation:
				"Contaminated single-use objects must be double-bagged and discarded safely.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "Cushion the client’s ____ with a folded towel when washing an adult client’s hair at the shampoo bowl.",
			options: [
				{ key: "A", text: "forehead" },
				{ key: "B", text: "neck" },
				{ key: "C", text: "back" },
				{ key: "D", text: "ears" },
			],
			correctKey: "B",
			explanation:
				"A towel cushions the client’s neck at the shampoo bowl, especially helpful for clients with neck injuries.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "It is your professional and ____ responsibility to follow state and federal laws and rules.",
			options: [
				{ key: "A", text: "social" },
				{ key: "B", text: "moral" },
				{ key: "C", text: "ethical" },
				{ key: "D", text: "legal" },
			],
			correctKey: "D",
			explanation:
				"Barbers have a professional and legal responsibility to follow state and federal rules.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "Which type of agency sets the guidelines for the manufacturing, sale, and use of equipment and chemical ingredients?",
			options: [
				{ key: "A", text: "State" },
				{ key: "B", text: "Local" },
				{ key: "C", text: "Federal" },
				{ key: "D", text: "Regional" },
			],
			correctKey: "C",
			explanation:
				"Federal agencies set guidelines for manufacturing, sale, and use of equipment and chemical ingredients. They also monitor workplace safety and limit the types of services that can be performed.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "At minimum, disinfectants used in barbershops must be _____.",
			options: [
				{ key: "A", text: "bactericidal and virucidal" },
				{ key: "B", text: "bactericidal and fungicidal" },
				{ key: "C", text: "virucidal, fungicidal, and parasital" },
				{ key: "D", text: "bactericidal, virucidal, and fungicidal" },
			],
			correctKey: "D",
			explanation:
				"Disinfectants used in barbershops must be bactericidal, virucidal, and fungicidal to ensure full protection.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "Spirilla are ____-shaped bacteria.",
			options: [
				{ key: "A", text: "spade" },
				{ key: "B", text: "circle" },
				{ key: "C", text: "corkscrew" },
				{ key: "D", text: "diamond" },
			],
			correctKey: "C",
			explanation: "Spirilla are spiral or corkscrew-shaped bacteria.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "Cocci are ____-shaped bacteria that appear singly or in groups.",
			options: [
				{ key: "A", text: "round" },
				{ key: "B", text: "corkscrew" },
				{ key: "C", text: "flat" },
				{ key: "D", text: "rod" },
			],
			correctKey: "A",
			explanation:
				"Cocci are round-shaped bacteria that can appear singly or in groups.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "Tuberculosis is caused by the same type of bacteria as ____.",
			options: [
				{ key: "A", text: "hepatitis" },
				{ key: "B", text: "Lyme disease" },
				{ key: "C", text: "tetanus" },
				{ key: "D", text: "pneumonia" },
			],
			correctKey: "C",
			explanation:
				"Tuberculosis is caused by the same bacteria type as tetanus, diphtheria, and typhoid fever.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "Syphilis is caused by a bacteria called ____.",
			options: [
				{ key: "A", text: "acidophilus" },
				{ key: "B", text: "anthrax" },
				{ key: "C", text: "Borrelia burgdorferi" },
				{ key: "D", text: "Treponema pallidum" },
			],
			correctKey: "D",
			explanation: "Syphilis is caused by the Treponema pallidum bacteria.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "Flagella are used for ____ by bacilli and spirilla.",
			options: [
				{ key: "A", text: "movement" },
				{ key: "B", text: "reproduction" },
				{ key: "C", text: "dormancy" },
				{ key: "D", text: "forming pus" },
			],
			correctKey: "A",
			explanation:
				"Flagella are slender hairlike extensions that allow bacilli and spirilla to move.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "A pimple is a ____ infection.",
			options: [
				{ key: "A", text: "general" },
				{ key: "B", text: "serious" },
				{ key: "C", text: "local" },
				{ key: "D", text: "systemic" },
			],
			correctKey: "C",
			explanation: "A pimple is classified as a local infection.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "A ____ infection is when the pathogen has distributed throughout the body rather than staying in one area or organ.",
			options: [
				{ key: "A", text: "general" },
				{ key: "B", text: "serious" },
				{ key: "C", text: "local" },
				{ key: "D", text: "systemic" },
			],
			correctKey: "D",
			explanation:
				"A systemic infection affects the entire body, not just one area or organ.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "A disease that has spread from one person to another is a ____ disease.",
			options: [
				{ key: "A", text: "contagious" },
				{ key: "B", text: "general" },
				{ key: "C", text: "systematic" },
				{ key: "D", text: "local" },
			],
			correctKey: "A",
			explanation:
				"Contagious diseases are transmitted from one person to another.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "Which type of agency sets the guidelines for the manufacturing, sale, and use of equipment and chemical ingredients?",
			options: [
				{ key: "A", text: "State" },
				{ key: "B", text: "Local" },
				{ key: "C", text: "Federal" },
				{ key: "D", text: "Regional" },
			],
			correctKey: "C",
			explanation:
				"Federal agencies set guidelines for manufacturing, sale, and use of equipment and chemical ingredients. They also monitor safety in the workplace and place limits on the services you can perform.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "At minimum, disinfectants used in barbershops must be _____.",
			options: [
				{ key: "A", text: "bactericidal and virucidal" },
				{ key: "B", text: "bactericidal and fungicidal" },
				{ key: "C", text: "virucidal, fungicidal, and parasital" },
				{ key: "D", text: "bactericidal, virucidal, and fungicidal" },
			],
			correctKey: "D",
			explanation:
				"Disinfectants in barbershops must be bactericidal, virucidal, and fungicidal to properly protect clients.",
			createdBy: adminId,
		},
		{
			category: "Infection Control: Principles and Practices",
			text: "Spirilla are ____-shaped bacteria.",
			options: [
				{ key: "A", text: "spade" },
				{ key: "B", text: "circle" },
				{ key: "C", text: "corkscrew" },
				{ key: "D", text: "diamond" },
			],
			correctKey: "C",
			explanation: "Spirilla are spiral or corkscrew-shaped bacteria.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "Flexibility is a sign of ____ skin.",
			options: [
				{ key: "A", text: "alkaline" },
				{ key: "B", text: "oily" },
				{ key: "C", text: "healthy" },
				{ key: "D", text: "dry" },
			],
			correctKey: "C",
			explanation:
				"Healthy skin is slightly moist, soft, and flexible with a fine-grained texture.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "The ____ of the skin are oil and sweat glands, nails, and hair.",
			options: [
				{ key: "A", text: "non-living tissues" },
				{ key: "B", text: "external parts" },
				{ key: "C", text: "extras" },
				{ key: "D", text: "appendages" },
			],
			correctKey: "D",
			explanation:
				"The appendages of the skin include hair, nails, sweat glands, and oil glands.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "The ____ is the outermost protective layer of the skin.",
			options: [
				{ key: "A", text: "dermis" },
				{ key: "B", text: "epidermis" },
				{ key: "C", text: "exodermis" },
				{ key: "D", text: "hair" },
			],
			correctKey: "B",
			explanation:
				"The epidermis, or cuticle/scarf skin, is the outermost protective layer of the skin.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "The layer beneath the stratum corneum is the ____.",
			options: [
				{ key: "A", text: "stratum lucidum" },
				{ key: "B", text: "stratum germinativum" },
				{ key: "C", text: "epidermis" },
				{ key: "D", text: "stratum granulosum" },
			],
			correctKey: "A",
			explanation:
				"The stratum lucidum, or clear layer, lies beneath the stratum corneum.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "The dark protective pigment in the ____ layer of the skin is called melanin.",
			options: [
				{ key: "A", text: "basal cell" },
				{ key: "B", text: "dermal" },
				{ key: "C", text: "adipose" },
				{ key: "D", text: "tissue" },
			],
			correctKey: "A",
			explanation:
				"The basal cell layer contains melanocytes, which produce melanin.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "The reticular layer of the ____ supplies the skin with oxygen and nutrients.",
			options: [
				{ key: "A", text: "dermis" },
				{ key: "B", text: "epidermis" },
				{ key: "C", text: "stratum lucidum" },
				{ key: "D", text: "stratum germinativum" },
			],
			correctKey: "A",
			explanation:
				"The reticular dermis provides oxygen and nutrients to the skin.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "Subcutaneous tissue is ____ found below the dermis.",
			options: [
				{ key: "A", text: "the nerve endings" },
				{ key: "B", text: "the hair follicles" },
				{ key: "C", text: "the colored tissue" },
				{ key: "D", text: "a layer of fatty tissue" },
			],
			correctKey: "D",
			explanation:
				"Subcutaneous tissue is a fatty layer located beneath the dermis.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "One function of ____ tissue is to act as a protective cushion for the outer skin.",
			options: [
				{ key: "A", text: "nerve" },
				{ key: "B", text: "dermis" },
				{ key: "C", text: "adipose" },
				{ key: "D", text: "papillary" },
			],
			correctKey: "C",
			explanation:
				"Adipose tissue cushions the skin and also provides contour and energy storage.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "____ of the body’s blood supply is distributed to the skin.",
			options: [
				{ key: "A", text: "One-quarter" },
				{ key: "B", text: "One-third to one-half" },
				{ key: "C", text: "One-half to two-thirds" },
				{ key: "D", text: "Two-thirds to seven-eighths" },
			],
			correctKey: "C",
			explanation:
				"From one-half to two-thirds of the body’s blood supply goes to the skin.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "Motor nerve fibers are distributed to the arrector pili muscles attached to the hair follicles, which allows for ____.",
			options: [
				{ key: "A", text: "the skin to appear flushed" },
				{ key: "B", text: "sensations" },
				{ key: "C", text: "goose bumps" },
				{ key: "D", text: "shivering" },
			],
			correctKey: "C",
			explanation:
				"The contraction of the arrector pili muscles produces goose bumps.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "The nerves that regulate the excretion of perspiration from the sweat glands and the flow of ____ are the secretory nerve fibers.",
			options: [
				{ key: "A", text: "sebum" },
				{ key: "B", text: "blood" },
				{ key: "C", text: "lymph" },
				{ key: "D", text: "nerve messages" },
			],
			correctKey: "A",
			explanation:
				"Secretory nerve fibers regulate sweat gland activity and sebum flow.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "The ____ of the skin depends on melanin and genetics.",
			options: [
				{ key: "A", text: "color" },
				{ key: "B", text: "health" },
				{ key: "C", text: "thickness" },
				{ key: "D", text: "elasticity" },
			],
			correctKey: "A",
			explanation:
				"Skin color is determined by genetics and the amount of melanin produced.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "The palms and soles are lacking ____.",
			options: [
				{ key: "A", text: "nerve endings" },
				{ key: "B", text: "an epidermis" },
				{ key: "C", text: "a dermis" },
				{ key: "D", text: "sebaceous glands" },
			],
			correctKey: "D",
			explanation: "The palms and soles lack sebaceous (oil) glands.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "The primary function of ____ is to act as a shield that prevents moisture from evaporating from the skin surface.",
			options: [
				{ key: "A", text: "sweat" },
				{ key: "B", text: "nerves" },
				{ key: "C", text: "sebum" },
				{ key: "D", text: "muscles" },
			],
			correctKey: "C",
			explanation:
				"Sebum prevents excess moisture loss from the skin’s surface.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "Water lost by ____ carries salt and other chemicals with it.",
			options: [
				{ key: "A", text: "sebum" },
				{ key: "B", text: "perspiration" },
				{ key: "C", text: "the nerves" },
				{ key: "D", text: "the hair follicles" },
			],
			correctKey: "B",
			explanation:
				"Perspiration carries salts and waste chemicals from the body.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "A ____ is a primary skin lesion.",
			options: [
				{ key: "A", text: "hypertrophy" },
				{ key: "B", text: "scab" },
				{ key: "C", text: "papule" },
				{ key: "D", text: "scale" },
			],
			correctKey: "C",
			explanation:
				"A papule is a primary skin lesion, small and raised, sometimes containing pus.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "A closed, abnormally developed sac that contains ____ above or below the skin is a cyst.",
			options: [
				{ key: "A", text: "blood" },
				{ key: "B", text: "lymph" },
				{ key: "C", text: "sebum" },
				{ key: "D", text: "pus, semifluid, or morbid matter" },
			],
			correctKey: "D",
			explanation:
				"A cyst is a sac containing pus, semifluid, or morbid matter.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "____ and mosquito bites are examples of wheals.",
			options: [
				{ key: "A", text: "Hives" },
				{ key: "B", text: "Pimples" },
				{ key: "C", text: "Cysts" },
				{ key: "D", text: "Keloids" },
			],
			correctKey: "A",
			explanation:
				"Wheals are raised lesions, such as hives or mosquito bites.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "____ is characterized by dry or moist lesions.",
			options: [
				{ key: "A", text: "Eczema" },
				{ key: "B", text: "Psoriasis" },
				{ key: "C", text: "Herpes simplex" },
				{ key: "D", text: "Anthrax" },
			],
			correctKey: "A",
			explanation: "Eczema presents in many forms of dry or moist lesions.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "Hyperhidrosis is characterized by ____.",
			options: [
				{ key: "A", text: "extremely dry ski" },
				{ key: "B", text: "foul-smelling perspiration" },
				{ key: "C", text: "excessive sweating" },
				{ key: "D", text: "pimples" },
			],
			correctKey: "C",
			explanation:
				"Hyperhidrosis is excessive sweating due to heat or weakness.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "Prickly heat is also known as ____.",
			options: [
				{ key: "A", text: "hypertrophy" },
				{ key: "B", text: "keratoma" },
				{ key: "C", text: "miliaria rubra" },
				{ key: "D", text: "hyperhidrosis" },
			],
			correctKey: "C",
			explanation:
				"Miliaria rubra, also called prickly heat, is a sweat gland disorder.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "The congenital absence of ____ in the body, including the skin, hair, and eyes, is called albinism.",
			options: [
				{ key: "A", text: "fat" },
				{ key: "B", text: "bone" },
				{ key: "C", text: "hair" },
				{ key: "D", text: "melanin pigment" },
			],
			correctKey: "D",
			explanation: "Albinism results from the absence of melanin pigment.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "A(n) ____ is a hypertrophy not related to pigmentation.",
			options: [
				{ key: "A", text: "albinism" },
				{ key: "B", text: "chloasma" },
				{ key: "C", text: "keratoma" },
				{ key: "D", text: "stain" },
			],
			correctKey: "C",
			explanation: "A keratoma is a hypertrophy not related to pigmentation.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "A barber should ____ if he sees changes in the client’s skin.",
			options: [
				{ key: "A", text: "treat the problem" },
				{ key: "B", text: "send the client home" },
				{ key: "C", text: "suggest that the client see a dermatologist" },
				{ key: "D", text: "give the client medication" },
			],
			correctKey: "C",
			explanation:
				"Barbers should refer clients to dermatologists if changes in skin are detected.",
			createdBy: adminId,
		},
		{
			category: "The Skin—Structure, Disorders, and Diseases",
			text: "Vitamin E ____.",
			options: [
				{ key: "A", text: "supports the overall health of the skin" },
				{ key: "B", text: "helps with tissue repair" },
				{ key: "C", text: "promotes healing" },
				{
					key: "D",
					text: "helps to fight against the harmful effects of the sun’s rays",
				},
			],
			correctKey: "D",
			explanation:
				"Vitamin E helps fight harmful effects of the sun’s rays on the skin.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "Women’s styling is often more _____ than men’s styling.",
			options: [
				{ key: "A", text: "angular" },
				{ key: "B", text: "curly" },
				{ key: "C", text: "rounded" },
				{ key: "D", text: "straight" },
			],
			correctKey: "C",
			explanation:
				"Women’s styling is often more rounded and soft when compared to men’s styling.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "The four basic women’s haircuts are blunt, ____, uniform layered, and long layered.",
			options: [
				{ key: "A", text: "graduated" },
				{ key: "B", text: "tapered" },
				{ key: "C", text: "wedge" },
				{ key: "D", text: "short layers" },
			],
			correctKey: "A",
			explanation:
				"The four basic women’s haircuts are blunt, graduated, uniform layered, and long layered.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "_____ while cutting a blunt cut, an undercut will be created.",
			options: [
				{ key: "A", text: "If the head is positioned to the side" },
				{ key: "B", text: "Using uniform layers" },
				{ key: "C", text: "Using an upright position" },
				{ key: "D", text: "If the head is positioned forward" },
			],
			correctKey: "D",
			explanation:
				"If the head is positioned forward while cutting a blunt cut, an undercut will be created.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "In a _____ cut, all of the hair strands are cut to the same length.",
			options: [
				{ key: "A", text: "bob" },
				{ key: "B", text: "traveling" },
				{ key: "C", text: "blunt" },
				{ key: "D", text: "uniform-layered" },
			],
			correctKey: "D",
			explanation:
				"In a uniform-layered cut, all of the hair strands are cut to the same length at a 90-degree elevation.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "Either an exterior or interior guide can be cut first when cutting _____.",
			options: [
				{ key: "A", text: "uniform layers" },
				{ key: "B", text: "curly hair" },
				{ key: "C", text: "long hair" },
				{ key: "D", text: "very short hair" },
			],
			correctKey: "A",
			explanation:
				"Either exterior (perimeter) or interior guides can be cut first when cutting a uniform-layered cut.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "_____ hair tends to graduate naturally.",
			options: [
				{ key: "A", text: "Fine" },
				{ key: "B", text: "Curly" },
				{ key: "C", text: "Coarse" },
				{ key: "D", text: "Straight" },
			],
			correctKey: "B",
			explanation:
				"Curly hair tends to graduate naturally due to elasticity and curl pattern.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "If curly hair ends flip out from the head form, the hair parting was probably cut ____.",
			options: [
				{ key: "A", text: "when dry" },
				{ key: "B", text: "against the grain" },
				{ key: "C", text: "just after the crest of the wave" },
				{ key: "D", text: "in the trough of the wave" },
			],
			correctKey: "D",
			explanation:
				"Cutting in the trough of the wave may cause curly ends to flip out from the head form.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "If curly hair falls inward toward the head form, the hair was probably cut ____.",
			options: [
				{ key: "A", text: "when dry" },
				{ key: "B", text: "against the grain" },
				{
					key: "C",
					text: "just after the crest of the wave as it dips toward the trough",
				},
				{ key: "D", text: "in the trough of the wave" },
			],
			correctKey: "C",
			explanation:
				"Cutting curly hair just after the crest of the wave encourages the hair to fall inward.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "A razor can be used to create a haircut with _____ and more movement than shear cutting.",
			options: [
				{ key: "A", text: "a smoother surface" },
				{ key: "B", text: "more angles" },
				{ key: "C", text: "softer shapes" },
				{ key: "D", text: "more volume" },
			],
			correctKey: "C",
			explanation:
				"A razor produces softer shapes with more movement and visual separation than shears.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "Slithering is a _____ technique that involves a sliding shears movement with the blades kept partially open.",
			options: [
				{ key: "A", text: "curling" },
				{ key: "B", text: "thinning" },
				{ key: "C", text: "shortening" },
				{ key: "D", text: "texturizing" },
			],
			correctKey: "D",
			explanation:
				"Slithering is a texturizing technique that reduces weight and adds movement by sliding shears.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "Carving involves using a(n) _____ movement as the shears are moved through the hair.",
			options: [
				{ key: "A", text: "slicing" },
				{ key: "B", text: "open and closing" },
				{ key: "C", text: "sliding" },
				{ key: "D", text: "hacking" },
			],
			correctKey: "B",
			explanation:
				"Carving uses an open-and-closing motion with the shears as they move through the hair.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "The client consultation ____.",
			options: [
				{ key: "A", text: "should take place over the phone" },
				{ key: "B", text: "is the first step in the hairstyling process" },
				{ key: "C", text: "is performed by the receptionist" },
				{ key: "D", text: "takes place at the end of the hairstyling process" },
			],
			correctKey: "B",
			explanation:
				"The consultation is the first step in hairstyling, guiding haircut choice and technique.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "Which technique is used to keep curly hair smooth and straight while retaining a beautiful shape?",
			options: [
				{ key: "A", text: "Hair wrapping" },
				{ key: "B", text: "Thermal waving" },
				{ key: "C", text: "Hair molding" },
				{ key: "D", text: "Pin curls" },
			],
			correctKey: "A",
			explanation:
				"Hair wrapping keeps curly hair smooth and straight while maintaining shape.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "_____ is the technique of drying and styling damp or wet hair in one step.",
			options: [
				{ key: "A", text: "Wet hairstyling" },
				{ key: "B", text: "Thermal styling" },
				{ key: "C", text: "Natural dry styling" },
				{ key: "D", text: "Blowdrystying" },
			],
			correctKey: "D",
			explanation:
				"Blowdrystying is drying and styling damp hair in one process.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "In thermal waving, the barrel size of the iron determines ____.",
			options: [
				{ key: "A", text: "the size of the curl" },
				{ key: "B", text: "the length of time needed to curl" },
				{ key: "C", text: "the volume of the hair" },
				{ key: "D", text: "None of the answers are correct" },
			],
			correctKey: "A",
			explanation:
				"The iron’s barrel size determines the size of the curl or wave.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "The _____ of a curl gives the hair direction and mobility.",
			options: [
				{ key: "A", text: "base" },
				{ key: "B", text: "stem" },
				{ key: "C", text: "tip" },
				{ key: "D", text: "barrel" },
			],
			correctKey: "B",
			explanation: "The stem of the curl provides mobility and direction.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "The roller or barrel placement that produces the _____ in thermal styling is the off-base placement.",
			options: [
				{ key: "A", text: "least amount of volume" },
				{ key: "B", text: "most amount of volume" },
				{ key: "C", text: "largest curls" },
				{ key: "D", text: "smallest curls" },
			],
			correctKey: "A",
			explanation: "Off-base placement creates the least amount of volume.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "Hair pressing generally lasts until the next shampoo but can be affected by ____.",
			options: [
				{ key: "A", text: "sunshine" },
				{ key: "B", text: "dry heat" },
				{ key: "C", text: "high humidity" },
				{ key: "D", text: "air-conditioning" },
			],
			correctKey: "C",
			explanation:
				"High humidity can cause the hair to revert to its natural state after pressing.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "Electric flat irons are used to ____ the hair.",
			options: [
				{ key: "A", text: "curl" },
				{ key: "B", text: "straighten" },
				{ key: "C", text: "shorten" },
				{ key: "D", text: "wave" },
			],
			correctKey: "B",
			explanation: "Flat irons are primarily used to straighten hair.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "When performing a blunt cut, what should you do after taking a central profile parting from the front hairline to the nape?",
			options: [
				{
					key: "A",
					text: "Take two diagonal forward partings from the occipital to behind the ear.",
				},
				{
					key: "B",
					text: "Comb the hair to natural fall and cut a line parallel to the diagonal",
				},
				{ key: "C", text: "Check balance" },
				{ key: "D", text: "Take a horseshoe section" },
			],
			correctKey: "A",
			explanation:
				"The next step after a central parting is taking two diagonal forward partings from the occipital to the ear.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "During a graduated cut, take a pivoting diagonal forward subsection, elevate it to ____ degrees, and cut parallel to your parting.",
			options: [
				{ key: "A", text: "0" },
				{ key: "B", text: "15" },
				{ key: "C", text: "30" },
				{ key: "D", text: "45" },
			],
			correctKey: "D",
			explanation:
				"Graduated cuts are created by elevating diagonal forward subsections to 45 degrees.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "Once a graduated haircut is dry, ____.",
			options: [
				{ key: "A", text: "detail the interior using deep point cutting" },
				{ key: "B", text: "cross-check the cut" },
				{
					key: "C",
					text: "detail the perimeter at the nape for softness or strength",
				},
				{ key: "D", text: "check balance" },
			],
			correctKey: "C",
			explanation:
				"The perimeter at the nape is detailed for softness or strength when the graduated cut is dry.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "When creating a guide for a uniform-layered cut, how wide should your profile section be from the front hairline to the nape?",
			options: [
				{ key: "A", text: "1/4 inch" },
				{ key: "B", text: "1/2 inch" },
				{ key: "C", text: "2/3 inch" },
				{ key: "D", text: "3/4 inch" },
			],
			correctKey: "B",
			explanation:
				"A half-inch (1.5 cm) wide profile section is used for a uniform-layered cut guide.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "Which type of brush should you use to dry a uniform-layered cut?",
			options: [
				{ key: "A", text: "Paddle brush" },
				{ key: "B", text: "Round brush" },
				{ key: "C", text: "Vented brush" },
				{ key: "D", text: "Wide-tooth comb" },
			],
			correctKey: "A",
			explanation:
				"A paddle brush or your hands are recommended for drying uniform-layered cuts.",
			createdBy: adminId,
		},
		{
			category: "Women’s Haircutting and Styling",
			text: "During a long-layered cut, tilt the head slightly forward and, starting in the center back, comb the hair at natural fall at 0 degrees and cut the line parallel to the parting.",
			options: [
				{ key: "A", text: "0" },
				{ key: "B", text: "15" },
				{ key: "C", text: "30" },
				{ key: "D", text: "45" },
			],
			correctKey: "A",
			explanation:
				"A long-layered cut starts at 0 degrees, parallel to the parting, with the head tilted forward.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "What should you do after the client consultation and before you begin the haircut?",
			options: [
				{
					key: "A",
					text: "Explain or summarize what you will be doing based on what the client has told you.",
				},
				{ key: "B", text: "Report the client’s request to your boss." },
				{
					key: "C",
					text: "Nothing; the next step after the client consultation is to begin the haircut.",
				},
				{
					key: "D",
					text: "Write down exactly what the client has said so you have something to back you up if the client is not satisfied.",
				},
			],
			correctKey: "A",
			explanation:
				"After consulting, clearly explain or summarize the plan so you and the client are aligned.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "Style the hair so that it is longer at the nape to balance a ____.",
			options: [
				{ key: "A", text: "short neck" },
				{ key: "B", text: "long neck" },
				{ key: "C", text: "large chin" },
				{ key: "D", text: "small chin" },
			],
			correctKey: "B",
			explanation:
				"Leaving hair fuller/longer at the nape visually shortens a long neck.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "The highest point on the top of the head is the ____.",
			options: [
				{ key: "A", text: "horseshoe" },
				{ key: "B", text: "apex" },
				{ key: "C", text: "hatband" },
				{ key: "D", text: "parietal ridge" },
			],
			correctKey: "B",
			explanation: "The apex is the head’s highest point.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "Which style usually requires the least amount of close tapering?",
			options: [
				{ key: "A", text: "Medium-length" },
				{ key: "B", text: "Fade" },
				{ key: "C", text: "Short" },
				{ key: "D", text: "Longer" },
			],
			correctKey: "D",
			explanation: "Longer styles typically need the least close tapering.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "_____ cutting lines are used to create a one-length look.",
			options: [
				{ key: "A", text: "Horizontal" },
				{ key: "B", text: "Curved" },
				{ key: "C", text: "Vertical" },
				{ key: "D", text: "Diagonal" },
			],
			correctKey: "A",
			explanation:
				"Horizontal lines build weight to create a solid one-length form.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "_____ cutting lines move in a semicircular or circular direction and can be shallow or deep.",
			options: [
				{ key: "A", text: "Vertical" },
				{ key: "B", text: "Horizontal" },
				{ key: "C", text: "Diagonal" },
				{ key: "D", text: "Curved" },
			],
			correctKey: "D",
			explanation: "Curved lines travel in circular paths with varying depth.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "What measures or shows the comparative relationship between two or more design elements of a form?",
			options: [
				{ key: "A", text: "Balance" },
				{ key: "B", text: "Proportion" },
				{ key: "C", text: "Space" },
				{ key: "D", text: "Design texture" },
			],
			correctKey: "B",
			explanation: "Proportion compares the relative sizes of design elements.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "An angle is the space between ____.",
			options: [
				{
					key: "A",
					text: "two lines or surfaces that intersect at a given point",
				},
				{ key: "B", text: "three lines that intersect at a given point" },
				{ key: "C", text: "the cutting lines cross the parietal ridge" },
				{ key: "D", text: "the hair and a parallel line to the floor" },
			],
			correctKey: "A",
			explanation: "An angle is formed where two lines/surfaces meet.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "Holding the hair at 45 degrees from where it grows is considered to be a ____ elevation.",
			options: [
				{ key: "A", text: "low" },
				{ key: "B", text: "medium" },
				{ key: "C", text: "high" },
				{ key: "D", text: "normal" },
			],
			correctKey: "B",
			explanation: "A 45° lift is a medium elevation.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "Cutting each section the same length results in ____.",
			options: [
				{ key: "A", text: "a single-length cut" },
				{ key: "B", text: "stacked layers" },
				{ key: "C", text: "uniform layers" },
				{ key: "D", text: "maximum length at the perimeter" },
			],
			correctKey: "C",
			explanation: "Uniform layers are created at 90° with equal lengths.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "A traveling guide ____.",
			options: [
				{ key: "A", text: "is used for a solid-form blunt cut" },
				{ key: "B", text: "is used exclusively to create most haircuts" },
				{ key: "C", text: "moves along a section of hair as each cut is made" },
				{ key: "D", text: "should be avoided" },
			],
			correctKey: "C",
			explanation: "A traveling (moving) guide advances with each subsection.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "A(n) ____ haircut is shorter at the nape and hairline and longer in the crown and top areas.",
			options: [
				{ key: "A", text: "short" },
				{ key: "B", text: "blunt" },
				{ key: "C", text: "angled" },
				{ key: "D", text: "tapered" },
			],
			correctKey: "D",
			explanation:
				"Tapering keeps the perimeter short and lengthens toward the top.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "A stationary guide at the perimeter creates ____.",
			options: [
				{ key: "A", text: "a weight line" },
				{ key: "B", text: "a design line" },
				{ key: "C", text: "elevation" },
				{ key: "D", text: "layers" },
			],
			correctKey: "A",
			explanation: "A fixed perimeter guide builds a visible weight line.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "The shear-over-comb technique is especially useful in creating ____ cuts.",
			options: [
				{ key: "A", text: "one-length" },
				{ key: "B", text: "blunt" },
				{ key: "C", text: "tapered" },
				{ key: "D", text: "layered" },
			],
			correctKey: "C",
			explanation: "Shear-over-comb is ideal for tapering and refining.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "Rolling the comb out is used as part of the ____ technique.",
			options: [
				{ key: "A", text: "stacked and rolled" },
				{ key: "B", text: "fingers-over-comb" },
				{ key: "C", text: "shear-over-comb" },
				{ key: "D", text: "comb-over-shears" },
			],
			correctKey: "C",
			explanation:
				"In shear-over-comb, you roll the comb to adjust elevation/blend.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "_____ is particularly effective for thinning out or customizing difficult areas caused by hollows, wrinkles, whorls, or ragged patches or creases in the scalp.",
			options: [
				{ key: "A", text: "Outlining" },
				{ key: "B", text: "Shear-point tapering" },
				{ key: "C", text: "The fingers-and-shear technique" },
				{ key: "D", text: "The clipper technique" },
			],
			correctKey: "B",
			explanation: "Shear-point tapering targets stubborn growth patterns.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "Which fingers-and-shear cutting technique is used to cut and blend layers in the top, crown, and horseshoe areas?",
			options: [
				{ key: "A", text: "Cutting above the fingers" },
				{ key: "B", text: "Cutting below the fingers" },
				{ key: "C", text: "Cutting palm-to-palm" },
				{ key: "D", text: "Cutting finger-to-finger" },
			],
			correctKey: "A",
			explanation:
				"Above-the-fingers positioning supports blending layers on top/crown.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "Which fingers-and-shear cutting technique is most often used to create design lines at the perimeter of the haircut?",
			options: [
				{ key: "A", text: "Cutting above the fingers" },
				{ key: "B", text: "Cutting below the fingers" },
				{ key: "C", text: "Cutting palm-to-palm" },
				{ key: "D", text: "Cutting finger-to-finger" },
			],
			correctKey: "B",
			explanation: "Below-the-fingers offers precision for perimeter lines.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "The razor is held at a 45-degree angle to the surface of the hair in ____ blending.",
			options: [
				{ key: "A", text: "heavier taper-" },
				{ key: "B", text: "light taper-" },
				{ key: "C", text: "terminal" },
				{ key: "D", text: "elevation" },
			],
			correctKey: "A",
			explanation: "Heavier taper-blending uses up to a 45° razor angle.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "_____ can build fullness into the style while allowing the hair to fall into the natural lines of the cut.",
			options: [
				{ key: "A", text: "Stylized blowdrying" },
				{ key: "B", text: "Freeform blowdrying" },
				{ key: "C", text: "Diffused drying" },
				{ key: "D", text: "Natural drying" },
			],
			correctKey: "B",
			explanation:
				"Freeform blowdrying adds fullness yet respects the cut’s flow.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "_____ is used when the client desires to maintain the natural wave pattern of the hair.",
			options: [
				{ key: "A", text: "Stylized blowdrying" },
				{ key: "B", text: "Freeform blowdrying" },
				{ key: "C", text: "Diffused drying" },
				{ key: "D", text: "Natural drying" },
			],
			correctKey: "C",
			explanation: "Diffused drying preserves the natural wave/curl pattern.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "_____ hair care associated with styling the hair into braids and locks originated in Africa.",
			options: [
				{ key: "A", text: "Decorative" },
				{ key: "B", text: "Twist" },
				{ key: "C", text: "Natural" },
				{ key: "D", text: "Traditional" },
			],
			correctKey: "C",
			explanation:
				"Natural hair-care traditions for braids/locks began in Africa.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "One of the most popular styles of braiding worn today are ____.",
			options: [
				{ key: "A", text: "French braids" },
				{ key: "B", text: "dreadlocks" },
				{ key: "C", text: "off-the-scalp cornrows" },
				{ key: "D", text: "on-the-scalp cornrows" },
			],
			correctKey: "D",
			explanation:
				"On-the-scalp cornrows are among the most popular braids today.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "The more coil revolutions within a single strand, the faster the hair will coil and ____.",
			options: [
				{ key: "A", text: "break" },
				{ key: "B", text: "knot" },
				{ key: "C", text: "lock" },
				{ key: "D", text: "braid" },
			],
			correctKey: "C",
			explanation: "More coils speed formation of locked strands.",
			createdBy: adminId,
		},
		{
			category: "Men’s Haircutting and Styling",
			text: "Double twisting, wrapping with cord, and ____ are methods of creating cultivated locks.",
			options: [
				{ key: "A", text: "palm rolling" },
				{ key: "B", text: "chemically treating" },
				{ key: "C", text: "trimming" },
				{ key: "D", text: "cornrows" },
			],
			correctKey: "A",
			explanation:
				"Cultivated locks can be formed via double twisting, coiling, palm rolling, braiding, and cord wrapping.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "_____ chemistry is the study of substances that contain the element carbon.",
			options: [
				{ key: "A", text: "Organic" },
				{ key: "B", text: "Inorganic" },
				{ key: "C", text: "Life-based" },
				{ key: "D", text: "Biologic" },
			],
			correctKey: "A",
			explanation:
				"Organic chemistry studies carbon-based substances; all living things contain carbon compounds.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "Minerals are _____ substances.",
			options: [
				{ key: "A", text: "carbon-based" },
				{ key: "B", text: "cell-based" },
				{ key: "C", text: "living" },
				{ key: "D", text: "inorganic" },
			],
			correctKey: "D",
			explanation:
				"Metals, minerals, water, and air are examples of inorganic substances.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "What is formed when two or more atoms combine chemically in definite proportions?",
			options: [
				{ key: "A", text: "Elements" },
				{ key: "B", text: "Atoms" },
				{ key: "C", text: "Compounds" },
				{ key: "D", text: "Molecules" },
			],
			correctKey: "D",
			explanation:
				"A molecule forms when atoms combine chemically in fixed proportions.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "Compound molecules are chemical combinations of _____ of different elements.",
			options: [
				{ key: "A", text: "electrons" },
				{ key: "B", text: "atoms" },
				{ key: "C", text: "three molecules" },
				{ key: "D", text: "organic matter" },
			],
			correctKey: "B",
			explanation:
				"Compound molecules are combinations of atoms from different elements.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "As steam, _____ is in a gaslike state.",
			options: [
				{ key: "A", text: "oxygen" },
				{ key: "B", text: "carbon" },
				{ key: "C", text: "water" },
				{ key: "D", text: "hydrogen" },
			],
			correctKey: "C",
			explanation:
				"Steam is water in a gas state, having no definite volume or shape.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "In which state does matter have volume but no definite shape?",
			options: [
				{ key: "A", text: "Liquid" },
				{ key: "B", text: "Gas" },
				{ key: "C", text: "Solid" },
				{ key: "D", text: "Vapor" },
			],
			correctKey: "A",
			explanation: "Liquids have volume but no fixed shape, unlike solids.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "Chemical changes in the hair can be created with _____ because the chemical reaction of oxidation takes place.",
			options: [
				{ key: "A", text: "permanent haircolor" },
				{ key: "B", text: "blowdrying" },
				{ key: "C", text: "shampooing" },
				{ key: "D", text: "styling products" },
			],
			correctKey: "A",
			explanation:
				"Permanent haircolor alters hair chemically through oxidation.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "A substance from which _____ has been chemically removed is a reduced substance.",
			options: [
				{ key: "A", text: "hydrogen" },
				{ key: "B", text: "nitrogen" },
				{ key: "C", text: "carbon" },
				{ key: "D", text: "oxygen" },
			],
			correctKey: "D",
			explanation:
				"When oxygen is removed chemically, the substance is reduced.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "When hydrogen peroxide is mixed with an oxidation haircolor product, the haircolor product gains _____.",
			options: [
				{ key: "A", text: "oxygen" },
				{ key: "B", text: "carbon" },
				{ key: "C", text: "nitrogen" },
				{ key: "D", text: "hydrogen" },
			],
			correctKey: "A",
			explanation:
				"Hydrogen peroxide provides oxygen, allowing the color product to oxidize.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "Chemical reactions that release _____ are called exothermic.",
			options: [
				{ key: "A", text: "heat" },
				{ key: "B", text: "smell" },
				{ key: "C", text: "light" },
				{ key: "D", text: "oxygen" },
			],
			correctKey: "A",
			explanation: "Exothermic reactions release heat energy.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "A physical mixture is a combination of _____ substances united physically in any proportions without a fixed composition.",
			options: [
				{ key: "A", text: "exactly two" },
				{ key: "B", text: "exactly three" },
				{ key: "C", text: "two or more" },
				{ key: "D", text: "five or more" },
			],
			correctKey: "C",
			explanation:
				"Physical mixtures combine two or more substances without fixed ratios.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "Substances that are _____ are easy to mix together.",
			options: [
				{ key: "A", text: "soluble" },
				{ key: "B", text: "miscible" },
				{ key: "C", text: "redox" },
				{ key: "D", text: "reduced" },
			],
			correctKey: "B",
			explanation: "Miscible substances mix easily in any proportion.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "The mixtures called _____ are not usually transparent.",
			options: [
				{ key: "A", text: "suspensions" },
				{ key: "B", text: "solutes" },
				{ key: "C", text: "dilute solutions" },
				{ key: "D", text: "saturated solutions" },
			],
			correctKey: "A",
			explanation:
				"Suspensions are often cloudy, colored, and separate over time.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "_____ are physical mixtures of two immiscible liquids held together by an emulsifying agent.",
			options: [
				{ key: "A", text: "Dilute solutions" },
				{ key: "B", text: "Emulsions" },
				{ key: "C", text: "Suspensions" },
				{ key: "D", text: "Concentrated solutions" },
			],
			correctKey: "B",
			explanation: "Emulsions are stabilized mixtures of immiscible liquids.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "The _____ used in the manufacturing of cosmetics is/are processed by distilling.",
			options: [
				{ key: "A", text: "minerals" },
				{ key: "B", text: "matter" },
				{ key: "C", text: "water" },
				{ key: "D", text: "elements" },
			],
			correctKey: "C",
			explanation: "Cosmetic water is purified through distillation.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "Soft water comes from _____ or chemically treated water.",
			options: [
				{ key: "A", text: "underground" },
				{ key: "B", text: "the tap" },
				{ key: "C", text: "a spring" },
				{ key: "D", text: "rainwater" },
			],
			correctKey: "D",
			explanation:
				"Soft water is naturally rainwater or water treated to remove minerals.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "Hard water may be softened by _____, water-softening units, or by adding sodium carbonate.",
			options: [
				{ key: "A", text: "distillation" },
				{ key: "B", text: "adding sodium chloride" },
				{ key: "C", text: "adding an acid" },
				{ key: "D", text: "boiling" },
			],
			correctKey: "A",
			explanation:
				"Hard water can be softened by distillation, water-softeners, or sodium carbonate.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "An atom or molecule that _____ is called an ion.",
			options: [
				{ key: "A", text: "is in a gaseous state" },
				{ key: "B", text: "is in a solid state" },
				{ key: "C", text: "is made from water" },
				{ key: "D", text: "carries an electrical charge" },
			],
			correctKey: "D",
			explanation: "Ions are particles with electrical charges.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "The _____ of a substance measures its acidity and alkalinity.",
			options: [
				{ key: "A", text: "melting point" },
				{ key: "B", text: "boiling point" },
				{ key: "C", text: "pH" },
				{ key: "D", text: "hardness" },
			],
			correctKey: "C",
			explanation: "The pH value indicates acidity or alkalinity.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "The pH scale is a _____ scale.",
			options: [
				{ key: "A", text: "logarithmic" },
				{ key: "B", text: "linear" },
				{ key: "C", text: "numerical factor" },
				{ key: "D", text: "ordinal" },
			],
			correctKey: "A",
			explanation:
				"The pH scale is logarithmic; each unit is a 10-fold change.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "The pH of hair and skin is an average of ____.",
			options: [
				{ key: "A", text: "5.0" },
				{ key: "B", text: "6.0" },
				{ key: "C", text: "7.0" },
				{ key: "D", text: "8.0" },
			],
			correctKey: "B",
			explanation: "Hair and skin pH averages around 5.0–5.5, close to 6.0.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "Which type of shampoo is known as a mild cream shampoo that contains humectants designed to lock in moisture or draw moisture into the hair?",
			options: [
				{ key: "A", text: "Clarifying shampoo" },
				{ key: "B", text: "Conditioning shampoo" },
				{ key: "C", text: "Medicated shampoo" },
				{ key: "D", text: "Neutralizing shampoo" },
			],
			correctKey: "B",
			explanation:
				"Conditioning shampoos (moisturizing shampoos) add and retain moisture.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "Which type of conditioners can be designed for use with thermal tools?",
			options: [
				{ key: "A", text: "Instant conditioners" },
				{ key: "B", text: "Treatment conditioners" },
				{ key: "C", text: "Leave-in conditioners" },
				{ key: "D", text: "Medicated conditioners" },
			],
			correctKey: "C",
			explanation:
				"Leave-in conditioners act as protectors, often for thermal styling.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "_____ are made by mixing plant oils or animal fats with strong alkaline substances.",
			options: [
				{ key: "A", text: "Scalp lotions" },
				{ key: "B", text: "Soaps" },
				{ key: "C", text: "Solutions" },
				{ key: "D", text: "Surfactants" },
			],
			correctKey: "B",
			explanation: "Soaps are produced by combining fats/oils with alkalis.",
			createdBy: adminId,
		},
		{
			category: "Basics of Chemistry",
			text: "_____ is a colorless gas composed of hydrogen and nitrogen.",
			options: [
				{ key: "A", text: "Air" },
				{ key: "B", text: "Carbon dioxide" },
				{ key: "C", text: "Ammonia" },
				{ key: "D", text: "Oxygen" },
			],
			correctKey: "C",
			explanation:
				"Ammonia is a compound of hydrogen and nitrogen used in many barbering products.",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "Open communication between the barber and the client is accomplished by asking open-ended questions to determine the client's ________.",
			options: [
				{ key: "A", text: "desires and past experiences" },
				{ key: "B", text: "personal style" },
				{
					key: "C",
					text: "past experiences and the culture at their workplace",
				},
				{ key: "D", text: "style icons" },
			],
			correctKey: "A",
			explanation:
				"Open communication is used to determine the client's desires and past experiences. (Ref: p. 580)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "The greater the degree of ________, the longer the wave will remain in the hair.",
			options: [
				{ key: "A", text: "porosity" },
				{ key: "B", text: "melanin" },
				{ key: "C", text: "density" },
				{ key: "D", text: "elasticity" },
			],
			correctKey: "D",
			explanation:
				"The greater the degree of elasticity, the longer the wave will remain in the hair. (Ref: p. 583)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "The cuticle and cortex are ________ by chemical texture services.",
			options: [
				{ key: "A", text: "ruined" },
				{ key: "B", text: "unchanged" },
				{ key: "C", text: "least affected" },
				{ key: "D", text: "most affected" },
			],
			correctKey: "D",
			explanation:
				"The cuticle and cortex are the two layers most affected by chemical texture services. (Ref: p. 585)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "Alkaline substances used in chemical texture products ________ the chemical bonds.",
			options: [
				{ key: "A", text: "strengthen and combine" },
				{ key: "B", text: "break" },
				{ key: "C", text: "break or rearrange" },
				{ key: "D", text: "break or rearrange" },
			],
			correctKey: "C",
			explanation:
				"Alkaline substances used in chemical texture products break the chemical bonds and allow for the softening and expansion of the hair. (Ref: p. 586)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "Hydroxide relaxing products are neutralized by ________.",
			options: [
				{ key: "A", text: "the application of waving lotion" },
				{ key: "B", text: "the application of neutralizer" },
				{ key: "C", text: "blowdrying" },
				{ key: "D", text: "shampooing and rinsing" },
			],
			correctKey: "D",
			explanation:
				"Hydroxide relaxing products are neutralized by the physical actions of the shampooing and rinsing process. (Ref: p. 587)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "An oxidizing agent neutralizes ________.",
			options: [
				{ key: "A", text: "alkaline relaxers" },
				{ key: "B", text: "thio relaxers" },
				{ key: "C", text: "hydroxide relaxers" },
				{ key: "D", text: "none of the answers are correct." },
			],
			correctKey: "B",
			explanation:
				"An oxidizing agent, such as hydrogen peroxide, neutralizes thio relaxers. (Ref: p. 587)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "________ rods are made of stiff wires covered by soft foam that permits bending into a variety of shapes.",
			options: [
				{ key: "A", text: "Straight" },
				{ key: "B", text: "Circle" },
				{ key: "C", text: "Bender" },
				{ key: "D", text: "Concave" },
			],
			correctKey: "C",
			explanation:
				"Bender rods are made of stiff wires covered by soft foam that permits bending into a variety of shapes. (Ref: p. 589)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "When hair is wrapped at 45 degrees below perpendicular to its base section, it is called ________ placement.",
			options: [
				{ key: "A", text: "angled" },
				{ key: "B", text: "half-off-base" },
				{ key: "C", text: "off-base" },
				{ key: "D", text: "on-base" },
			],
			correctKey: "C",
			explanation:
				"Off-base placement is achieved by wrapping the hair at a 45-degree angle below perpendicular to its base section. (Ref: p. 593)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "In a bricklay perm wrap, ________.",
			options: [
				{ key: "A", text: "there are two rods for each parting" },
				{ key: "B", text: "base sections are offset from each other" },
				{ key: "C", text: "the hair is wrapped straight" },
				{ key: "D", text: "all the rods are positioned in the same direction" },
			],
			correctKey: "B",
			explanation:
				"In a bricklay perm wrap, the base sections are offset from each other row by row to prevent noticeable splits in the hair. (Ref: p. 595)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "Another name for cold waves is ________ perms.",
			options: [
				{ key: "A", text: "low-pH" },
				{ key: "B", text: "alkaline" },
				{ key: "C", text: "acid-balanced" },
				{ key: "D", text: "ammonia-free" },
			],
			correctKey: "B",
			explanation:
				"Another name for cold waves is alkaline perms. (Ref: p. 596)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "The permanent waving solution usually contains ATG and the activator GMTG.",
			options: [
				{ key: "A", text: "Alkaline" },
				{ key: "B", text: "Thermal" },
				{ key: "C", text: "Acid-balanced" },
				{ key: "D", text: "True acid" },
			],
			correctKey: "C",
			explanation:
				"The permanent waving solution for acid-balanced waves usually contains ATG and the activator GMTG. (Ref: p. 597)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "The activator in an exothermic wave contains an oxidizing agent that causes a rapid release of heat when mixed with the waving solution.",
			options: [
				{ key: "A", text: "activator" },
				{ key: "B", text: "waving lotion" },
				{ key: "C", text: "neutralizer" },
				{ key: "D", text: "reducer" },
			],
			correctKey: "A",
			explanation:
				"The activator in an exothermic wave contains an oxidizing agent that causes a rapid release of heat when mixed with the waving solution. (Ref: p. 597)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "The hair's porosity is equalized using ________.",
			options: [
				{ key: "A", text: "pre-wrap lotion" },
				{ key: "B", text: "special shampoo" },
				{ key: "C", text: "extra water" },
				{ key: "D", text: "neutral pH solutions" },
			],
			correctKey: "A",
			explanation:
				"A pre-wrap solution is a leave-in conditioner that helps equalize the porosity of the hair to ensure even penetration of the waving lotion and to protect the hair from unnecessary damage. (Ref: p. 598)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "The amount of processing time is determined by the ________.",
			options: [
				{ key: "A", text: "elasticity of the hair" },
				{ key: "B", text: "natural curl of the hair" },
				{
					key: "C",
					text: "strength of the permanent waving solution and the porosity level of the hair",
				},
				{ key: "D", text: "color of the waving solution" },
			],
			correctKey: "C",
			explanation:
				"The amount of processing time is determined by the strength of the permanent waving solution and the porosity level of the hair. (Ref: p. 600)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "Underprocessed hair has not been sufficiently softened to permit the ________ bonds to break and rearrange.",
			options: [
				{ key: "A", text: "elastic" },
				{ key: "B", text: "oxygen" },
				{ key: "C", text: "disulfide" },
				{ key: "D", text: "hydrogen" },
			],
			correctKey: "C",
			explanation:
				"Underprocessed hair has not been sufficiently softened to permit the breaking and rearrangement of the disulfide bonds. (Ref: p. 600)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "A test curl helps to identify ________ and the speed of wave formation in a client’s hair during a permanent waving process.",
			options: [
				{ key: "A", text: "resisting areas" },
				{ key: "B", text: "elasticity" },
				{ key: "C", text: "overprocessing" },
				{ key: "D", text: "underprocessing" },
			],
			correctKey: "A",
			explanation:
				"Test curls enable the barber to identify resistant areas and the speed of wave formation in a client's hair during a permanent waving process. (Ref: p. 601)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "A curl reduction can be used if a client is not pleased after a permanent wave because the hair seems ________.",
			options: [
				{ key: "A", text: "overly porous" },
				{ key: "B", text: "too dry" },
				{ key: "C", text: "too straight" },
				{ key: "D", text: "too curly" },
			],
			correctKey: "D",
			explanation:
				"A curl reduction can be used if a client is dissatisfied with a permanent wave because the hair seems too curly. (Ref: p. 603)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "Pre-shampooing is not allowed when using thio and hydroxide relaxers except when ________.",
			options: [
				{ key: "A", text: "the client has porous hair" },
				{
					key: "B",
					text: "there is an excessive buildup of dirt or styling products",
				},
				{ key: "C", text: "the client's hair as a low pH level" },
				{ key: "D", text: "the client's hair as a high pH level" },
			],
			correctKey: "B",
			explanation:
				"Thio and hydroxide relaxers do not allow pre-shampooing unless there is an excessive buildup of dirt or styling products. (Ref: p. 605)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "No-mix/no-lye relaxers include potassium and ________ hydroxide relaxers.",
			options: [
				{ key: "A", text: "thio" },
				{ key: "B", text: "lye" },
				{ key: "C", text: "lithium" },
				{ key: "D", text: "sodium" },
			],
			correctKey: "C",
			explanation:
				"No-mix/no-lye include potassium and lithium hydroxide relaxers. (Ref: p. 606)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "________ relaxers contain a base cream.",
			options: [
				{ key: "A", text: "Base" },
				{ key: "B", text: "Off-base" },
				{ key: "C", text: "No-base" },
				{ key: "D", text: "No-lye" },
			],
			correctKey: "C",
			explanation:
				"No-base relaxers contain a base cream that is designed to melt at body temperature and do not require the application of a separate protective base. (Ref: p. 607)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "Which is not one of the preliminary strand tests for chemical relaxer applications?",
			options: [
				{ key: "A", text: "Porosity test." },
				{ key: "B", text: "Durability test." },
				{ key: "C", text: "Elasticity test." },
				{ key: "D", text: "Relaxer test." },
			],
			correctKey: "B",
			explanation:
				"The preliminary strand tests for chemical relaxer applications include the porosity test, elasticity test, and relaxer test. (Ref: p. 607)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "What is the waving solution called that is used in a curl reformation and is similar in composition to alkaline permanent waving solutions or lotions?",
			options: [
				{ key: "A", text: "Rearranger." },
				{ key: "B", text: "Booster." },
				{ key: "C", text: "Activator." },
				{ key: "D", text: "Neutralizer." },
			],
			correctKey: "B",
			explanation:
				"The waving solution used in a curl reformation is called the booster and is similar in composition to alkaline permanent waving solutions or lotions. (Ref: p. 609)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "Which product is used in the third step of a curl reformation process and helps to rebuild the broken disulfide bonds?",
			options: [
				{ key: "A", text: "Rearranger." },
				{ key: "B", text: "Booster." },
				{ key: "C", text: "Activator." },
				{ key: "D", text: "Neutralizer." },
			],
			correctKey: "D",
			explanation:
				"In the third step of a curl reformation process, the neutralizer rebuilds the broken disulfide bonds of the hair. (Ref: p. 609)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "Texturizing is a process used to ________ extremely curly hair into a more manageable texture and wave pattern.",
			options: [
				{ key: "A", text: "curl" },
				{ key: "B", text: "semi-straighten" },
				{ key: "C", text: "partially straighten" },
				{ key: "D", text: "completely straighten" },
			],
			correctKey: "B",
			explanation:
				"Texturizing is a process used to semi-straighten extremely curly hair into a more manageable texture and wave pattern. (Ref: p. 610)",
			createdBy: adminId,
		},
		{
			category: "Chemical Texture Services",
			text: "Since the objective of a chemical blowout is to remove some but not all of the curl, a thio relaxer may be used for ________ recommended application time.",
			options: [
				{ key: "A", text: "almost its entire" },
				{ key: "B", text: "half of its" },
				{ key: "C", text: "one-third of its" },
				{ key: "D", text: "three-quarters of its" },
			],
			correctKey: "A",
			explanation:
				"Since the objective of a chemical blowout is to remove some but not all of the curl, a thio relaxer may be used for almost its entire recommended application time. (Ref: p. 610)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "Which hair characteristic is an indication of the strength of the cortex, including cross-bonds and melanin molecules?",
			options: [
				{ key: "A", text: "Texture." },
				{ key: "B", text: "Density." },
				{ key: "C", text: "Porosity." },
				{ key: "D", text: "Elasticity." },
			],
			correctKey: "D",
			explanation:
				"Elasticity is an indication of the strength of the cortex, including cross-bonds and melanin molecules. (Ref: p. 643)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "Hair with a ________ texture takes color faster and may appear darker than other textures.",
			options: [
				{ key: "A", text: "fine" },
				{ key: "B", text: "coarse" },
				{ key: "C", text: "medium" },
				{ key: "D", text: "curly" },
			],
			correctKey: "A",
			explanation:
				"Hair with a fine texture takes color faster and may appear darker than other textures. (Ref: p. 643)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "Blue is ________.",
			options: [
				{ key: "A", text: "a tertiary color" },
				{ key: "B", text: "a secondary color" },
				{ key: "C", text: "a cool primary color" },
				{ key: "D", text: "the weakest primary color" },
			],
			correctKey: "C",
			explanation: "Blue is the only cool primary color. (Ref: p. 645)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "Mixing equal parts of yellow and blue creates green.",
			options: [
				{ key: "A", text: "yellow and blue" },
				{ key: "B", text: "orange and blue" },
				{ key: "C", text: "red and blue" },
				{ key: "D", text: "yellow and red" },
			],
			correctKey: "A",
			explanation:
				"Mixing equal parts of yellow and blue creates green. (Ref: p. 645)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "Mixing equal amounts of one primary color with ________ yields a tertiary color.",
			options: [
				{ key: "A", text: "another primary color" },
				{ key: "B", text: "one of its adjacent secondary colors" },
				{ key: "C", text: "black" },
				{ key: "D", text: "white" },
			],
			correctKey: "B",
			explanation:
				"Mixing equal amounts of one primary color with one of its adjacent secondary colors yields a tertiary color. (Ref: p. 645)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "Complementary colors are positioned ________ on the color wheel.",
			options: [
				{ key: "A", text: "next to each other" },
				{ key: "B", text: "directly opposite each other" },
				{ key: "C", text: "two colors apart" },
				{ key: "D", text: "None of the answers are correct." },
			],
			correctKey: "B",
			explanation:
				"Complementary colors are primary and secondary colors positioned directly opposite each other on the color wheel. (Ref: p. 645)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "Yellow is the complementary color of ________.",
			options: [
				{ key: "A", text: "green" },
				{ key: "B", text: "orange" },
				{ key: "C", text: "red" },
				{ key: "D", text: "violet" },
			],
			correctKey: "D",
			explanation: "Yellow is the complementary color of violet. (Ref: p. 645)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "Tone is the ________ of a color.",
			options: [
				{ key: "A", text: "saturation" },
				{ key: "B", text: "basic name of a color" },
				{ key: "C", text: "warmth or coolness" },
				{ key: "D", text: "pigment concentration" },
			],
			correctKey: "C",
			explanation:
				"Tone describes the warmth or coolness of a color. (Ref: p. 646)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "In haircoloring, the level system is used to analyze the ________ of a hair color.",
			options: [
				{ key: "A", text: "visibility" },
				{ key: "B", text: "saturation" },
				{ key: "C", text: "lightness or darkness" },
				{ key: "D", text: "tone" },
			],
			correctKey: "C",
			explanation:
				"In haircoloring, the level system is used to analyze the lightness or darkness of a hair color. (Ref: p. 647)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "The natural level of the client's hair is accomplished by using a manufacturer's swatch or color ring to match the client's hair color.",
			options: [
				{ key: "A", text: "the client's recommendation" },
				{ key: "B", text: "the nearest primary color" },
				{ key: "C", text: "a color wheel" },
				{ key: "D", text: "a manufacturer's swatch" },
			],
			correctKey: "D",
			explanation:
				"The natural level of the client's hair is accomplished by using a manufacturer's swatch or color ring to match the client's hair color. (Ref: p. 647)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "Semipermanent haircolor fades gradually.",
			options: [
				{ key: "A", text: "Temporary." },
				{ key: "B", text: "Semipermanent." },
				{ key: "C", text: "Demipermanent." },
				{ key: "D", text: "Permanent." },
			],
			correctKey: "B",
			explanation: "Semipermanent haircolor fades gradually. (Ref: p. 650)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "Permanent haircolor products mixed with an equal amount of ________-volume peroxide are capable of lifting the color one or two levels.",
			options: [
				{ key: "A", text: "10" },
				{ key: "B", text: "20" },
				{ key: "C", text: "30" },
				{ key: "D", text: "40" },
			],
			correctKey: "B",
			explanation:
				"Permanent haircolor products mixed with an equal amount of 20-volume peroxide are capable of lifting the color one or two levels. (Ref: p. 652)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "Before application, oxidation tints must be mixed with hydrogen peroxide, which activates the chemical reaction known as ________.",
			options: [
				{ key: "A", text: "oxidation" },
				{ key: "B", text: "progressive colors" },
				{ key: "C", text: "vegetable tints" },
				{ key: "D", text: "toners" },
			],
			correctKey: "A",
			explanation:
				"Before application, oxidation tints must be mixed with hydrogen peroxide, which activates the chemical reaction known as oxidation. (Ref: p. 653)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "In haircoloring, the term **volume** is used to denote the different strengths of hydrogen peroxide. Volume measures both the concentration and strength of hydrogen peroxide.",
			options: [
				{ key: "A", text: "volume" },
				{ key: "B", text: "amount" },
				{ key: "C", text: "brand" },
				{ key: "D", text: "Part of the answers are correct." },
			],
			correctKey: "A",
			explanation:
				"In haircoloring, the term volume is used to denote the different strengths of hydrogen peroxide. Volume measures both the concentration and strength of hydrogen peroxide. (Ref: p. 655)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "The ________ volume of hydrogen peroxide, the lesser the lift or lightening achieved.",
			options: [
				{ key: "A", text: "higher the volume" },
				{ key: "B", text: "lower the volume" },
				{ key: "C", text: "older the bottle" },
				{ key: "D", text: "higher the percentage" },
			],
			correctKey: "B",
			explanation:
				"The lower the volume of hydrogen peroxide, the lesser the lift or lightening achieved. (Ref: p. 655)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "Hydrogen peroxide in ________ form tends to stay moist on the hair longer than the liquid form.",
			options: [
				{ key: "A", text: "lotion" },
				{ key: "B", text: "cream" },
				{ key: "C", text: "dry" },
				{ key: "D", text: "None of the answers are correct." },
			],
			correctKey: "B",
			explanation:
				"Hydrogen peroxide in cream form (or cream peroxide) tends to stay moist on the hair longer than liquid peroxide. (Ref: p. 655)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "Dry peroxides have become somewhat obsolete because of the availability of liquid and cream forms.",
			options: [
				{ key: "A", text: "have become somewhat obsolete" },
				{ key: "B", text: "are better than liquid" },
				{ key: "C", text: "are preferred by discerning barbers" },
				{ key: "D", text: "can be damaging to hair" },
			],
			correctKey: "A",
			explanation:
				"Dry peroxides have become somewhat obsolete because of the availability of liquid and cream forms. (Ref: p. 656)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "Lighteners are chemical compounds that lighten hair by ________ the natural hair pigment.",
			options: [
				{ key: "A", text: "dispersing" },
				{ key: "B", text: "dissolving" },
				{ key: "C", text: "decolorizing" },
				{ key: "D", text: "All answers are correct." },
			],
			correctKey: "D",
			explanation:
				"Lighteners are chemical compounds that lighten hair by dispersing, dissolving, and decolorizing the natural hair pigment (melanin). (Ref: p. 656)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "The most popular type of on-the-scalp lightener is ________.",
			options: [
				{ key: "A", text: "oil" },
				{ key: "B", text: "peroxide" },
				{ key: "C", text: "cream" },
				{ key: "D", text: "powder" },
			],
			correctKey: "C",
			explanation:
				"Cream lighteners are the most popular type of on-the-scalp lightener. (Ref: p. 658)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "Which type of lighteners will stay in place and not run or drip, but do not contain conditioning agents and tend to dry out quickly?",
			options: [
				{ key: "A", text: "Oil." },
				{ key: "B", text: "Gel." },
				{ key: "C", text: "Cream." },
				{ key: "D", text: "Powder." },
			],
			correctKey: "D",
			explanation:
				"Powder lighteners will stay in place and not run or drip, but do not contain conditioning agents and tend to dry out quickly. (Ref: p. 658)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "Color fillers are used to ________ and equalize excessive porosity in one application.",
			options: [
				{ key: "A", text: "remove color buildup" },
				{ key: "B", text: "lighten the hair" },
				{ key: "C", text: "diffuse melanin" },
				{ key: "D", text: "create a color base" },
			],
			correctKey: "D",
			explanation:
				"Color fillers are used to create a color base and equalize excessive porosity in one application. (Ref: p. 660)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "A strand test is performed for color applications to determine ________.",
			options: [
				{ key: "A", text: "how the hair will react to a haircolor product" },
				{
					key: "B",
					text: "if a client has a sensitivity to aniline derivatives",
				},
				{
					key: "C",
					text: "if heat will be needed during the application of a haircolor product",
				},
				{
					key: "D",
					text: "when the first retouch application needs to be scheduled",
				},
			],
			correctKey: "A",
			explanation:
				"A strand test is performed for color applications to determine how the hair will react to the haircolor product, how long it will take to process, and what the final outcome will look like. (Ref: p. 662)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "Pre-softening is the process of treating gray or other resistant hair to facilitate better color penetration.",
			options: [
				{
					key: "A",
					text: "paints a lightener or color directly onto clean, styled hair",
				},
				{
					key: "B",
					text: "colors some of the hair strands lighter than the natural or artificial color",
				},
				{ key: "C", text: "returns the hair to its natural shade" },
				{
					key: "D",
					text: "treats gray or other resistant hair to facilitate better color penetration",
				},
			],
			correctKey: "D",
			explanation:
				"Pre-softening is the process of treating gray or other resistant hair to facilitate better color penetration. (Ref: p. 663)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "________ is the process of coloring strands or sections of the hair darker than the natural or artificial color.",
			options: [
				{ key: "A", text: "Darkening" },
				{ key: "B", text: "Highlighting" },
				{ key: "C", text: "Lowlighting" },
				{ key: "D", text: "Lifting" },
			],
			correctKey: "C",
			explanation:
				"Lowlighting is the process of coloring strands or sections of the hair darker than the natural or artificial color. (Ref: p. 663)",
			createdBy: adminId,
		},
		{
			category: "Haircoloring and Lightening",
			text: "When tinting very porous hair darker, choose a level one to two levels lighter than the desired color.",
			options: [
				{ key: "A", text: "very porous" },
				{ key: "B", text: "somewhat porous" },
				{ key: "C", text: "resistant" },
				{ key: "D", text: "gray" },
			],
			correctKey: "A",
			explanation:
				"When tinting very porous hair darker, choose a level one to two levels lighter than the desired color. (Ref: p. 669)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "A professional barber is responsible for knowing how ________ affect the hair and scalp so that you can select or recommend the right products for your clients.",
			options: [
				{ key: "A", text: "hair colors" },
				{ key: "B", text: "shampoos and conditioners" },
				{ key: "C", text: "hair cuts" },
				{ key: "D", text: "scalp disorders" },
			],
			correctKey: "B",
			explanation:
				"A professional barber is responsible for knowing how shampoos and conditioners affect the hair and scalp so that you can select or recommend the right products for your clients. (Ref: p. 276)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "The purpose of a shampoo product and service is to ________.",
			options: [
				{ key: "A", text: "cleanse the scalp" },
				{ key: "B", text: "identify scalp disorders" },
				{ key: "C", text: "add shine to the hair" },
				{ key: "D", text: "cleanse the scalp and hair" },
			],
			correctKey: "D",
			explanation:
				"The purpose of a shampoo product and service is to cleanse the scalp and hair. (Ref: p. 276)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "________ moisturize and help to restore some of the oils and/or proteins.",
			options: [
				{ key: "A", text: "Styling lotions" },
				{ key: "B", text: "Scalp conditioners" },
				{ key: "C", text: "Hair conditioners" },
				{ key: "D", text: "Shampoos" },
			],
			correctKey: "C",
			explanation:
				"Hair conditioners moisturize and help to restore some of the oils and/or proteins. (Ref: p. 277)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "Which type of hair product should a client with dry and damaged hair that also has a coarse texture use?",
			options: [
				{ key: "A", text: "Deep-moisturizing shampoo." },
				{ key: "B", text: "Volumizing shampoo." },
				{ key: "C", text: "Protein treatments." },
				{ key: "D", text: "pH-balanced shampoo." },
			],
			correctKey: "A",
			explanation:
				"A client with dry and damaged hair that also has a coarse texture should use a deep-moisturizing shampoo for damaged hair. (Ref: p. 277)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "Which type of hair product should a client with wavy hair and a medium texture use?",
			options: [
				{ key: "A", text: "Deep-moisturizing shampoo." },
				{ key: "B", text: "Volumizing shampoo." },
				{ key: "C", text: "Protein treatments." },
				{ key: "D", text: "pH-balanced shampoo." },
			],
			correctKey: "D",
			explanation:
				"A client with wavy hair and a medium texture should use a pH-balanced shampoo. (Ref: p. 277)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "Which type of hair product should a client with straight hair and a fine texture use?",
			options: [
				{ key: "A", text: "Deep-moisturizing shampoo." },
				{ key: "B", text: "Volumizing shampoo." },
				{ key: "C", text: "Spray-on thermal protectors." },
				{ key: "D", text: "Leave-in conditioner." },
			],
			correctKey: "B",
			explanation:
				"A client with straight hair and a fine texture should use a volumizing shampoo. (Ref: p. 277)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "Haircutting capes are made of ________ in order to shed wet and dry hair more effectively.",
			options: [
				{ key: "A", text: "nylon" },
				{ key: "B", text: "cotton" },
				{ key: "C", text: "vinyl" },
				{ key: "D", text: "wool" },
			],
			correctKey: "A",
			explanation:
				"Haircutting capes are made of nylon or other synthetic materials. These draping fabrics are usually more effective for shedding wet and dry hair. (Ref: p. 278)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "The application of a ________ between the client's neck and the neckband of the cape is a requirement of every state's barber rules and regulations.",
			options: [
				{ key: "A", text: "paper towel" },
				{ key: "B", text: "plastic layer" },
				{ key: "C", text: "lotion" },
				{ key: "D", text: "neck strip" },
			],
			correctKey: "D",
			explanation:
				"The application of a barrier (towel or neck strip) between the client's neck and the neckband of the cape is a requirement of every state's barber rules and regulations. (Ref: p. 278)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "________ towel(s) should always be used for chemical services.",
			options: [
				{ key: "A", text: "One" },
				{ key: "B", text: "Two" },
				{ key: "C", text: "Four" },
				{ key: "D", text: "Five" },
			],
			correctKey: "B",
			explanation:
				"Two towels should always be used for chemical services. One cloth towel should go under the cape and folded over the neckband once the cape is secured, followed by a cloth towel over the cape neckline and secured with a clip to provide protection from solution or chemical drips. (Ref: p. 278)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "In the first step of draping for wet and chemical services, you fold the towel ________.",
			options: [
				{ key: "A", text: "vertically" },
				{ key: "B", text: "diagonally" },
				{ key: "C", text: "horizontally" },
				{ key: "D", text: "You do not fold the towel in this step." },
			],
			correctKey: "B",
			explanation:
				"In the first step of draping for wet and chemical services, you fold the towel diagonally in order to maximize the length. (Ref: p. 286)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "What is not one of the basic considerations for performing a shampoo service?",
			options: [
				{
					key: "A",
					text: "Scalp manipulations to facilitate the shampoo procedure.",
				},
				{ key: "B", text: "Proper positioning of the barber." },
				{
					key: "C",
					text: "Proper organization of tools needed for a shampoo service.",
				},
				{ key: "D", text: "Proper draping and positioning of the client." },
			],
			correctKey: "C",
			explanation:
				"The basic considerations for performing a shampoo service include proper draping and positioning of the client, scalp manipulations to facilitate the shampoo procedure, and proper body positioning of the barber. (Ref: p. 279)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "In the barbershop, the ________ method of shampooing is the most commonly used method.",
			options: [
				{ key: "A", text: "reclined" },
				{ key: "B", text: "inclined" },
				{ key: "C", text: "upright" },
				{ key: "D", text: "wet" },
			],
			correctKey: "A",
			explanation:
				"In the barbershop, the reclined method of shampooing is the most commonly used method. (Ref: p. 279)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "If a client is disabled or wheelchair bound, ________.",
			options: [
				{
					key: "A",
					text: "ask your manager how this client should be handled",
				},
				{ key: "B", text: "the regular protocol should be followed" },
				{ key: "C", text: "the inclined method should always be used" },
				{
					key: "D",
					text: "the client should be asked how he or she would like to be shampooed",
				},
			],
			correctKey: "D",
			explanation:
				"If a client is disabled or wheelchair bound, ask the client how he or she would like to be shampooed. (Ref: p. 279)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "Insufficient scalp massage might be a reason ________.",
			options: [
				{ key: "A", text: "to be fired" },
				{ key: "B", text: "to be reprimanded by the state barber board" },
				{ key: "C", text: "that a client gets a rash" },
				{ key: "D", text: "that a client finds fault with a shampoo service" },
			],
			correctKey: "D",
			explanation:
				"Insufficient scalp massage might be a reason that a client finds fault with a shampoo service. (Ref: p. 280)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "An excellent shampoo service requires ________, product selection, water temperature testing, shampoo application, and shampoo massage manipulations.",
			options: [
				{ key: "A", text: "a quick pace" },
				{ key: "B", text: "excellent social skills" },
				{ key: "C", text: "preparation and set-up" },
				{ key: "D", text: "teamwork" },
			],
			correctKey: "C",
			explanation:
				"An excellent shampoo service requires preparation and set-up, product selection, water temperature testing, shampoo application, and shampoo massage manipulations. (Ref: p. 280)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "It is essential that the barber be knowledgeable about the ________.",
			options: [
				{ key: "A", text: "client's favorite shampoo brand" },
				{ key: "B", text: "chemical makeup of shampoo" },
				{ key: "C", text: "ideal ergonomics for shampooing" },
				{ key: "D", text: "products they use on their clients" },
			],
			correctKey: "D",
			explanation:
				"It is essential that you be knowledgeable about the products you use on your clients. Always read product labels and follow the manufacturer's directions. (Ref: p. 280)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "What is not one of the massage manipulations movements?",
			options: [
				{ key: "A", text: "Rotary." },
				{ key: "B", text: "Sliding." },
				{ key: "C", text: "Side to side." },
				{ key: "D", text: "Back and forth." },
			],
			correctKey: "C",
			explanation:
				"The three massage manipulations performed are the rotary movement, sliding movement, and back and forth movement. (Ref: p. 282)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "Which cranial nerves are stimulated when you massage the sides to the top of the head?",
			options: [
				{ key: "A", text: "Eleventh and the spinal nerves." },
				{ key: "B", text: "Fifth." },
				{ key: "C", text: "Fifth and seventh." },
				{ key: "D", text: "Sixth." },
			],
			correctKey: "C",
			explanation:
				"The fifth and seventh cranial nerves are stimulated when you massage the sides to the top of the head. (Ref: p. 283)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "Which cranial nerves are stimulated when you massage behind the ears and neck-to-crown?",
			options: [
				{ key: "A", text: "Eleventh and the spinal nerves." },
				{ key: "B", text: "Fifth." },
				{ key: "C", text: "Fifth and seventh." },
				{ key: "D", text: "Sixth." },
			],
			correctKey: "A",
			explanation:
				"The eleventh cranial nerves and spinal nerves are stimulated when you massage behind the ears and from the neck-to-the-crown. (Ref: p. 283)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "Scalp preparations for ________ hair and scalp may contain moisturizing agents.",
			options: [
				{ key: "A", text: "dry" },
				{ key: "B", text: "fine" },
				{ key: "C", text: "curly" },
				{ key: "D", text: "oily" },
			],
			correctKey: "A",
			explanation:
				"For dry scalp and hair select scalp preparations containing moisturizing agents. (Ref: p. 283)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "Manipulating a(n) ________ scalp is beneficial because it releases hardened sebum from follicles.",
			options: [
				{ key: "A", text: "dry" },
				{ key: "B", text: "scaly" },
				{ key: "C", text: "oily" },
				{ key: "D", text: "inflamed" },
			],
			correctKey: "C",
			explanation:
				"Manipulating an oil scalp will increase circulation and help to release hardened sebum from the follicles. (Ref: p. 284)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "Steam relaxes the pores and ________.",
			options: [
				{ key: "A", text: "moisturizes the scalp" },
				{ key: "B", text: "conditions the hair" },
				{ key: "C", text: "increases blood circulation" },
				{ key: "D", text: "cleanses the hair" },
			],
			correctKey: "C",
			explanation:
				"Steam relaxes the pores, softens the scalp and hair, and increases blood circulation. (Ref: p. 284)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "What is the fourth step when applying a hair tonic treatment?",
			options: [
				{ key: "A", text: "Apply the hair tonic." },
				{ key: "B", text: "Apply scalp steam." },
				{ key: "C", text: "Comb the hair into the desired style." },
				{ key: "D", text: "Massage the scalp again with hands or a vibrator." },
			],
			correctKey: "D",
			explanation:
				"The fourth step when applying a hair tonic treatment is to massage the scalp again with hands or a vibrator. (Ref: p. 285)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "Products with ________ can only be safely applied to the hair or scalp after high-frequency treatments.",
			options: [
				{ key: "A", text: "alcohol" },
				{ key: "B", text: "water" },
				{ key: "C", text: "moisturizers" },
				{ key: "D", text: "carbon" },
			],
			correctKey: "A",
			explanation:
				"Products with alcohol can only be safely applied after high-frequency treatments. (Ref: p. 285)",
			createdBy: adminId,
		},
		{
			category: "Treatment of the Hair and Scalp",
			text: "Dry or powder shampoo is ________ the client's hair with a brush.",
			options: [
				{ key: "A", text: "removed from" },
				{ key: "B", text: "applied to" },
				{ key: "C", text: "spread around" },
				{ key: "D", text: "shaken through" },
			],
			correctKey: "A",
			explanation:
				"Dry or powder shampoo is sprinkled on to the hair and then the hair is brushed thoroughly to remove the powder. (Ref: p. 293)",
			createdBy: adminId,
		},
	];

	// Normalize createdBy for safety in case any items missed
	const questionsNormalized = questions.map((q) => ({
		...q,
		createdBy: adminId,
	}));

	const existing = await Question.countDocuments();
	if (force) {
		await Question.deleteMany({});
		await Question.insertMany(questionsNormalized);
		// eslint-disable-next-line no-console
		console.log(
			`Force seeded ${questionsNormalized.length} questions (replaced existing).`
		);
	} else if (existing === 0) {
		await Question.insertMany(questionsNormalized);
		// eslint-disable-next-line no-console
		console.log(`Seeded ${questionsNormalized.length} questions.`);
	} else {
		// eslint-disable-next-line no-console
		console.log(
			`Questions already present (${existing}); skipping. Use --force to replace.`
		);
	}

	await mongoose.disconnect();
}

run().catch((e) => {
	// eslint-disable-next-line no-console
	console.error(e);
	process.exit(1);
});
