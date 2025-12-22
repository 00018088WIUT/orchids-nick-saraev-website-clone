"use client";

  import React, { useState, useEffect } from "react";
  import { supabase } from "@/lib/supabase";
  import { Loader2 } from "lucide-react";
  import { useLanguage } from "@/components/language-provider";

  interface Affiliate {
    id: string;
    name: string;
    description: string;
    image_url: string;
    link_url: string;
  }

  const AffiliatesSection: React.FC = () => {
    const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
      const fetchAffiliates = async () => {
        const { data, error } = await supabase
          .from('affiliates')
          .select('*')
          .order('display_order', { ascending: true });
        
        if (data) setAffiliates(data);
        setLoading(false);
      };

      fetchAffiliates();
    }, []);

    if (loading) return null;
    if (affiliates.length === 0) return null;

    return (
      <section className="px-4 sm:px-6 mb-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-8 border-b border-border">
            <h2 className="text-[14px] font-semibold uppercase tracking-[0.05em] text-muted-foreground pb-2.5">
              LINKLAR
            </h2>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {affiliates.map((aff) => (
                  <a
                    key={aff.id}
                    href={aff.link_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col sm:flex-row items-center gap-6 p-8 rounded-2xl bg-[#fafafa] dark:bg-[#1a1a1a] border border-border hover:border-black/10 dark:hover:border-white/10 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-24 h-24 flex items-center justify-center overflow-hidden">
                      {aff.image_url ? (
                            <img
                              src={aff.image_url}
                              alt={aff.name}
                              className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105 grayscale-0 opacity-100"
                            />
                      ) : (
                        <div className="text-3xl font-bold opacity-20">
                          {aff.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <h3 className="text-[20px] font-semibold text-foreground mb-1">
                        {aff.name}
                      </h3>
                      <p className="text-[15px] text-muted-foreground leading-relaxed">
                        {aff.description}
                      </p>
                    </div>
                  </a>

              ))}
            </div>
      </div>
    </section>
  );
};

export default AffiliatesSection;
