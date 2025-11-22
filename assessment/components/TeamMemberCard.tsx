import { TeamMember } from "@/types/team";
import Image from "next/image";
interface Props {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: Props) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-lg  transition-shadow duration-200">
       <Image
        src={member.avatar}
        alt={member.name}
        width={50}
        height={50}
        className="rounded-full"
      />
      <div>
        <h3 className="font-semibold text-black">{member.name}</h3>
        <p className="text-sm text-gray-500">{member.role}</p>
        <p className="text-xs text-gray-400">{member.email}</p>
      </div>
    </div>
  );
}
