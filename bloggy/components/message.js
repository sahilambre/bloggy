export default function Message({ children, avatar, username, description }) {
  return (
    <div className="bg-white p-8 border-b-2 rounder-lg">
      <div className="flex item-center gap-2">
        <img src={avatar} className="w-10 rounded-full " />
        <h2>{username}</h2>
      </div>
      <div className="py-4">
        <p className="font-light">{description}</p>
      </div>
      {children}
    </div>
  );
}
