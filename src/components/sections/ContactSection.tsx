import { Mail, MessageCircle, Send } from 'lucide-react';

interface ContactData {
  email?: string;
  message?: string;
  title?: string;
}

interface ContactProps {
  data?: ContactData | null;
}

const Contact = ({ data }: ContactProps) => {
  const contactEmail = data?.email || "hello@yoursite.com";
  const contactTitle = data?.title || "Get In Touch";
  const contactMessage = data?.message || "I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology. Whether you have a question or just want to say hi, I'll do my best to get back to you!";

  return (
    <section id="contact" className="min-h-screen bg-slate-900 flex items-center py-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-emerald-400 font-mono text-lg">05. What's Next?</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-200">
              {contactTitle}
            </h2>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-8">
            <p className="text-lg text-slate-400 leading-relaxed">
              {contactMessage}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href={`mailto:${contactEmail}`}
                className="group inline-flex items-center px-8 py-4 border border-emerald-400 text-emerald-400 font-mono hover:bg-emerald-400/10 transition-all duration-200"
              >
                <Mail className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                Say Hello
                <Send className="ml-3 w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
              </a>
              
              <div className="flex items-center space-x-2 text-slate-400 font-mono text-sm">
                <MessageCircle className="w-4 h-4" />
                <span>{contactEmail}</span>
              </div>
            </div>
          </div>
          
          <div className="pt-16">
            <div className="flex flex-col items-center space-y-4">
              <p className="text-slate-400 font-mono text-sm">
                Built with React & TypeScript
              </p>
              <div className="flex space-x-6 text-slate-400">
                <a 
                  href="#hero" 
                  className="hover:text-emerald-400 transition-colors duration-200 font-mono text-sm"
                >
                  Back to top ↑
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;