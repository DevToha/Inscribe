import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useTutor = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: isTutor, isPending: isTutorLoading } = useQuery({
        queryKey: [user?.email, 'isTutor'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/tutor/${user.email}`);
            return res.data?.tutor;
        }
    });
    return [isTutor, isTutorLoading];
};

export default useTutor;