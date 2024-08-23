import { primaryColor } from "@/config/config";



const UserIntro = ({ data }) => {
  return (
    <div className="flex justify-between items-end">
      <div className="flex items-center gap-4">
        <div>
          <img
            src={data?.imageUrl}
            className={`w-24 h-24 rounded-full border-4 border-[#64D894]`}
          />
        </div>
        <div>
          <span className="text-xl font-bold">{data?.name}</span>
          <div>
            <img
              src="https://img.icons8.com/ios-filled/100/FFFFFF/marker.png"
              className="w-4 h-4 inline"
            />
            <span className="text-sm text-zinc-400 ml-1">
              {data?.location || '--'}
            </span>
          </div>
        </div>
      </div>
      <a className="cursor-pointer hover:opacity-50" href={data?.githubUrl} target="_blank">
        <img src="https://img.icons8.com/ios-glyphs/30/FFFFFF/github.png" />
      </a>
    </div>
  );
};

export default UserIntro;
