
import Image from 'next/image';
import { aboutMe } from '@/app/lib/data';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">About Me</h2>
          <p className="text-lg text-muted-foreground mt-2">Aspiring Data Analyst with a clear growth path into Data Engineering and Data Science.</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-1">
                  <div className="w-[200px] h-[200px] md:w-[220px] md:h-[220px] mx-auto relative">
                    <div
                      className="w-full h-full rounded-full border-2 border-primary/30 bg-primary/10 flex flex-col items-center justify-center shadow-xl shadow-primary/15 transition-all duration-300 hover:scale-105 hover:border-primary/50"
                      aria-label="Kaushar Halani avatar"
                    >
                      <span className="text-5xl md:text-6xl font-bold font-headline text-primary select-none tracking-tight">
                        KH
                      </span>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                        Data Analyst
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                    {aboutMe.description.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
