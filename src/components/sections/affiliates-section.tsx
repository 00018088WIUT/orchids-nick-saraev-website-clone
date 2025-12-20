"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

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
        <div className="mb-6">
          <h2 className="text-[14px] font-medium text-muted-foreground lowercase">
            affiliates
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {affiliates.map((aff) => (
            <a
              key={aff.id}
              href={aff.link_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-5 p-6 rounded-xl border border-border/50 bg-card/20 hover:bg-card/40 transition-all"
            >
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-background rounded-lg border border-border overflow-hidden">
                {aff.image_url ? (
                  <img
                    src={aff.image_url}
                    alt={aff.name}
                    className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="text-xl font-bold opacity-20">
                    {aff.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-[17px] font-semibold text-foreground mb-1 group-hover:text-primary transition-colors lowercase">
                  {aff.name}
                </h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed lowercase">
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
