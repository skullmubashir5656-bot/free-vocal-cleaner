import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What audio formats are supported?",
    answer: "We support all major audio formats including MP3, WAV, FLAC, M4A, AAC, OGG, WMA, and more. Simply upload your file and we'll handle the rest."
  },
  {
    question: "How long does processing take?",
    answer: "Most songs are processed in 10-30 seconds depending on file size and length. Our AI-powered system is optimized for speed while maintaining high quality."
  },
  {
    question: "What happens after 50 free uploads?",
    answer: "After your first 50 uploads, you'll need to create a free account to continue. No payment or credit card is required - the service remains completely free."
  },
  {
    question: "Is my music stored on your servers?",
    answer: "No. We prioritize your privacy. Files are processed in real-time and automatically deleted from our servers immediately after processing is complete."
  },
  {
    question: "What quality can I expect?",
    answer: "Our AI provides studio-quality separation. You can download outputs in up to 320kbps MP3 or lossless WAV format, preserving maximum audio fidelity."
  },
  {
    question: "Can I use this for commercial projects?",
    answer: "Yes, you can use the separated tracks for personal and commercial projects. However, please ensure you have the rights to the original audio file."
  }
];

export const FAQ = () => {
  return (
    <section className="py-24 px-4 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Frequently Asked <span className="gradient-primary bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about VocalRemoverX
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6 hover:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
