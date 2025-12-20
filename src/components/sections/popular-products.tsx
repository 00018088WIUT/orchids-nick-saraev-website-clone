import React from 'react';
import Image from 'next/image';

const PopularProducts = () => {
  const products = [
    {
      title: 'Maker School',
      description: 'Join a daily accountability program & acquire your first automation customer along with thousands of other business owners.',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0a11ba3b-064b-46ae-8a64-25cfaa3ed80d-nicksaraev-com/assets/images/Maker-School-Cover--7--2.png',
      link: 'https://www.skool.com/makerschool/about'
    },
    {
      title: 'Make Money With Make',
      description: 'Exclusive community to scale you to $25K/mo. Weekly office hours with me, QA, live roasts, & hands-on training. Capped',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0a11ba3b-064b-46ae-8a64-25cfaa3ed80d-nicksaraev-com/assets/images/4--2--3.png',
      link: 'https://www.skool.com/makemoneywithmake/about'
    }
  ];

  return (
    <section className="px-4 sm:px-6 mb-24" data-featured-pages="2">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <h2 className="text-[14px] font-semibold uppercase text-[#64748B] tracking-[0.05em] border-b border-[#E2E8F0] mb-6 md:mb-8 pb-2.5">
          Popular Products
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {products.map((product, index) => (
            <a 
              key={index} 
              href={product.link} 
              className="group block flex flex-col gap-4 transition-all duration-200"
            >
              {/* Card Image Container */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[12px]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority={index === 0}
                />
              </div>

              {/* Card Content */}
              <div className="flex flex-col gap-2">
                <h3 className="text-[20px] md:text-[22px] font-medium leading-[1.3] text-[#1A1A1A]">
                  {product.title}
                </h3>
                <p className="text-[16px] font-light leading-[1.6] text-[#64748B]">
                  {product.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;