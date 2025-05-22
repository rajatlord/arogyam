import React from "react";
import AccordionItem from "./AccordionItem";

const faqData = [
  {
    title: "Faq overview",
    content: [
      {
        title: "Basics question About Mental helath",
        author: "Rajat mathur (Founder)",
        summary:
          "This section inculdes some basics qusetion of Mental health that's comes in gerneral thoughts.",
        link: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
      },
      {
        title: "Helaing through arogyam",
        author: "Rajat mathur (Founder)",
        summary:
          "This app provides guided reflection, therapy tracking, and expert-curated content. And our Helaing through arogyam section holds more data for gudience try to read it all. Just under this link won't work",
        link: "https://example.com/healing-method",
      },
      {
        title: "Types of Forms",
        author: "Rajat mathur (Founder)",
        summary:
          "In Form type section we inculde 5 types of Form checkout for more clarity.",
        link: "https://brenebrown.com/books/",
      },
    ],
  },
  {
    title: "Basics Questions",
    content: [
      {
        title: "What is mental health?",
        author: "Arogyam Editorial Team",
        summary:
          "Mental health isn’t just 'not being sad.' It’s your emotional, psychological, and social well-being. It affects how you think, feel, handle stress, and connect with others. Like physical health, it fluctuates over time. Some days are heavy, others light. It's okay to not be okay. Understanding and acknowledging it is the first step toward healing. Just like you’d visit a doctor for a fever, your mind deserves attention too.",
        link: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
      },
      {
        title: "How to Fix Mental Health?",
        author: "Arogyam Editorial Team",
        summary:
          "Fixing mental health isn’t a one-day fix—it’s a process. Begin with small changes: talk to someone, create a routine, move your body, eat well, and breathe deep. Techniques like therapy, journaling, and mindfulness are powerful when practiced consistently. Healing also means owning your feelings and learning to cope in healthier ways. Think of mental health like fitness—it needs training, rest, and kindness.",
        link: "//www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
      },
      {
        title: "How to Maintain Good Mental Health?",
        author: "Arogyam Editorial Team",
        summary:
          "Maintaining mental health is like brushing your teeth—do it daily to avoid issues. Stay socially connected, sleep properly, take breaks, and protect your peace. Focus on things that recharge you: music, walks, journaling, or solitude. Cut down negative self-talk and check in with yourself often. It’s not a one-time thing; it's a regular practice to build resilience and joy.",
        link: "https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health",
      },
    ],
  },
  {
    title: "Helaing through arogyam",
    content: [
      {
        title: "How This App Can Help You Heal?",
        author: "Arogyam Editorial Team",
        summary:
          "Arogyam is more than just an app—it's a companion on your healing journey. Through tools like journaling, mood tracking, and personalized suggestions based on validated mental health forms, Arogyam helps you understand your emotions and make daily improvements. Whether you're struggling or simply looking to grow, Arogyam gives you clarity and support, one mindful step at a time.",
      },
      {
        title: "How You Can Maintain Good Mental Health Using This App?",
        author: "Arogyam Editorial Team",
        summary:
          "With Arogyam, maintaining mental wellness becomes a daily habit, not a chore. Track your moods, reflect through journaling, and receive thoughtful suggestions tailored to your emotional state. Our mental health forms help you monitor your mental well-being consistently. It’s like a digital therapist in your pocket—here when you need it, reminding you to breathe, pause, and take care.",
        link: "https://example.com/research-process",
      },
      {
        title: "Books to Help You Understand and Heal",
        author: "Curated by Arogyam Team",
        summary:
          "Books have a magical way of making us feel seen and understood. Here’s a curated list of must-reads that gently guide you through healing, self-awareness, and emotional resilience. From science-backed guides to soulful memoirs, these books cover anxiety, mindfulness, depression, and everyday mental strength. Perfect for when you need perspective or peace.",
        link: "https://www.goodreads.com/list/show/96329.Best_Mental_Health_Books", // You can change this to your own curated list
      },
    ],
  },
  {
    title: "Form Questions",
    content: [
      {
        title: "PHQ-9 (Patient Health Questionnaire-9)",
        author: "Pfizer Inc., Dr. Spitzer et al.",
        summary:
          "The PHQ-9 is one of the most trusted tools for checking signs of depression. It asks simple but powerful questions like whether you've felt hopeless, had trouble sleeping, or lost interest in daily activities. It doesn’t diagnose you—it gives a snapshot of how you’ve been feeling lately so you can take the next best step for your mental health.",
       link: "https://www.apa.org/depression-guideline/patient-health-questionnaire.pdf",
      },
      {
        title: "GAD-7 (Generalized Anxiety Disorder-7)",
        author: "Pfizer Inc., Dr. Spitzer et al.",
        summary:
          "Anxiety can feel like your brain’s stuck in overdrive. The GAD-7 helps you reflect on how often you’ve felt worried, restless, or unable to relax. It’s quick, simple, and helps spot patterns in your daily stress. Knowing your anxiety levels is the first step in understanding how to manage them better.",
        link: "https://www.corc.uk.net/en/outcome-experience-measures/directory-of-outcome-measures/generalised-anxiety-disorder-assessment-gad-7/",
      },
      {
        title: "Epworth Sleepiness Scale",
        author: "Dr. Murray Johns",
        summary:
          "Ever wonder why you’re always tired, even after a full night's sleep? This form helps measure how sleepy you feel during daily tasks like reading or watching TV. Fatigue is often tied to mental health, and this test helps uncover hidden sleep issues that might be dragging your mood down.",
         link: "https://epworthsleepinessscale.com/"
      },
      {
        title: "PSS (Perceived Stress Scale)",
        author: "Dr. Sheldon Cohen",
        summary:
          "Stress is sneaky—it creeps in silently. The PSS helps you reflect on how overwhelmed or in control you’ve felt over the past month. It doesn’t just ask how busy you are, but how stress is *affecting you*. A great tool to pause and check in with yourself.",
        link: "https://eprovide.mapi-trust.org/instruments/perceived-stress-scale-10-items"
      },
      {
        title: "WHO-5 Wellbeing Index",
        author: "World Health Organization",
        summary:
          "This form isn’t about problems—it’s about positivity. The WHO-5 asks if you’ve felt cheerful, calm, rested, and energized. It’s a gentle way to check your emotional well-being over the past two weeks and track how your mental health improves over time.",
        link: "https://www.who.int/publications/m/item/WHO-UCN-MSD-MHE-2024.01"
      },
    ],
  },
];

const FaqAccordion = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 mb-[20px]">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Arogyam FAQ Hub 📘
      </h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
          />
        ))}
      </div>
    </div>
  );
};

export default FaqAccordion;
