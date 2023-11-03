const BlogCard = ({ imgSrc, title, description }) => {
  return (
    <div className='flex flex-col items-center justify-start gap-6'>
      <div className='w-72 relative border border-gray-300 max-w-xs overflow-hidden rounded-2xl shadow-lg'>
        <img
          src={imgSrc}
          alt='blog image'
          className='w-72 transition-transform group-hover:scale-110 duration-200'
        />
        <div className='absolute inset-0 dark:bg-secondary-dark dark:bg-opacity-20'></div>
        <div className='inset-0 flex items-end bg-gradian-to-t from-black/60 to-transparent'></div>
      </div>
      <div className='p-4 text-black'>
        <h3 className='text-xl font-bold mb-2 text-center'>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default BlogCard;
