"use client";

import Image from "next/image";
import TeamFilters from "../../../components/TeamFilters";
import TeamTable from "../../../components/TeamTable";
import { useTeamStore } from "@/store/useTeamStore";
import { useTeamMembers } from "../../../hooks/useTeamMembers";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "../../../components/LoadingSpinner";


export default function TeamDir() {
  const { filters } = useTeamStore();

  const { data, loading, error } = useTeamMembers(filters);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (error) {
    return (
      <p className="text-red-500 p-6">
        Failed to load: {error.message}
      </p>
    );
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-xl font-semibold text-black">Team Directory</h1>

      <TeamFilters />

      {data.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {data.map((member) => (
              <motion.li
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                }}
                className="p-4 border bg-white rounded-xl shadow-sm cursor-pointer
                     flex flex-col items-center gap-2 transition-all duration-200"
              >
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />

                <div className="font-semibold text-gray-900 text-center">
                  {member.name}
                </div>

                <div className="text-sm text-[#FF5F1F] font-medium">
                  {member.role}
                </div>

                <div className="text-xs text-gray-500 text-center">
                  {member.email}
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <motion.p
          className="text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No team members found.
        </motion.p>
      )}


      <TeamTable />
    </main>
  );
}
