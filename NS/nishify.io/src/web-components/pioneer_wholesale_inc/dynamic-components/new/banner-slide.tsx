import Image from "next/image";
import Link from "next/link";

type TitleNode =
  | { type: "text"; text: string }
  | { type: "highlight"; text: string; className?: string }
  | { type: "span"; text: string; className?: string }
  | { type: "br" };

type HeroConfig = {
  label: string;
  title?: string;
  titleNodes?: TitleNode[];
  button: { text: string; href: string };
  image: { src: string; alt: string };
};

const renderTitleNodes = (nodes?: TitleNode[]) => {
  if (!nodes) return null;
  return nodes.map((n, idx) => {
    switch (n.type) {
      case "text":
        return <span key={idx}>{n.text}</span>;
      case "highlight":
        return (
          <span key={idx} className={n.className ?? "text-[#13151a]"}>
            {n.text}
          </span>
        );
      case "span":
        return (
          <span key={idx} className={n.className}>
            {n.text}
          </span>
        );
      case "br":
        return <br key={idx} />;
      default:
        return null;
    }
  });
};

export const BannerSlide = (prop: HeroConfig) => {
  const { label, title, titleNodes, button, image } = prop;

  return (
    <div className="flex flex-wrap w-full mb-[-24px]">
      {/* Left */}
      <div
        className="min-[992px]:w-[50%] w-full px-[12px] min-[992px]:order-1 order-2 mb-[24px]"
        data-swiper-parallax="-50%"
      >
        <div className="hero-contact h-full flex flex-col items-start justify-center max-[991px]:items-center">
          <p
            data-aos="fade-up"
            data-aos-once="false"
            className="mb-[20px] font-Poppins text-[18px] text-muted-foreground font-light leading-[28px] tracking-[0.03rem] max-[1199px]:mb-[10px] max-[1199px]:text-[16px]"
          >
            {label}
          </p>

          <h1 className="mb-[20px] font-quicksand text-[50px] text-[#3d4750] dark:white font-bold tracking-[0.03rem] leading-[1.2] max-[1199px]:mb-[10px] max-[1199px]:text-[38px] max-[991px]:text-center max-[991px]:text-[45px] max-[767px]:text-[40px] max-[575px]:text-[35px] max-[420px]:text-[30px] max-[360px]:text-[28px]">
            {/* Prefer nodes; fallback to simple title string */}
            {titleNodes ? renderTitleNodes(titleNodes) : title}
          </h1>

          <Link
            href={button.href}
            onClick={(e) => e.preventDefault()}
            className="bb-btn-1 font-Poppins leading-[28px] tracking-[0.03rem] py-[8px] px-[20px] text-[14px] font-normal text-[#3d4750] bg-transparent rounded-[10px] border-[1px] border-solid border-[#3d4750] max-[1199px]:py-[3px] max-[1199px]:px-[15px] hover:bg-[#13151a] hover:border-[#13151a] hover:text-[#fff]"
          >
            {button.text}
          </Link>
        </div>
      </div>

      {/* Right */}
      <div
        className="min-[992px]:w-[50%] w-full px-[12px] min-[992px]:order-2 order-1 mb-[24px]"
        data-swiper-parallax="50%"
      >
        <div className="hero-image pr-[50px] relative max-[991px]:px-[50px] max-[575px]:px-[30px] flex justify-center max-[420px]:p-[0]">
          <Image
            width={600}
            height={600}
            src={image.src}
            alt={image.alt}
            className="w-full pb-[50px] opacity-[1] max-[1199px]:pr-[30px] max-[991px]:pr-[0] max-[575px]:pb-[30px] max-[420px]:pb-[15px]"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 300"
            className="animate-shape w-[120%] absolute top-[-50px] right-[-50px] z-[-1] max-[1399px]:right-[-30px] max-[1199px]:w-[125%] max-[991px]:w-[100%] max-[991px]:top-[0] max-[575px]:right-[0] max-[420px]:w-[110%] max-[420px]:right-[-30px]"
          >
            <linearGradient id="shape_1" x1="100%" x2="0%" y1="100%" y2="0%" />
            <path>
              <animate
                repeatCount="indefinite"
                attributeName="d"
                dur="15s"
                values="M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45 c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2 c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7 c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z; M51,171.3c-6.1-17.7-15.3-17.2-20.7-32c-8-21.9,0.7-54.6,20.7-67.1c19.5-12.3,32.8,5.5,67.7-3.4C145.2,62,145,49.9,173,43.4 c12-2.8,41.4-9.6,60.2,6.6c19,16.4,16.7,47.5,16,57.7c-1.7,22.8-10.3,25.5-9.4,46.4c1,22.5,11.2,25.8,9.1,42.6 c-2.2,17.6-16.3,37.5-33.5,40.8c-22,4.1-29.4-22.4-54.9-22.6c-31-0.2-40.8,39-68.3,35.7c-17.3-2-32.2-19.8-37.3-34.8 C48.9,198.6,57.8,191,51,171.3z; M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45 c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2 c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7 c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z"
              />
            </path>
          </svg>
        </div>
      </div>
    </div>
  );
};
