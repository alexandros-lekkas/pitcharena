type Props = { name: string; text: string; avatar: string };
export default function Testimonial({ name, text, avatar }: Props) {
  return (
    <div className="card bg-base-100 border-2 border-base-300 rounded-2xl items-center text-center">
      <div className="card-body items-center">
        <div className="avatar mb-3">
          <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={avatar} alt={name} />
          </div>
        </div>
        <p className="text-base-content">“{text}”</p>
        <span className="card-title text-sm text-base-content/60 font-semibold mt-2">{name}</span>
      </div>
    </div>
  );
} 