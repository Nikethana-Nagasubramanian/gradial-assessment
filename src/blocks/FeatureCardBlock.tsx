type FeatureCardProps = {
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
    linkText?: string;
  };
  
  export function FeatureCardBlock({ title, description, imageUrl, linkUrl, linkText }: FeatureCardProps) {
    return (
      <div className="w-full bg-white">
        <div className="flex gap-8 p-8 mx-auto align-center" style={{ maxWidth: '1200px' }}>
          <div className="flex-1 text-left max-w-[800px]">
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <a href={linkUrl} className="text-blue-500 hover:text-blue-700">{linkText || "Learn more"}</a>
          </div>
          
          <div className="flex-shrink-0">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-64 h-48 object-cover rounded border border-gray-300" 
            />
          </div>
        </div>
      </div>
    );
  }