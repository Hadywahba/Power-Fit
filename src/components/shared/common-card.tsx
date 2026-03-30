interface CommonCardProps {
  image: string;
  alt: string;
  title: string;
  text: string;
  icon: string;
  goto: () => void;
}
export default function CommonCard({
  title,
  text,
  icon,
  image,
  alt,
  goto,
}: CommonCardProps) {
  return (
    <section className="flex items-center justify-center gap-8 px-10">
      {/* Figure */}
      <figure className="group relative h-90.75 w-100.75 overflow-hidden rounded-lg hover:shadow-xl">
        <img
          src={image}
          alt={alt}
          className="h-full w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Figure Caption */}
        <figcaption className="absolute top-64 right-0 bottom-0 left-0 bg-white/50 text-black backdrop-blur-2xl dark:bg-[#65636399] dark:backdrop-blur-sm">
          <section className="flex flex-col gap-2 p-4">
            {/* Title */}
            <h1 className="text-charcoal dark:text-gray-extra text-2xl font-bold uppercase">
              {' '}
              {title}
            </h1>

            {/* Button */}
            <button
              onClick={goto}
              className="flex w-fit cursor-pointer items-center justify-start gap-2"
            >
              {/* Text */}
              <p className="text-main text-xl leading-4 font-medium capitalize">
                {text}
              </p>

              {/* Icon */}
              <figure className="bg-main flex size-6 items-center justify-center rounded-full">
                <img src={icon} alt="vector" className="size-2" />
              </figure>
            </button>
          </section>
        </figcaption>
      </figure>
    </section>
  );
}
