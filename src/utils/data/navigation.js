import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { HiOutlineDocumentText } from "react-icons/hi";

export const navigationData = [
    {
        path: '/',
        name: "Home",
        icon: <AiFillHome />
    },

    {
        path: '/profile',
        name: "profile",
        icon: <CgProfile />
    },
    {
        path: '/doc',
        name: "Doc",
        icon: <HiOutlineDocumentText />
    },
];
