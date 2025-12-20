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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {affiliates.map((aff) => (
              <a
                key={aff.id}
                href={aff.link_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-8 p-8 rounded-2xl bg-[#262626] hover:bg-[#2c2c2c] transition-all"
              >
                <div className="flex-shrink-0 w-28 h-28 flex items-center justify-center overflow-hidden">
                  {aff.image_url ? (
                    <img
                      src={aff.image_url}
                      alt={aff.name}
                      className="w-full h-full object-contain filter brightness-110"
                    />
                  ) : (
                    <div className="text-4xl font-bold opacity-10 text-white">
                      {aff.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-[20px] font-bold text-white mb-2 lowercase">
                    {aff.name}
                  </h3>
                  <p className="text-[16px] text-[#A3A3A3] leading-snug lowercase">
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
